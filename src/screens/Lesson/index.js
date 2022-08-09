import React from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import images from "../../assets/images";
import FontFamily from "../../res/FontFamily";
import constants from "../../res/constants";
import lessonStyles from "./styles";
import { initColors } from "../../res/colors";
import ButtonRow from "../../components/ButtonRow";
import LessonList from "../../components/LessonList";
import { useDispatch, useSelector } from "react-redux";
import { setLevel } from "../../redux/reducers/data";

export default ({ route }) => {
  const data = route.params;
  const colors = initColors;
  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;
  const styles = lessonStyles(colors, WIDTH, HEIGHT);

  const { level } = useSelector(s => s.data);
  const dispatch = useDispatch();

  const getData = () => {
    if (level === 0) {
      return data.standard;
    } else if (level === 1) {
      return data.high;
    } else {
      return data.low;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <CustomHeader />
      <View style={{ flex: 1 }}>
        <ButtonRow
          onIndexPress={pressedLevel => {
            dispatch(setLevel(pressedLevel));
          }}
        />
        {getData().length > 0 ? (
          <LessonList data={getData()} pressed={level} />
        ) : (
          <Text
            style={{
              fontSize: 26,
              textAlign: "center",
              fontFamily: FontFamily.Poppins.Bold,
            }}>{`No Record`}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
