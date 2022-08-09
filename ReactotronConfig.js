import Reactotron from 'reactotron-react-native';

const reactotron = Reactotron.configure({host: '192.168.1.4'})
  .useReactNative() // add all built-in react native plugins
  .connect();
