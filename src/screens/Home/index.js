import React, { useEffect, useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import constants from "../../res/constants";
import homeStyles from "./styles";
import { initColors } from "../../res/colors";
import RNFS from "react-native-fs";
import Download, { createFolder } from "../../utils/Download";

import LinearGradient from "react-native-linear-gradient";
import Video from "react-native-video";
import images from "../../assets/images";
import ButtonRow from "../../components/ButtonRow";
import CustomHeader from "../../components/CustomHeader";
import FontFamily from "../../res/FontFamily";
import Controls from "./Controls";
import SeekBar from "./SeekBar";
import Label from "../../components/Lable";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "../../components/ResponsiveScreen";
import Loader from "../../components/Loader";
import GetLessonDetailSD from "../../Data/LessonDetailSD";
import { useDispatch, useSelector } from "react-redux";
import { setLevel } from "../../redux/reducers/data";

const Home = ({ route }) => {
  // #region :: PARAMS START's FROM HERE
  const [allData, setAllData] = useState(route.params.allData);
  const { level } = useSelector(s => s.data);
  const selectedTrack = route.params?.selectedTrack ?? 0;
  const onMusicStandardChangeAction = route.params?.onMusicStandardChange;

  const colors = initColors;
  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;
  const styles = homeStyles(colors, WIDTH, HEIGHT);
  const [downloadShow, setDownloadShow] = useState({
    loading: false,
    progress: 0,
  });

  // console.log('allData[selectedTrack]', selectedTrack);
  const dispatch = useDispatch();
  const [currentURL, setcurrentURL] = React.useState(allData[selectedTrack]);
  const [state, setState] = useState({
    progress: 0,
    downloadVisible: false,
    downloadProgress: 0,
    jobID: null,
    path: null,
    paused: true,
    totalLength: 1,
    currentPosition: 0,
    selectedTrack: selectedTrack,
    repeatOn: false,
    shuffleOn: false,
    speedRate: 1,
    pitchRate: 1,
    index: level,
    activeTrack: { audioUrl: "", Title: "" },
    isChanging: true,
  });

  const [localData, setlocalData] = React.useState({ audioUrl: "", Title: "" });
  const audioRefs = useRef();

  useEffect(() => {
    if (currentURL) onFileDownload(currentURL);
  }, [currentURL]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      onMusicStandardChange(level);
      onMusicStandardChangeAction(level);
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [level])

  const stopDownload = () => {
    if (state.jobID !== null) {
      RNFS.stopDownload(state.jobID);
      setState({
        ...state,
        downloadProgress: 0,
        downloadVisible: false,
        jobID: null,
        path: null,
      });
      setDownloadShow({ loading: false, progress: 0 });
    } else {
      setDownloadShow({ loading: false, progress: 0 });
    }
  }; //end of stopDownload

  function onMusicStandardChange(keyID) {
    const paramData = route.params.course;

    const lessonID = allData[state.selectedTrack]?.LessonId ?? 0;
    const courseName = allData[state.selectedTrack]?.CourseName ?? "";
    console.log("lessonIDfindlaa", allData, state.selectedTrack);
    console.log(
      "lessonID",
      allData,
      lessonID,
      "state.selectedTrack",
      state.selectedTrack,
    );
    const data = GetLessonDetailSD(lessonID, keyID + 1, courseName, false);
    console.log("GetLessonDetailSDGetLessonDetailSD", data);
    setAllData(data);
    setcurrentURL(data[state.selectedTrack]);
  }

  const onFileDownload = dataa => {
    console.log("call", dataa);
    let downloadURL = dataa.audioUrl;
    let fileName =
      `${dataa.CourseName}${level}${dataa.MusicId}${dataa.Title}`
      .replace(/\s/g, "")
      .replace(/[\W_]/g, "_");

    console.log("downloadURL", downloadURL);
    console.log("fileName", fileName);
    Download.isFileDownloaded(downloadURL, fileName).then(isExist => {
      if (isExist !== false) {
        console.log("ALREADY DOWNLOADED PATH ", isExist);
        setlocalData({
          audioUrl: isExist,
          Title: allData[level].Title,
        });
        _hideDownloadModal();
        return;
      }

      _showDownloadModal();

      setTimeout(() => {
        downloadFile(downloadURL, fileName);
      }, 100);
    });
  };

  async function downloadFile(FILE_TO_DOWNLOAD, FILENAME) {
    const LOCAL_DOWNLOAD_PATH = RNFS.CachesDirectoryPath + "/CheryPorter/";
    let path = LOCAL_DOWNLOAD_PATH;

    const createFolderResult = await createFolder(path);
    let ext = FILE_TO_DOWNLOAD.split(".").pop();
    const filename = FILENAME + "." + ext; //FILE_TO_DOWNLOAD.split('/').pop();
    if (createFolderResult) {
      path = path + `${filename}`;
    } else {
      path = LOCAL_DOWNLOAD_PATH + `${filename}`;
    }

    RNFS.downloadFile({
      fromUrl: FILE_TO_DOWNLOAD,
      toFile: path,
      background: true,
      discretionary: true,
      cacheable: true,
      begin: res => {
        setState({
          ...state,
          jobID: res.jobId,
          path: path,
        });
        setDownloadShow({ loading: true, progress: 0 });
      },
      progress: res => {
        // stopDownload
        // let progressPercent = (res.bytesWritten / res.contentLength) * 100;
        // let progress = progressPercent.toFixed(0);
        // console.log("download-progress", progress)
        // console.log("download-show", downloadShow)
        // if (downloadShow.progress != progress) {
        //   // setDownloadShow({loading: true, progress: progress});
        // }
      },
    })
        .promise.then(async res => {
      _hideDownloadModal();
      if (res) {
        setlocalData({
          audioUrl: path,
          Title: "",
        });
      }
    })
        .catch(err => {
          console.log("ERROR ONLINE FILE DOWNLOAD", err);
          _hideDownloadModal();
        });
  }

  const _showDownloadModal = () => {
    // setState({...state, downloadProgress: 0, downloadVisible: true});
    setDownloadShow({ loading: true, progress: 0 });
  };
  const _hideDownloadModal = () => {
    setDownloadShow({ loading: false, progress: 0 });
  };

  const setDuration = data => {
    setState({ ...state, totalLength: Math.floor(data.duration) });
  };

  const setTime = data => {
    setState({ ...state, currentPosition: Math.floor(data.currentTime) });
  };

  const seek = time => {
    time = Math.round(time);
    audioRefs.current && audioRefs.current.seek(time);
    setState({
      ...state,
      currentPosition: time,
      paused: false,
    });
  };

  const onBack = () => {
    if (allData.length > state.selectedTrack && state.selectedTrack > 0) {
      audioRefs.current && audioRefs.current.seek(0);
      setcurrentURL(
        JSON.parse(JSON.stringify(allData[state.selectedTrack - 1])),
      );
      setState({
        progress: 0,
        downloadVisible: false,
        downloadProgress: 0,
        jobID: null,
        path: null,
        paused: true,
        totalLength: 1,
        currentPosition: 0,
        selectedTrack: state.selectedTrack - 1,
        repeatOn: false,
        shuffleOn: false,
        speedRate: 1,
        pitchRate: 1,
        activeTrack: { audioUrl: "", Title: "" },
        isChanging: true,
      });

      // onCurrentPath(this.props.tracks[state.selectedTrack]);
    }
  };

  const onForward = () => {
    if (allData.length > state.selectedTrack && state.selectedTrack >= 0) {
      audioRefs.current && audioRefs.current.seek(0);
      setcurrentURL(
        JSON.parse(JSON.stringify(allData[state.selectedTrack + 1])),
      );
      let nextIndex = state.selectedTrack + 1;

      stopDownload();
      // alert(nextIndex);
      setState({
        progress: 0,
        downloadVisible: false,
        downloadProgress: 0,
        jobID: null,
        path: null,
        paused: true,
        totalLength: 1,
        currentPosition: 0,
        selectedTrack: nextIndex,
        repeatOn: false,
        shuffleOn: false,
        speedRate: 1,
        pitchRate: 1,
        index: level,
        activeTrack: { audioUrl: "", Title: "" },
        isChanging: true,
      });

      // onCurrentPath(this.props.tracks[state.selectedTrack]);
    }
  };

  const loadStart = e => {
    console.log("AUDIO LOAD START -", e);
  };

  const onEnd = e => {
    console.log("AUDIO ON END  ", e);
  };

  const onError = err => {
    console.log("AUDIO ON ERROR ", err);
    alert("Something went wrong while playing audio, Please try again later");
  };

  // console.log('localData.audioUrl', localData.audioUrl);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <CustomHeader />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={styles.imageView}>
            <LinearGradient colors={[colors.primary, "#6869B2"]}>
              <Image
                source={images.cherylMusic}
                style={{
                  // ...styles.imageStyle,
                  width: wp(50),
                  height: hp(35),
                  marginLeft: -wp(5),
                  resizeMode: "contain",
                }}
              />

              <View
                style={{
                  position: "absolute",
                  marginHorizontal: "2%",
                  width: "100%",
                  alignItems: "center",
                  alignSelf: "center",
                  height: hp(35),
                  backgroundColor: "rgba(1,1,1,0.25)",
                }}>
                <View
                  style={{
                    marginTop: hp(7),
                    marginRight: wp(2),
                    marginLeft: wp(25),
                  }}>
                  <Label
                    style={{
                      fontFamily: FontFamily.Poppins.Regular,
                      fontSize: 18,
                      color: colors.white,
                    }}
                    title={"Cheryl helps you"}
                  />

                  <Label
                    style={{
                      fontFamily: FontFamily.Poppins.Bold,
                      fontSize: 23,
                      color: colors.white,
                    }}
                    title={"ACHIEVE YOUR GOALS"}
                  />

                  <Label
                    style={{
                      fontFamily: FontFamily.Poppins.Regular,
                      fontSize: 17,
                      color: colors.white,
                      marginLeft: 24,
                      marginTop: 0,
                    }}
                    title={"and have fun doing it!"}
                  />

                  <Label
                    style={{
                      fontFamily: FontFamily.Poppins.Regular,
                      fontSize: 15,
                      color: colors.white,
                      marginLeft: 24,
                    }}
                    title={
                      "Experience Cheryl Porter’s groundbreaking new vocal method that is transforming singers all over the world!"
                    }
                  />
                </View>
              </View>
            </LinearGradient>
          </View>
          <ButtonRow
            allData={allData}
            item={allData[state.selectedTrack]}
            index={level}
            onIndexPress={index => {
              // setState({ ...state, index: index });
              dispatch(setLevel(index));
            }}
          />
          <Text
            style={[
              styles.lessonNameText,
              {
                color:
                  level === 0
                    ? colors.primary
                    : level === 1
                    ? colors.secondary
                    : colors.yellowish,
              },
            ]}>
            {allData[state.selectedTrack]?.Title ?? ""}
          </Text>

          <SeekBar
            onSeek={seek}
            trackLength={state.totalLength}
            onSlidingStart={() => setState({ ...state, paused: true })}
            currentPosition={state.currentPosition}
            color={
              level === 0
                ? colors.primary
                : level === 1
                ? colors.secondary
                : colors.yellowish
            }
          />

          <Controls
            onPressRepeat={() =>
              setState({ ...state, repeatOn: !state.repeatOn })
            }
            repeatOn={state.repeatOn}
            shuffleOn={state.shuffleOn}
            forwardDisabled={state.selectedTrack === allData.length - 1}
            onPressShuffle={() =>
              setState({ ...state, shuffleOn: !state.shuffleOn })
            }
            currentIndex={state.selectedTrack}
            onPressPlay={() => setState({ ...state, paused: false })}
            onPressPause={() => setState({ ...state, paused: true })}
            onBack={onBack.bind(this)}
            onForward={onForward.bind(this)}
            paused={state.paused}
            onSpeedRateChange={speed => {
              setState({ ...state, speedRate: speed });
            }}
            onPitchChange={pitch => {
              setState({ ...state, pitchRate: pitch });
            }}
            color={
              level === 0
                ? colors.primary
                : level === 1
                ? colors.secondary
                : colors.yellowish
            }
          />
          {/* const track = this.props.tracks[state.selectedTrack];
          console.log('adada', state.activeTrack.audioUrl); const video = */}
          {/* {state.isChanging || !state.activeTrack.audioUrl ? null : ( */}
          {localData.audioUrl && (
            <Video
              source={{
                uri: localData.audioUrl,
              }} // Can be a URL or a local file.
              ref={audioRefs}
              playInBackground={true}
              playWhenInactive={true}
              paused={state.paused} // Pauses playback entirely.
              resizeMode="cover" // Fill the whole screen at aspect ratio.
              repeat={state.repeatOn} // Repeat forever.
              onLoadStart={loadStart} // Callback when video starts to load
              onLoad={setDuration} // Callback when video loads
              onProgress={setTime} // Callback every ~250ms with currentTime
              onEnd={onEnd} // Callback when playback finishes
              onError={onError} // Callback when video cannot be loaded
              style={styles.audioElement}
              rate={state.speedRate}
              pitch={state.pitchRate}
              onBuffer={buffer => {
                console.log("onBuffer", buffer);
              }}

              // volume={}
            />
          )}
          {/* )} */}
        </View>
        {/* <View style={styles.bottomWave} >
                <Image source={images.bottomWave} />
            </View> */}
      </ScrollView>
      {/* ******************** MODEL's Start ******************** */}
      {/* <DownloadModal
        visible={downloadShow.loading}
        onPress={() => {
          stopDownload();
        }}
        progressVisible
        buttonVisible
        progress={downloadShow.progress}
      /> */}

      <Loader loading={downloadShow.loading} />
    </SafeAreaView>
  );
};

export default Home;
