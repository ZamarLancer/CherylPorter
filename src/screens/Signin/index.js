import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import constants, { VALIDATION_CHECK } from "../../res/constants";
import signInStyles from "./styles";
import { initColors } from "../../res/colors";
import images from "../../assets/images";
import { useState } from "react";
import { getRequest, postRequest } from "../../manager/ApiManager";
import { BASE_URL } from "../../utils/GV";
import Endpoints from "../../manager/Endpoints";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import CustomAlert from "../../components/CustomAlert";
import FontFamily from "../../res/FontFamily";
import Toast from "../../helper/toast";
import Loader from "../../components/Loader";
import {setUser} from "../../redux/reducers/user";

export default () => {
  const colors = initColors;
  const HEIGHT = constants.window_dimensions.height;
  const WIDTH = constants.window_dimensions.width;
  const styles = signInStyles(colors, WIDTH, HEIGHT);
  const [email, setEmail] = useState(
    __DEV__ ? "boise@borncreative.net" : "", //test001@borncreative.net
  );
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(__DEV__ ? "George Zeid" : "");

  // const [password, setPassword] = useState(__DEV__ ? 'Act202271!!@@' : ''); //Act202271!!@@
  const [loader, setLoader] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  // const onSignInPressed = () => {
  //   console.log('email.trim()', email.trim());
  //   if (!VALIDATION_CHECK(password) || !VALIDATION_CHECK(email))
  //     return alert('Please Fill all fields');
  //   setLoader(true);
  //   let url = `${BASE_URL}${Endpoints.login}`;
  //   postRequest(
  //     url,
  //     {
  //       // "name": name,
  //       email: email.trim(),
  //       password: password,
  //     },
  //     async res => {
  //       console.log('resss ', JSON.stringify(res));
  //       if (res.users) {
  //         alert('Incorrect email or password');
  //       } else {
  //         dispatch(
  //           actions.setUserAction({
  //             userData: res,
  //             isLoggedIn: true,
  //           }),
  //         );
  //       }
  //       setLoader(false);
  //     },
  //     err => {
  //       setLoader(false);
  //       console.log('err', err);
  //     },
  //   );
  // };

  function isValidForm() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let _name = name.trim(), _email = email.trim()
    if (_name.length == 0) {
      Toast.showError("Please enter your registered name");
      return false;
    } else if (_email.length == 0) {
      Toast.showError("Please enter your registered email id");
      return false;
    } else if (reg.test(_email) === false) {
      Toast.showError("Please enter valid email id");
      return false;
    }
    setEmail(_email)
    setName(_name)
    return true;
  }

  const getUserBasedOnEmail = () => {
    setTimeout(function() {
      if (isValidForm()) {
        setLoading(true);
        let url = `${BASE_URL}${Endpoints.GET_USERS}?email=${email.trim().toLowerCase()}`;
        getRequest(
          url,
          async res => {
            setLoading(false);
            console.log("resss ", res);
            if (res.users && res.users.length > 0) {
              if (`${res.users[0].name}`.toLowerCase() == name.trim().toLowerCase()) {
                Toast.showSuccess("Welcome " + name.trim(), "Congrats!");
                setTimeout(() => {
                  dispatch(
                    setUser({
                      userData: res.users[0],
                      isLoggedIn: true,
                    }),
                  );
                }, 300);

                return;
              } else {
                Toast.showError("Sorry we can't find an account with this name");
              }
            } else {
              Toast.showError(
                "Sorry we can't find an account with this email address",
              );
            }
          },
          err => {
            setLoading(false);
            console.log("err", err);
          },
        );
      }
    }, 100)
  };

  useFocusEffect(
    React.useCallback(() => {
      // alert('Use your teachable username and email address to sign-in. NO PASSWORD WILL BE REQUIRED!!')
    }, []),
  );

  const onForgotPasswordPressed = () => {
    setModalVisible(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <CustomHeader customIcon={images.cherylapplogo} />

      <Loader loading={loading} />

      <CustomAlert
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={"Alert"}
        message={
          "PLEASE CHANGE YOUR PASSWORD THROUGH https://course.cherylportermethod.com/"
        }
        android={{
          container: {
            backgroundColor: colors.white,
          },
          title: {
            color: colors.black,
            fontFamily: FontFamily.Poppins.Bold,
            fontSize: 26,
            fontWeight: "700",
          },
          message: {
            color: colors.black,
            fontFamily: FontFamily.Poppins.Bold,
            fontSize: 18,
          },
        }}
      />

      <View style={{ flex: 1 }}>
        <View style={styles.semiCircle} />

        <Text style={styles.labelStyle}>Username</Text>
        <TextInput
          placeholder=""
          style={styles.inputStyles}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <Text style={styles.labelStyle}>Email id</Text>
        <TextInput
          placeholder=""
          style={styles.inputStyles}
          value={email}
          onChangeText={text => {
            setEmail(text);
          }}
        />

        <TouchableOpacity
          style={styles.signInBtn}
          onPress={getUserBasedOnEmail}>
          {loader ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text
              style={{
                color: colors.white,
                fontFamily: FontFamily.Poppins.Medium,
                fontSize: 16,
              }}>
              SIGN IN
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.forgotPassBtn}
          onPress={onForgotPasswordPressed}>
          <Text
            style={{
              color: colors.white,
              fontFamily: FontFamily.Poppins.Regular,
              fontSize: 15,
            }}>
            FORGOT PASSWORD
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
