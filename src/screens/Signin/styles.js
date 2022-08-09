import {StyleSheet, Appearance} from 'react-native';
import {initColors} from '../../res/colors';
import FontFamily from '../../res/FontFamily';

const SPACING_VERTICAL = 10;

export default (colors = initColors, width, height) =>
  StyleSheet.create({
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
    imageView: {},
    imageStyle: {
      marginLeft: -170,
    },
    semiCircle: {
      overflow: 'hidden',
      width: '100%',
      height: 90,
      // position: "absolute",
      // top: -10,
      marginTop: -10,
      borderRadius: 900,
      zIndex: -1,
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
      backgroundColor: colors.white,
    },
    labelStyle: {
      paddingLeft: 20,
      paddingTop: 12,
      paddingBottom: 4,
      color: colors.white,
      fontFamily: FontFamily.Poppins.Medium,
      fontSize: 15,
    },
    inputStyles: {
      height: 50,
      color: colors.black,
      backgroundColor: colors.white,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 5,
      paddingHorizontal: 8,
      fontSize: 16,
      fontFamily: FontFamily.Poppins.Regular,
    },
    signInBtn: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 100,
      backgroundColor: colors.blueColor,
      marginVertical: 20,
      borderRadius: 5,
    },
    forgotPassBtn: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderRadius: 5,
    },
    forgotPassText: {color: colors.white, textDecorationLine: 'underline'},
  });
