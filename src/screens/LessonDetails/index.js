import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import svgs from '../../assets/svgs';
import GetLessonDetailSD from '../../Data/LessonDetailSD';
import NavigationService from '../../navigation/NavigationService';
import ROUTES from '../../navigation/ROUTES';
import {initColors} from '../../res/colors';
import constants from '../../res/constants';
import FontFamily from '../../res/FontFamily';
import lessonStyles from './styles';
import RNFS, {stat} from 'react-native-fs';
import Download, {createFolder} from '../../utils/Download';

export default ({route}) => {
  // #region :: PARAMS START's FROM HERE
  const paramData = route.params;
  const lessonName = paramData?.Name ?? '';
  const lessonTitle = paramData?.Description ?? '';

  const [_index, setIndex] = useState(paramData?.index ?? 0);

  const lessonID = paramData?.Id ?? 0;
  const keyID = paramData?.KeyId ?? 0;
  const courseName = paramData?.CourseName ?? '';

  const [data, setData] = useState(
    GetLessonDetailSD(lessonID, keyID, courseName),
  );

  // #endregion :: PARAMS END's FROM HERE
  const colors = initColors;
  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;
  const styles = lessonStyles(colors, WIDTH, HEIGHT);

  useEffect(() => {
    data.forEach(info => {
      onFileDownload(info);
    });
  }, [_index]);

  const onMusicStandardChange = index => {
    setData(GetLessonDetailSD(lessonID, index + 1, courseName));
    setIndex(index);
  };

  const onFileDownload = dataa => {
    console.log('call', dataa);
    let downloadURL = dataa.audioUrl;
    let fileName = `${dataa.CourseName}${keyID}${dataa.MusicId}${dataa.Title}`
      .replace(/\s/g, '')
      .replace(/[\W_]/g, '_');

    Download.isFileDownloaded(downloadURL, fileName).then(isExist => {
      if (isExist !== false) {
        return;
      }
      setTimeout(() => {
        downloadFile(downloadURL, fileName);
      }, 100);
    });
  };

  function downloadFile(FILE_TO_DOWNLOAD, FILENAME) {
    const LOCAL_DOWNLOAD_PATH = RNFS.CachesDirectoryPath + '/CheryPorter/';
    let path = LOCAL_DOWNLOAD_PATH;

    const createFolderResult = createFolder(path);
    let ext = FILE_TO_DOWNLOAD.split('.').pop();
    const filename = FILENAME + '.' + ext;
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
        console.log('resres header ', res);
      },
      progress: res => {},
    })
      .promise.then(async res => {
        if (res) {
        }
      })
      .catch(err => {});
  }

  // #region :: SCREEN HEADER UI START's FROM HERE
  const _renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            NavigationService.NavigationActions.common_actions.goBack();
          }}>
          <SvgXml xml={svgs.arrow_icon()} height={20} width={20} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontFamily: FontFamily.Poppins.Medium,
            color: colors.white,
            paddingHorizontal: 20,
          }}>{`${lessonName}`}</Text>
      </View>
    );
  };

  // #endregion :: SCREEN HEADER UI END's FROM HERE
  // #region :: ITEM UI START's FROM HERE
  const _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemPrimaryContainer}
        onPress={() => {
          let newData1 = JSON.parse(JSON.stringify(data));
          let dataArray = newData1;
          // if (index != 0) {
          //   dataArray = dataArray.slice(index);
          //   dataArray = [item, ...dataArray];
          // }
          NavigationService.NavigationActions.common_actions.navigate(
            ROUTES.APP_ROUTES.Home.screen_name,
            {
              allData: dataArray,
              index: _index,
              selectedTrack: index,
              course: paramData,
              onMusicStandardChange: onMusicStandardChange,
            },
          );
          // NavigationService.NavigationActions.common_actions.navigate(ROUTES.APP_ROUTES.Home.screen_name, { item, allData: data, index: _index  })
        }}>
        <View style={styles.itemContainer}>
          <View style={styles.itemNameCircleContainer}>
            <View style={styles.itemCircle} />
            <Text style={styles.itemName}>{`${item.Title}`}</Text>
          </View>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
        <View style={styles.itemSeperator} />
      </TouchableOpacity>
    );
  };

  // #endregion :: ITEM UI END's FROM HERE
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primary}}>
      {_renderHeader()}

      <View style={styles.bodyContainer}>
        {/* ****************** Start of BODY HEADEr ****************** */}
        <View style={styles.headerContainerStyle}>
          <Image
            source={require('../../assets/images/lessondetail_header.jpg')}
            style={styles.headerImage}
          />
          <View style={{flex: 1}}>
            <Text style={styles.headerTitle}>{`${lessonTitle}`}</Text>
            <Text style={styles.headerLessonName}>{`${lessonName}`}</Text>
          </View>
        </View>

        {/* ****************** End of BODY HEADEr ****************** */}

        {/* ****************** Start of PLAY ALL BUTTON  ****************** */}
        <TouchableOpacity
          style={styles.playAllButtonContainer}
          onPress={() => {
            NavigationService.NavigationActions.common_actions.navigate(
              ROUTES.APP_ROUTES.Home.screen_name,
              {
                allData: data,
                index: _index,
                selectedTrack: 0,
                course: paramData,
                onMusicStandardChange: onMusicStandardChange,
              },
            );
          }}>
          <Text style={styles.playAllText}>{`Play All`}</Text>
        </TouchableOpacity>

        {/* ****************** End of PLAY ALL BUTTON  ****************** */}

        <FlatList data={data} renderItem={_renderItem} />

        {/* ****************** Start of MARK AS COMPLETE BUTTON  ****************** */}
        <TouchableOpacity style={styles.markAsCompleteButtonContainer}>
          <Text style={styles.markAsCompleteText}>{`MARK AS COMPLETED`}</Text>
        </TouchableOpacity>

        {/* ****************** End of MARK AS COMPLETE BUTTON  ****************** */}
      </View>
    </SafeAreaView>
  );
};
