import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Auth imports
import Signin from '../screens/Signin/index';
import Intro from '../screens/Intro/index';
import Lesson from '../screens/Lesson/index';
import LessonDetails from '../screens/LessonDetails';
import VocalMethods from '../screens/VocalMethods/index';
import ForgotPassword from '../screens/ForgotPassword/index';
import ContactUs from '../screens/ContactUs/index';
import Home from '../screens/Home/index';
// import Invites from '../screens/Invites/index';
// import MyOffice from '../screens/MyOffice/index';
// import Notifications from '../screens/Notifications/index';
// import ListOfVisitors from '../screens/ListOfVisitors/index';
// import VisitorDetails from '../screens/VisitorDetails/index';
// import VisitorsLog from '../screens/VisitorsLog/index';
// import ManualEntryApprovals from '../screens/ManualEntryApprovals/index';
// import ImageScreen from '../screens/ImageScreen/index';
// import CheckIn from '../screens/CheckIn/index';
// import VisitorManualEntry from '../screens/VisitorManualEntry/index';

import ROUTES from './ROUTES';
import {useSelector} from 'react-redux';
// import VectorIcon from '../components/VectorIcon/VectorIcon';
// import constants from '../res/constants';
// import GV from '../utils/GV';
// import { useSelector } from 'react-redux';
// import { SvgXml } from 'react-native-svg';
// import svgs from '../assets/svgs';

const {
  AUTH_STACKS,
  INIT_ROUTES,
  AUTH_ROUTES,
  APP_STACKS,
  APP_ROUTES,
  APP_DRAWER_ROUTES,
  APP_DRAWER_STACK,
  APP_INIT_STACK,
  OTHER_ROUTES,
} = ROUTES;
// const AppBottomStack = (props) => {
//     return <Stack.Navigator screenOptions={stackOpts} initialRouteName={APP_DRAWER_ROUTES.Home.screen_name}>
//         {(APP_DRAWER_STACK || []).map((routeInfo, index) => (
//             <Stack.Screen
//                 key={`AppDrawerss-Screen-key-${index}-${routeInfo.id}`}
//                 name={routeInfo.screen_name}
//                 component={AppDrawerComponents[routeInfo.component]}
//                 options={routeInfo.options ? routeInfo.options : options}

//             />
//         ))}
//     </Stack.Navigator >
// }
const AuthComponents = {
  Signin,
  ForgotPassword,
  Intro,
  ContactUs,
  // Intro,
  // Home,
  // Lesson,
  // VocalMethods,
  // VerifyOTP,
  // SignUp
};
const AppComponents = {
  Home,
  Lesson,
  LessonDetails,
  VocalMethods,
  ContactUs,
  // AppBottomStack,
  // ListOfVisitors,
  // VisitorDetails,
  // VisitorsLog,
  // ManualEntryApprovals,
  // ImageScreen,
  // CheckIn,
  // VisitorManualEntry
};

// const AppStackComponents = {
//     Home,
//     MyOffice,
//     Invites,
//     Notifications,
// }
const ContainerStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const options = () => ({
  gestureEnabled: false,
});

const stackOpts = () => ({
  headerShown: false,
  unmountOnBlur: true,
  swipeEnabled: false,
});

const AuthStacks = props => {
  return (
    <Stack.Navigator
      screenOptions={stackOpts}
      initialRouteName={AUTH_ROUTES.Intro.screen_name}>
      {(AUTH_STACKS || []).map((routeInfo, index) => (
        <Stack.Screen
          key={`AuthStack-Screen-key-${index}-${routeInfo.id}`}
          name={routeInfo.screen_name}
          component={AuthComponents[routeInfo.component]}
          options={routeInfo.options ? routeInfo.options : options}
        />
      ))}
    </Stack.Navigator>
  );
};

const AppStacks = props => {
  return (
    <Stack.Navigator
      screenOptions={stackOpts}
      initialRouteName={APP_ROUTES.VocalMethods.screen_name}>
      {(APP_STACKS || []).map((routeInfo, index) => (
        <Stack.Screen
          key={`AppStack-Screen-key-${index}-${routeInfo.id}`}
          name={routeInfo.screen_name}
          component={AppComponents[routeInfo.component]}
          options={routeInfo.options ? routeInfo.options : options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default props => {
  const {isLoggedIn} = useSelector(state => state.user);
  console.log('isLoggedIn ', isLoggedIn);
  return (
    <ContainerStack.Navigator
      screenOptions={stackOpts}
      initialRouteName={INIT_ROUTES.INIT_APP}>
      <ContainerStack.Screen
        name={INIT_ROUTES.INIT_APP}
        component={isLoggedIn ? AppStacks : AuthStacks}
      />
    </ContainerStack.Navigator>
  );
};
