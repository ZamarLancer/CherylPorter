/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import images from '../../assets/images';
import svgs from '../../assets/svgs';
import Button from '../../components/Button';
import NavigationService from '../../navigation/NavigationService';
import ROUTES from '../../navigation/ROUTES';
import FontFamily from '../../res/FontFamily';
import {initColors} from '../../res/colors';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = initColors;

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      <ScrollView>
        <View style={{flex: 1}}>
          <Image
            source={images.social}
            style={{position: 'absolute', top: 0, left: 40, zIndex: 5}}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 5,
              left: 50,
              zIndex: 15,
            }}
            onPress={() => {
              Linking.openURL(
                'https://www.youtube.com/channel/UCiuFR-m7cy1GW-JMMYBd1TQ',
              );
            }}>
            <SvgXml
              xml={svgs.youtube_logo()}
              fill="white"
              height={40}
              width={40}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 5,
              left: 90,
              zIndex: 15,
            }}
            onPress={() => {
              Linking.openURL('https://www.tiktok.com/@cherylporterdiva');
            }}>
            <SvgXml
              xml={svgs.tiktok_logo()}
              fill="white"
              height={40}
              width={40}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 5,
              left: 125,
              zIndex: 15,
            }}
            onPress={() => {
              Linking.openURL(
                'https://www.facebook.com/cherylportervocalmethod/',
              );
            }}>
            <SvgXml xml={svgs.fb_logo()} fill="white" height={40} width={40} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 5,
              left: 160,
              zIndex: 15,
            }}
            onPress={() => {
              Linking.openURL('ttps://www.instagram.com/cherylporterdiva/');
            }}>
            <SvgXml
              xml={svgs.insta_logo()}
              fill="white"
              height={40}
              width={40}
            />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 5,
              backgroundColor: '#EF039D',
              borderRadius: 15,
              padding: 15,
            }}>
            <Menu>
              <MenuTrigger
                children={
                  <View style={{}}>
                    <SvgXml xml={svgs.hamburger_icon()} style={{}} />
                  </View>
                }
              />
              <MenuOptions
                optionsContainerStyle={{
                  width: 180,
                  height: 120,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  borderRadius: 5,
                  padding: 5,
                  marginTop: Platform.OS === 'android' ? 30 : -15,
                  marginLeft: 10,
                  backgroundColor: colors.primary,
                }}>
                <MenuOption
                  onSelect={() => {
                    NavigationService.NavigationActions.common_actions.navigate(
                      ROUTES.AUTH_ROUTES.Signin.screen_name,
                    );
                  }}
                  text="SIGN IN"
                />
                <MenuOption
                  onSelect={() => {
                    NavigationService.NavigationActions.common_actions.navigate(
                      ROUTES.AUTH_ROUTES.Signin.screen_name,
                    );
                  }}
                  text="VOCAL EXERCISE"
                />
                <MenuOption
                  onSelect={() => {
                    NavigationService.NavigationActions.common_actions.navigate(
                      ROUTES.AUTH_ROUTES.ContactUs.screen_name,
                    );
                  }}
                  text="CONTACT"
                />
              </MenuOptions>
            </Menu>
          </View>
          <Image
            source={images.upper_banner}
            style={{width: 429, height: 490}}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={images.cherylapplogo}
              style={{position: 'absolute', top: -55, zIndex: 2, left: 10}}
            />

            <Image
              source={images.lower_banner}
              style={{width: 428, height: 241}}
              resizeMode="contain"
            />

            <Image
              source={images.ellipse}
              style={{
                width: '150%',
                height: 218,
                position: 'absolute',
                top: 65,
                zIndex: -1,
              }}
              resizeMode="contain"
            />
            <Button
              onPress={() => {
                Linking.openURL('https://course.cherylportermethod.com/');
              }}
              text={'JOIN NOW! >>'}
              style={{
                position: 'absolute',
                height: 41.27,
                width: 187.5,
                borderRadius: 10,
                bottom: -15,
                zIndex: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              textStyle={{
                fontFamily: FontFamily.Poppins.Bold,
                fontSize: 15,
                color: 'white',
              }}
              gradientColors={['#EF039D', '#F76A20']}
              gradientStyles={{
                position: 'absolute',
                height: 40.27,
                width: 184,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              isLoading={false}
            />
            <Button
              onPress={() => {
                NavigationService.NavigationActions.common_actions.navigate(
                  ROUTES.AUTH_ROUTES.Signin.screen_name,
                );
              }}
              text={'SIGN IN NOW! >>'}
              style={{
                position: 'absolute',
                height: 41.27,
                width: 187.5,
                borderRadius: 10,
                bottom: -70,
                zIndex: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              textStyle={{
                fontFamily: FontFamily.Poppins.Bold,
                fontSize: 15,
                color: 'white',
              }}
              gradientColors={['#37C5E5', '#40E9BA']}
              gradientStyles={{
                position: 'absolute',
                height: 40.27,
                width: 184,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              isLoading={false}
            />
            <View
              style={{
                bottom: -190,
                position: 'absolute',
                left: 10,
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.Poppins.ExtraLight,
                  fontSize: 18,
                  color: '#3A3A3A',
                }}>
                It's{' '}
                <Text
                  style={{
                    fontFamily: FontFamily.Poppins.Bold,
                    fontSize: 18,
                    color: '#EF039D',
                  }}>
                  NEVER
                </Text>{' '}
                too late to
              </Text>
              <Text
                style={{
                  fontFamily: FontFamily.Poppins.Bold,
                  fontSize: 35,
                  color: '#3A3A3A',
                }}>
                LEARN TO SING!
              </Text>
            </View>
          </View>
          <Image
            source={images.rectangle}
            resizeMode="contain"
            style={{zIndex: -5}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
