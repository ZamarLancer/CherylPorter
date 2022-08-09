import React from 'react';
import {showMessage} from 'react-native-flash-message';
class Toast {
  static showSuccess(description, title = 'Success') {
    showMessage({
      message: title,
      description: description,
      type: 'success',
    });
  }
  static showError(description, title = 'Error') {
    showMessage({
      message: title,
      description: description,
      type: 'danger',
    });
  }
}

export default Toast;
