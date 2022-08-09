
const INIT_ROUTES = {
    "INIT_APP": "INIT_APP",

};

const AUTH_ROUTES = {
    "Intro": {
        screen_name: "INTRO",
        options: null,
    },
    "Signin": {
        screen_name: "SIGNIN",
        options: null,
    },
    "ForgotPassword": {
        screen_name: "FORGOTPASSWORD",
        options: null,
    },
    "ContactUs": {
        screen_name: "CONTACTUS",
        options: null,
    },


};
// const APP_DRAWER_ROUTES = {
//     "Home": {
//         screen_name: "Menu",
//         options: null,
//     },
//     "Notifications": {
//         screen_name: "Notifications",
//         options: null,
//     },
//     "Invites": {
//         screen_name: "Invites",
//         options: null,
//     },
//     "MyOffice": {
//         screen_name: "My Office",
//         options: null,
//     },

// }
const APP_ROUTES = {

    "Home": {
        screen_name: "HOME",
        options: null,
    },
    "Lesson": {
        screen_name: "LESSON",
        options: null,
    },
    "LessonDetails": {
        screen_name: "LESSON_DETAILS",
        options: null,
    },
    "VocalMethods": {
        screen_name: "VOCALMETHODS",
        options: null,
    },
    "ContactUs": {
        screen_name: "CONTACTUS",
        options: null,
    },
};
const AUTH_STACKS = Object.keys(AUTH_ROUTES).map((key, index) => ({ id: `init-${index}-${key}`, screen_name: AUTH_ROUTES[key].screen_name, component: key }));
const APP_STACKS = Object.keys(APP_ROUTES).map((key, index) => ({ id: `init-${index}-${key}`, screen_name: APP_ROUTES[key].screen_name, component: key }));
// const APP_DRAWER_STACK = Object.keys(APP_DRAWER_ROUTES).map((key, index) => ({ id: `init-${index}-${key}`, screen_name: APP_DRAWER_ROUTES[key].screen_name, component: key }));
// const APP_INIT_STACK = Object.keys(OTHER_ROUTES).map((key, index) => ({ id: `init-${index}-${key}`, screen_name: OTHER_ROUTES[key].screen_name, component: key }));
export default {
    AUTH_ROUTES,
    AUTH_STACKS,
    APP_ROUTES,
    APP_STACKS,
    INIT_ROUTES,
    // APP_DRAWER_STACK,
    // APP_DRAWER_ROUTES,
    // APP_INIT_STACK,
    // OTHER_ROUTES
}

