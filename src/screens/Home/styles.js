import React from 'react';
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
    imageView: {
      justifyContent: 'flex-end',
    },
    imageStyle: {
      marginLeft: -170,
    },
    lessonNameText: {
      fontFamily: FontFamily.Poppins.Light,
      fontSize: 26,
      color: colors.primary,
      textAlign: 'center',
    },
    slider: {
      width: '70%',
    },
  });
