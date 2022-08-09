import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {initColors} from '../res/colors';
import constants from '../res/constants';
import FontFamily from '../res/FontFamily';
import GetLessonDetailSD from '../Data/LessonDetailSD';
import NavigationService from '../navigation/NavigationService';
import ROUTES from '../navigation/ROUTES';

export default props => {
  const allData = props?.allData ?? [];
  const [currentItem, setCurrentItem] = React.useState(props?.item ?? {});
  React.useEffect(() => {
    setCurrentItem(props?.item ?? {});
    return () => {};
  }, [props.item]);
  const colors = initColors;
  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;
  const styles = buttonRowStyles(colors, WIDTH, HEIGHT);
  let initRowList = [
    {
      text: 'STANDARD',
      color: colors.primary,
      isSelected: false,
    },
    {
      text: 'HIGH',
      color: colors.secondary,
      isSelected: false,
    },
    {
      text: 'LOW',
      color: colors.yellowish,
      isSelected: false,
    },
  ];
  const [rowList, setRowList] = useState(initRowList);

  return (
    <View style={styles.buttonRow}>
      {rowList.map((item, index) => {
        return (
          <TouchableOpacity
            key={`${index} in rowList`}
            style={[styles.buttonBackground, {backgroundColor: item.color}]}
            onPress={() => {
              if (props.onIndexPress) {
                props.onIndexPress(index);
              } else {
                const lessonID = currentItem?.LessonId ?? 0;
                const keyID = index + 1;
                const courseName = currentItem?.CourseName ?? '';
                const newData = GetLessonDetailSD(lessonID, keyID, courseName);
                const newItemIndex = newData.findIndex(
                  x =>
                    x.LessonId === currentItem.LessonId &&
                    x.CourseName === currentItem.CourseName &&
                    `${x.Title}`.trim().toLowerCase() ===
                      `${currentItem.Title}`.trim().toLowerCase(),
                );

                if (newItemIndex !== -1) {
                  const newItem = newData[newItemIndex];
                  const finalDataSpliced = newData.filter(
                    x => x.id !== newItem.id,
                  );
                  const finalData = [newItem, ...finalDataSpliced];
                  NavigationService.NavigationActions.stack_actions.replace(
                    ROUTES.APP_ROUTES.Home.screen_name,
                    {item: finalData[0], allData: finalData, index},
                  );
                } else {
                  NavigationService.NavigationActions.stack_actions.replace(
                    ROUTES.APP_ROUTES.Home.screen_name,
                    {item: newData[0], allData: newData, index},
                  );
                }
              }
            }}>
            <Text
              style={[
                styles.buttonText,
                {color: index === 2 ? colors.black : colors.white},
              ]}>
              {item.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const buttonRowStyles = (colors = initColors, width, height) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    buttonRow: {
      marginHorizontal: 10,
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonBackground: {
      backgroundColor: '#EB39A2',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 20
      width: width * 0.25,
      height: height * 0.06,
      alignSelf: 'center',
      marginHorizontal: 5,
      borderRadius: 5,
    },
    buttonText: {
      fontFamily: FontFamily.Poppins.Regular,
      fontSize: 14,
      color: colors.white,
    },
  });
