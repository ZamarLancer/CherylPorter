import React from 'react'
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import constants from '../../res/constants';
import signInStyles from './styles';
import { initColors } from '../../res/colors';
import ButtonRow from '../../components/ButtonRow';
import LessonList from '../../components/LessonList';
import images from '../../assets/images';


export default () => {
  const colors = initColors
  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;
  const styles = signInStyles(colors, WIDTH, HEIGHT)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} >
      <CustomHeader customIcon={images.cherylapplogo} />
      <View style={{ flex: 1 }}>
        <View style={styles.semiCircle} />
        <Text style={styles.labelStyle} >Name</Text>
        <TextInput placeholder="" style={styles.inputStyles} />
        <Text style={styles.labelStyle} >Email</Text>
        <TextInput placeholder="" style={styles.inputStyles} />
        <Text style={styles.labelStyle} >Message</Text>
        <TextInput placeholder="" style={styles.inputStyles} />
        <TouchableOpacity style={styles.signInBtn} >
          <Text style={{ color: colors.white }} >SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}