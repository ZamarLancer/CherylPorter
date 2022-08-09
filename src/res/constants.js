import {Dimensions} from 'react-native';
export default {
  app_version: '2.3.1',
  url_qa: 'https://com',
  screen_dimensions: Dimensions.get('screen'),
  window_dimensions: Dimensions.get('window'),
  horizontal_margin: 10,
  spacing_horizontal: 10,
  spacing_vertical: 10,
  cart_icon: 'home',
};
export const VALIDATION_CHECK = text => {
  text = `${text}`.toLowerCase().trim();
  if (
    text === '' ||
    text === ' ' ||
    text === 'null' ||
    text === 'undefined' ||
    text === 'false'
  ) {
    return false;
  }
  return true;
};
