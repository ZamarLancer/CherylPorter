import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from "react-native";
import React, { useState } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { initColors } from "../res/colors";
import svgs from "../assets/svgs";
import { SvgXml } from "react-native-svg";
import images from "../assets/images";
import NavigationService from "../navigation/NavigationService";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../navigation/ROUTES";
import constants from "../res/constants";
import { setUser } from "../redux/reducers/user";

const PADDING_HEIGHT = 10;

const CustomHeader = props => {
  const colors = initColors;
  const styles = headerStyles(colors);
  const [openMenu, setOpenMenu] = useState(false);
  const { isLoggedIn } = useSelector(state => state.user);
  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;

  const dispatch = useDispatch();
  const IS_HEIGHT = WIDTH > 393;
  return (
    <View style={styles.primaryContainer}>
      <View
        style={{ width: "20%", alignItems: "flex-start", paddingHorizontal: 5 }}>
        {props.customIcon ? (
          <TouchableOpacity onPress={() => {
          }}>
            <Image
              source={props.customIcon}
              style={{ position: "absolute", zIndex: 99, top: -30 }}
            />
          </TouchableOpacity>
        ) : props.noLeftIcon ? null : (
          <TouchableOpacity
            style={{
              backgroundColor: "#EF039D",
              borderRadius: 15,
              padding: 15,
            }}
            onPress={() => {
              if (props.onLeftIconPress) {
                props.onLeftIconPress();
              } else {
                NavigationService.NavigationActions.common_actions.goBack();
              }
            }}>
            <SvgXml xml={svgs.arrow_icon()} style={{}} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: "60%", alignItems: "center" }}>
        <Image source={images.social} style={{}} />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 5,
            left: IS_HEIGHT ? 50 : 40,
            zIndex: 15,
          }}
          onPress={() => {
            Linking.openURL(
              "https://www.youtube.com/channel/UCiuFR-m7cy1GW-JMMYBd1TQ",
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
            position: "absolute",
            top: 5,
            left: IS_HEIGHT ? 90 : 80,
            zIndex: 15,
          }}
          onPress={() => {
            Linking.openURL("https://www.tiktok.com/@cherylporterdiva");
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
            position: "absolute",
            top: 5,
            left: IS_HEIGHT ? 125 : 115,
            zIndex: 15,
          }}
          onPress={() => {
            Linking.openURL(
              "https://www.facebook.com/cherylportervocalmethod/",
            );
          }}>
          <SvgXml xml={svgs.fb_logo()} fill="white" height={40} width={40} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 5,
            left: IS_HEIGHT ? 160 : 150,
            zIndex: 15,
          }}
          onPress={() => {
            Linking.openURL("ttps://www.instagram.com/cherylporterdiva/");
          }}>
          <SvgXml xml={svgs.insta_logo()} fill="white" height={40} width={40} />
        </TouchableOpacity>
      </View>
      <View
        style={{ alignItems: "flex-end", width: "20%", paddingHorizontal: 5 }}>
        {isLoggedIn ? (
          <Menu>
            <MenuTrigger
              children={
                <View
                  style={{
                    backgroundColor: "#EF039D",
                    borderRadius: 15,
                    padding: 15,
                  }}>
                  <SvgXml xml={svgs.hamburger_icon()} style={{}} />
                </View>
              }
            />
            <MenuOptions
              optionsContainerStyle={{
                width: 180,
                height: 150,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderRadius: 5,
                padding: 5,
                marginTop: Platform.OS === "android" ? 45 : -15,
                // marginLeft: -10,
                backgroundColor: colors.primary,
              }}>
              <MenuOption onSelect={() => {
              }} text="VOCAL EXERCISE" />
              <MenuOption
                onSelect={() => {
                  NavigationService.NavigationActions.common_actions.navigate(
                    ROUTES.APP_ROUTES.ContactUs.screen_name,
                  );
                }}
                text="CONTACT"
              />
              <MenuOption
                onSelect={() => {
                  NavigationService.NavigationActions.common_actions.navigate(
                    ROUTES.APP_ROUTES.VocalMethods.screen_name,
                  );
                }}
                text="MY COURSES"
              />
              <MenuOption
                onSelect={() => {
                  dispatch(setUser({ userData: {}, isLoggedIn: false }));
                }}
                text="LOGOUT"
              />
            </MenuOptions>
          </Menu>
        ) : (
          <Menu>
            <MenuTrigger
              children={
                <View
                  style={{
                    backgroundColor: "#EF039D",
                    borderRadius: 15,
                    padding: 15,
                  }}>
                  <SvgXml xml={svgs.hamburger_icon()} style={{}} />
                </View>
              }
            />
            <MenuOptions
              optionsContainerStyle={{
                width: 180,
                height: 120,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderRadius: 5,
                padding: 5,
                marginTop: Platform.OS === "android" ? 45 : -15,
                // marginLeft: -10,
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
        )}

        {/* <TouchableOpacity style={{
                    backgroundColor: '#EF039D',
                    borderRadius: 15,
                    padding: 15,
                }}
                    onPress={() => {
                        setOpenMenu(true)
                    }}
                >
                    <SvgXml xml={svgs.hamburger_icon()} style={{}} />
                </TouchableOpacity> */}
      </View>
      {/* {openMenu &&

            } */}
    </View>
  );
};
const headerStyles = (colors = initColors) =>
  StyleSheet.create({
    primaryContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",

      backgroundColor: "#FFFFFF",

      paddingTop: PADDING_HEIGHT,
      paddingBottom: PADDING_HEIGHT * 1.5,
    },
  });
export default CustomHeader;
