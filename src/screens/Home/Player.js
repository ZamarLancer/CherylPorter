import React, {Component} from 'react';
import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Video from 'react-native-video';
import images from '../../assets/images';
import ButtonRow from '../../components/ButtonRow';
import CustomHeader from '../../components/CustomHeader';
import {initColors as colors} from '../../res/colors';
import constants from '../../res/constants';
import FontFamily from '../../res/FontFamily';
import Controls from './Controls';
import SeekBar from './SeekBar';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: false,
      shuffleOn: false,
      speedRate: 1,
      pitchRate: 1,
      index: this.props.index,
      activeTrack: {audioUrl: '', Title: ''},
      isChanging: true,
    };
    this.props.onCurrentPath(this.props.tracks[this.state.selectedTrack]);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({isChanging: false});
    }, 1000);
  }

  componentDidUpdate = (previousProps, previousState) => {
    if (previousProps.setActiveData !== this.props.setActiveData) {
      if (
        this.state.activeTrack.audioUrl != this.props.setActiveData.audioUrl
      ) {
        console.log('prevProps.setActiveData ', previousProps.setActiveData);
        console.log('this.props.setActiveData ', this.props.setActiveData);
        this.state.activeTrack.audioUrl = this.props.setActiveData.audioUrl;
        this.setState({
          activeTrack: {
            audioUrl: this.props.setActiveData.audioUrl,
            Title: '',
          },
        });
      }
    }
  };
  setDuration(data) {
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({isChanging: true});
      setTimeout(
        () =>
          this.setState(
            {
              currentPosition: 0,
              paused: false,
              totalLength: 1,
              isChanging: false,
              selectedTrack: this.state.selectedTrack - 1,
            },
            () => {
              this.props.onCurrentPath(
                this.props.tracks[this.state.selectedTrack],
              );
            },
          ),
        0,
      );
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    if (this.state.selectedTrack < this.props.tracks.length - 1) {
      this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({isChanging: true});
      setTimeout(
        () =>
          this.setState(
            {
              currentPosition: 0,
              totalLength: 1,
              paused: false,
              isChanging: false,
              selectedTrack: this.state.selectedTrack + 1,
            },
            () => {
              this.props.onCurrentPath(
                this.props.tracks[this.state.selectedTrack],
              );
            },
          ),
        0,
      );
    }
  }

  loadStart = e => {
    console.log('AUDIO LOAD START ', e);
  };

  onEnd = e => {
    console.log('AUDIO ON END  ', e);
    // if (this.state.repeatOn) {
    //     this.setState({
    //         currentPosition: 0,
    //         paused: false
    //     })
    // } else {
    //     this.onForward.bind(this)
    // }
  };

  onError = err => {
    console.log('AUDIO ON ERROR ', err);
    alert('Something went wrong while playing audio, Please try again later');
  };

  render() {
    const track = this.props.tracks[this.state.selectedTrack];
    console.log('adada', this.state.activeTrack.audioUrl);
    const video =
      this.state.isChanging || !this.state.activeTrack.audioUrl ? null : (
        <Video
          source={{
            uri: 'file:///' + this.props.setActiveData.audioUrl,
          }} // Can be a URL or a local file.
          ref="audioElement"
          playInBackground={true}
          playWhenInactive={true}
          paused={this.state.paused} // Pauses playback entirely.
          resizeMode="cover" // Fill the whole screen at aspect ratio.
          repeat={this.state.repeatOn} // Repeat forever.
          onLoadStart={this.loadStart} // Callback when video starts to load
          onLoad={this.setDuration.bind(this)} // Callback when video loads
          onProgress={this.setTime.bind(this)} // Callback every ~250ms with currentTime
          onEnd={this.onEnd} // Callback when playback finishes
          onError={this.onError} // Callback when video cannot be loaded
          style={styles.audioElement}
          rate={this.state.speedRate}
          pitch={this.state.pitchRate}
          onBuffer={buffer => {
            console.log('onBuffer', buffer);
          }}
          // volume={}
        />
      );
    const HEIGHT = constants.window_dimensions.height;
    const WIDTH = constants.window_dimensions.width;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <CustomHeader />
        <ScrollView>
          <View style={{flex: 1}}>
            <View style={styles.imageView}>
              <LinearGradient colors={[colors.primary, '#6869B2']}>
                <Image
                  source={images.cherylMusic}
                  style={{
                    ...styles.imageStyle,
                    width: WIDTH,
                    height: HEIGHT * 0.33,
                    resizeMode: 'contain',
                  }}
                />

                <View
                  style={{
                    position: 'absolute',
                    marginHorizontal: '2%',
                    width: '100%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: HEIGHT * 0.33,
                    backgroundColor: 'rgba(1,1,1,0.1)',
                  }}>
                  <View style={{marginLeft: 113, marginTop: '15%'}}>
                    <Text
                      style={{
                        fontFamily: FontFamily.Poppins.Regular,
                        fontSize: 17,
                        color: colors.white,
                      }}>
                      Cheryl helps you
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.Poppins.Bold,
                        fontSize: 23,
                        color: colors.white,
                      }}>
                      ACHIEVE YOUR GOALS
                    </Text>
                    <Text
                      style={{
                        fontFamily: FontFamily.Poppins.Regular,
                        fontSize: 17,
                        color: colors.white,
                        marginLeft: 24,
                      }}>
                      and have fun doing it!
                    </Text>

                    <Text
                      style={{
                        fontFamily: FontFamily.Poppins.Regular,
                        fontSize: 15,
                        color: colors.white,
                        marginLeft: 24,
                      }}>
                      Experience Cheryl Porter’s groundbreaking new vocal method
                      that is transforming singers all over the world!
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
            <ButtonRow
              allData={this.props.tracks}
              item={this.props.tracks[this.state.selectedTrack]}
              index={this.state.index}
            />

            <Text
              style={[
                styles.lessonNameText,
                {
                  color:
                    this.state.index === 0
                      ? colors.primary
                      : this.state.index === 1
                      ? colors.secondary
                      : colors.yellowish,
                },
              ]}>
              {track?.Title ?? ''}
            </Text>

            <SeekBar
              onSeek={this.seek.bind(this)}
              trackLength={this.state.totalLength}
              onSlidingStart={() => this.setState({paused: true})}
              currentPosition={this.state.currentPosition}
              color={
                this.state.index === 0
                  ? colors.primary
                  : this.state.index === 1
                  ? colors.secondary
                  : colors.yellowish
              }
            />
            <Controls
              onPressRepeat={() =>
                this.setState({repeatOn: !this.state.repeatOn})
              }
              repeatOn={this.state.repeatOn}
              shuffleOn={this.state.shuffleOn}
              forwardDisabled={
                this.state.selectedTrack === this.props.tracks.length - 1
              }
              onPressShuffle={() =>
                this.setState({shuffleOn: !this.state.shuffleOn})
              }
              onPressPlay={() => this.setState({paused: false})}
              onPressPause={() => this.setState({paused: true})}
              onBack={this.onBack.bind(this)}
              onForward={this.onForward.bind(this)}
              paused={this.state.paused}
              onSpeedRateChange={speed => {
                this.setState({speedRate: speed});
              }}
              onPitchChange={pitch => {
                this.setState({pitchRate: pitch});
              }}
              color={
                this.state.index === 0
                  ? colors.primary
                  : this.state.index === 1
                  ? colors.secondary
                  : colors.yellowish
              }
            />
            {video}
          </View>
          {/* <View style={styles.bottomWave} >
                <Image source={images.bottomWave} />
            </View> */}
        </ScrollView>
      </SafeAreaView>
    );

    return <View style={styles.container}></View>;
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  audioElement: {
    height: 0,
    width: 0,
  },

  safeArea: {
    flex: 1,
  },
  buttonRow: {
    marginHorizontal: 10,
    marginVertical: 20,
    flexDirection: 'row',
  },
  buttonBackground: {
    backgroundColor: '#EB39A2',
    justifyContent: 'center',
    alignItems: 'center',
    width: 132,
    height: 49,
  },
  buttonText: {
    fontFamily: FontFamily.Poppins.Light,
    fontSize: 20,
    color: colors.white,
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
  },
  imageView: {
    justifyContent: 'flex-end',
  },
  imageStyle: {
    marginLeft: -120,
  },
  lessonNameText: {
    fontFamily: FontFamily.Poppins.Regular,
    fontSize: 20,
    color: colors.primary,
    textAlign: 'center',
  },
  slider: {
    width: '70%',
  },
};
