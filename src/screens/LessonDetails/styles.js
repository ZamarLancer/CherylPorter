import {StyleSheet, Appearance} from 'react-native';
import {initColors} from '../../res/colors';
import FontFamily from '../../res/FontFamily';

const SPACING_VERTICAL = 10;

export default (colors = initColors, width, height) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    bodyContainer: {
      flex: 1,
      backgroundColor: colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 20,
      paddingHorizontal: 20,
    },

    headerContainerStyle: {
      flexDirection: 'row',
    },
    headerImage: {
      width: width * 0.5,
      height: width * 0.3,
      marginRight: 8,
    },
    headerTitle: {
      fontSize: 22,
      color: '#01aee1',
      fontFamily: FontFamily.Poppins.Bold,
    },
    headerLessonName: {
      fontSize: 16,
      color: 'grey',
      fontFamily: FontFamily.Poppins.Regular,
    },
    playAllButtonContainer: {
      backgroundColor: colors.primary,
      borderRadius: 6,
      paddingHorizontal: 20,
      paddingVertical: 6,
      width: width * 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
      marginBottom: 26,
    },
    playAllText: {
      fontSize: 18,
      color: colors.white,
      fontFamily: FontFamily.Poppins.Bold,
    },
    itemPrimaryContainer: {
      flex: 1,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemNameCircleContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 60,
    },
    itemCircle: {
      height: 20,
      width: 20,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: `rgba(0,0,0,0.3)`,
      marginRight: 16,
    },
    itemName: {
      fontSize: 14,
      fontFamily: FontFamily.Poppins.Bold,
      color: colors.black,
    },
    itemTime: {
      fontSize: 12,
      fontFamily: FontFamily.Poppins.Regular,
      color: 'grey',
    },
    itemSeperator: {
      backgroundColor: `rgba(0,0,0,0.2)`,
      height: 0.5,
      width: '100%',
      marginTop: 12,
      marginBottom: 16,
    },
    markAsCompleteButtonContainer: {
      backgroundColor: '#00add9',
      borderRadius: 6,
      paddingHorizontal: 20,
      paddingVertical: 6,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
      marginBottom: 26,
    },
    markAsCompleteText: {
      fontSize: 18,
      color: colors.white,
      fontFamily: FontFamily.Poppins.Bold,
    },
  });
