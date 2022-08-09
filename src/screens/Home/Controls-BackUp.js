import React from 'react';
import Slider from '@react-native-community/slider';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import images from '../../assets/images';
import svgs from '../../assets/svgs';
import {initColors as colors} from '../../res/colors';
import FontFamily from '../../res/FontFamily';
import constants from '../../res/constants';
import {heightPercentageToDP} from '../../components/ResponsiveScreen';

const ICON = {
  size: 18,
  color: '#000',
};
const Controls = ({
  paused,
  shuffleOn,
  repeatOn,
  onPressPlay,
  onPressPause,
  onBack,
  onForward,
  onPressShuffle,
  onPressRepeat,
  forwardDisabled,
  onSpeedRateChange,
  onPitchChange,
  color,
  currentIndex,
}) => {
  const [speedValue, setSpeedValue] = React.useState(1);
  const [pitchValue, setPitchValue] = React.useState(1);

  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;

  const IS_HEIGHT = WIDTH > 393;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: Dimensions.get('window').width * 0.1,
        }}>
        <TouchableOpacity
          activeOpacity={0.0}
          onPress={onPressRepeat}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          {/* <SvgXml xml={svgs.repeatIcon()} /> */}
          <Image
            source={images.repeat}
            resizeMode="contain"
            style={{height: 30, width: 30}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          disabled={currentIndex == 0}
          onPress={onBack}
          style={{opacity: currentIndex == 0 ? 0.3 : 1}}>
          <SvgXml
            xml={svgs.rewindIcon()}
            height={ICON.size}
            width={ICON.size}
            fill={ICON.color}
          />
        </TouchableOpacity>

        {!paused ? (
          <TouchableOpacity onPress={onPressPause}>
            <View style={styles.playButton}>
              <Text style={{color: colors.black}}>PAUSE</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressPlay}>
            <View style={styles.playButton}>
              <SvgXml xml={svgs.playIcon(colors.black)} />
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={onForward}
          disabled={forwardDisabled}
          style={{opacity: forwardDisabled ? 0.3 : 1}}>
          <SvgXml
            xml={svgs.forwardIcon()}
            height={ICON.size}
            width={ICON.size}
            fill={ICON.color}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.0}
          onPress={onPressShuffle}
          style={{width: '10%'}}>
          {/* <Image source={images.shuffleIcon} /> */}
        </TouchableOpacity>
      </View>

      {/* ****************** Start of SPEED ****************** */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 8,
          flexDirection: 'row',
          marginVertical: 8,
        }}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#686868',
                fontSize: 15,
                fontFamily: FontFamily.Poppins.Bold,
                textAlign: 'center',
                paddingHorizontal: 10,
              }}>{`SPEED`}</Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                width: 50,
                height: 50,
                backgroundColor: color,
                backgroundColor:
                  speedValue > 0.4999999999999996 &&
                  speedValue <= 1.5000000000000004
                    ? color
                    : 'lightgray',
              }}
              disabled={
                !(
                  speedValue > 0.4999999999999996 &&
                  speedValue <= 1.5000000000000004
                )
              }
              onPress={() => {
                let tempNum = speedValue;
                console.log('tempNum', tempNum);
                if (
                  speedValue > 0.4999999999999996 &&
                  speedValue <= 1.5000000000000004
                ) {
                  tempNum = tempNum - 0.05;
                }
                onSpeedRateChange(tempNum);
                setSpeedValue(tempNum);
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.Poppins.Bold,
                  fontSize: 18,
                  color: 'white',
                }}>
                -
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={{
            color: color,
            fontSize: 12,
            fontFamily: FontFamily.Poppins.Bold,
            textAlign: 'center',
            paddingHorizontal: 10,
          }}>{`${((speedValue * 100) / 1).toFixed(0)}%`}</Text>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 5,
              marginRight: 30,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                width: 50,
                height: 50,
                backgroundColor:
                  speedValue >= 0.4999999999999996 &&
                  speedValue < 1.5000000000000004
                    ? color
                    : 'lightgray',
              }}
              disabled={
                !(
                  speedValue >= 0.4999999999999996 &&
                  speedValue < 1.5000000000000004
                )
              }
              onPress={() => {
                let tempNum = speedValue;
                console.log('tempNum', tempNum);
                if (
                  speedValue >= 0.4999999999999996 &&
                  speedValue < 1.5000000000000004
                ) {
                  tempNum = tempNum + 0.05;
                  onSpeedRateChange(tempNum);
                  setSpeedValue(tempNum);
                }
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.Poppins.Bold,
                  fontSize: 20,
                  color: 'white',
                }}>
                +
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setSpeedValue(1);
                onSpeedRateChange(1);
              }}>
              <Image
                source={images.reset}
                style={{
                  resizeMode: 'contain',
                  width: 20,
                  height: 20,
                  paddingHorizontal: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ****************** End of SPEED ****************** */}

      {/* ****************** Start of PITCH ****************** */}

      <View style={{alignItems: 'center', height: 80}}>
        {/* <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 70 : 60,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 103 : 95,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 136 : 127,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 169 : 161,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 204 : 195,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 237 : 228,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 271 : 262,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 305 : 295,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: IS_HEIGHT ? 338 : 330,
            top: IS_HEIGHT ? 30 : 28,
            fontSize: 20,
          }}>
          |
        </Text> */}
        {/** pitch values */}
        <View
          style={{
            width: 300,
            height: 30,
            //backgroundColor: '#cdcdcd',
            alignSelf: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'absolute',
            paddingLeft: 5,
            top: 40,
          }}>
          {[-4, -3, -2, -1, 0, +1, +2, +3, +4].map((info, index) => {
            return (
              <View
                key={index}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    width: 10,
                    // color: 'red',
                    marginRight: 190 / 8 - 7,
                    marginLeft: 7,
                  }}>
                  |
                </Text>
                <Text
                  style={{
                    ...styles.colorGrey,
                  }}>
                  {info}
                </Text>
              </View>
            );
          })}
        </View>
        {/* <Text
          style={{
            ...styles.colorGrey,
            position: 'absolute',
            left: IS_HEIGHT ? 92 : 88,
            top: IS_HEIGHT ? 57 : 53,
            paddingRight: 0,
          }}>
          -3
        </Text>
        <Text
          style={{
            ...styles.colorGrey,
            position: 'absolute',
            left: IS_HEIGHT ? 126 : 120,
            top: IS_HEIGHT ? 57 : 53,
            paddingRight: 0,
          }}>
          -2
        </Text>
        <Text
          style={{
            ...styles.colorGrey,
            position: 'absolute',
            left: IS_HEIGHT ? 160 : 155,
            top: IS_HEIGHT ? 57 : 53,
            paddingRight: 0,
          }}>
          -1
        </Text>
        <Text
          style={{
            ...styles.colorGrey,
            position: 'absolute',
            left: IS_HEIGHT ? 230 : 220,
            top: IS_HEIGHT ? 57 : 53,
            paddingRight: 0,
          }}>
          +1
        </Text>
        <Text
          style={{
            ...styles.colorGrey,
            position: 'absolute',
            left: IS_HEIGHT ? 267 : 255,
            top: IS_HEIGHT ? 57 : 53,
            paddingRight: 0,
          }}>
          +2
        </Text>
        <Text
          style={{
            ...styles.colorGrey,
            position: 'absolute',
            left: IS_HEIGHT ? 299 : 285,
            top: IS_HEIGHT ? 57 : 53,
            paddingRight: 0,
          }}>
          +3
        </Text> */}
        <Text
          style={{
            color: color,
            fontSize: 20,
            fontFamily: FontFamily.Poppins.Bold,
            // textAlign: 'center',
            color: '#686868',
          }}>{`PITCH`}</Text>
        <Slider
          style={{width: 300}}
          step={0.05}
          minimumValue={0.8}
          maximumValue={1.2}
          value={pitchValue}
          // onValueChange={val => {
          //     setPitchValue(val);
          //     onPitchChange(val);
          // }}
          onSlidingComplete={val => {
            setPitchValue(val);
            onPitchChange(val);
          }}
          thumbTintColor={color}
          minimumTrackTintColor={color}
          maximumTrackTintColor={`rgba(115, 89, 190, 0.5)`}
          tapToSeek={false}
        />
        {/* <View style={styles.textCon}>
          <Text style={{...styles.colorGrey, paddingLeft: 20}}>{-4}</Text>
          <Text style={{...styles.colorYellow, color: color, paddingLeft: 35}}> */}
        {/* {Math.round(pitchValue * 100) / 100} */}
        {/* </Text> */}
        {/* <Text style={styles.colorGrey}>{+4}</Text> */}
        {/* </View> */}
        <TouchableOpacity
          onPress={() => {
            setPitchValue(1);
            onPitchChange(1);
          }}
          style={{position: 'absolute', bottom: 20, right: 25}}>
          <Image
            source={images.reset}
            style={{
              resizeMode: 'contain',
              width: 20,
              height: 20,
              paddingHorizontal: 10,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* ****************** End of PITCH ****************** */}
    </View>
  );
};

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryControl: {
    height: 18,
    width: 18,
  },
  off: {
    opacity: 0.3,
  },

  textCon: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorGrey: {
    color: '#d3d3d3',
    paddingRight: 20,
  },
  colorYellow: {
    color: colors.primary,
    marginLeft: -60,
  },
});
