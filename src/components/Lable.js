import React from 'react';
import {StyleSheet, Text, View, I18nManager} from 'react-native';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const Label = props => {
  const {
    title,
    size = 15,
    style = {},
    numberOfLines = 10,
    marginTop = 0,
    onPress,
    color = '#000000',
  } = props;
  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        color: color,
        fontSize: RFPercentage(size),
        marginTop: marginTop,
        textAlign: 'left',
        ...style,
      }}>
      {title}
    </Text>
  );
};

export default Label;
