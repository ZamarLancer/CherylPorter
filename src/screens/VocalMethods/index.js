import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeader from '../../components/CustomHeader';
import images from '../../assets/images';
import FontFamily from '../../res/FontFamily';
import constants from '../../res/constants';
import lessonStyles from './styles';
import {initColors} from '../../res/colors';
import ButtonRow from '../../components/ButtonRow';
import LinearGradient from 'react-native-linear-gradient';
import LessonList from '../../components/LessonList';
import NavigationService from '../../navigation/NavigationService';
import ROUTES from '../../navigation/ROUTES';
import LessonSD from '../../Data/LessonSD';
import {getRequest} from '../../manager/ApiManager';
import {BASE_URL} from '../../utils/GV';
import Endpoints from '../../manager/Endpoints';
import Loader from '../../components/Loader';

export default () => {
  const colors = initColors;
  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;
  const styles = lessonStyles(colors, WIDTH, HEIGHT);
  const {userData} = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  let initVocalList = [
    {
      title: 'FREE YOUR VOICE',
    },
    {
      title: 'HIT THOSE HIGH NOTES',
    },
    {
      title: 'BOOM! THE BIG 10!',
    },
  ];

  const [vocalMethodsList, setVocalMethodsList] = useState([]);

  React.useEffect(() => {
    getVocalMethods();
  }, []);

  const getVocalMethods = () => {
    setLoading(true);
    console.log('userData.id', userData.id);
    getRequest(
      `${BASE_URL}${Endpoints.enrollments(userData.id)}`,
      resp => {
        setLoading(false);
        let tempArr = resp.enrollments;
        const filteredArr = tempArr.reduce((acc, current) => {
          const x = acc.find(item => item.course_id === current.course_id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setVocalMethodsList(filteredArr);
      },
      err => {
        setLoading(false);
        console.log('err', err);
      },
    );
  };

  const onItemPress = (item, index) => {
    if (item.course.page_title.includes('Bundle')) {
      return;
    }

    let param = null;
    if (item.course.page_title.includes('Notes')) {
      param = LessonSD.hitThoseHighNotes;
    } else if (item.course.page_title.includes('CHERYL PORTER VOCAL METHOD')) {
      param = LessonSD.freeYourVoice;
    } else if (item.course.page_title.includes('BOOM')) {
      param = LessonSD.boomTheBig10;
    } else if (item.course.page_title.includes('Minute')) {
      param = LessonSD.tenMinVocalWorkout;
    } else {
      return;
    }
    if (param) {
      NavigationService.NavigationActions.common_actions.navigate(
        ROUTES.APP_ROUTES.Lesson.screen_name,
        param,
      );
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Loader loading={loading} />
      <CustomHeader noLeftIcon={true} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1}}>
          <View style={{...styles.imageView, marginBottom: 8}}>
            <LinearGradient
              useAngle={true}
              angle={133}
              angleCenter={{x: 0.25, y: 0.25}}
              colors={[
                '#FFFFFF',
                '#38D8DA',
                '#38C4E6',
                '#9078BD',
                '#AA62B1',
                colors.primary,
              ]}>
              <Image
                source={images.cherylapplogotransparent}
                style={{position: 'absolute'}}
              />
              <Image source={images.cherylVocal} style={styles.imageStyle} />
            </LinearGradient>
            <View style={{position: 'absolute'}}>
              <Text
                style={{
                  fontFamily: FontFamily.Poppins.Light,
                  fontSize: 35,
                  left: 20,
                  top: 200,
                  color: colors.white,
                }}>
                Let’s{'\n'}get to work!
              </Text>
            </View>
          </View>
          {vocalMethodsList.map((item, index) => {
            return (
              <TouchableOpacity
                key={`${index} in vocalMethodslist`}
                style={{
                  borderRadius: 60,
                  height: HEIGHT * 0.1,
                  padding: 15,
                  width: WIDTH * 0.85,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  // margin: 10
                  marginVertical: 5,
                }}
                onPress={() => {
                  onItemPress(item, index);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: FontFamily.Poppins.Bold,
                    color: colors.white,
                  }}>
                  {item.course.page_title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
