import {store} from '../redux/store';
import axios from 'axios';
import {encode} from 'base-64';

const dispatch = store.dispatch;

let auth = {
  username: 'info@borncreative.net',
  password: 'Act313364!@##@!',
};
let APIKey = '1TrDbOwFAZj06FcWPJxpm8nZftmVC2DH';
export const postRequest = async (
  url,
  data,
  onSuccess = () => {},
  onError = () => {},
  headers = {},
  showLoader = true,
  customLoader = null,
) => {
  if (customLoader) {
    customLoader(true);
  }
  try {
    fetch(url, {
      method: 'post',
      headers: new Headers({
        Authorization: 'Basic ' + encode(auth.username + ':' + auth.password),
        'Content-Type': 'application/json',
        apiKey: APIKey,
      }),
      body: JSON.stringify(data),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('data', data);
        onSuccess(data);
      });
  } catch (error) {
    console.log('[ApiManager].postRequest.error', error);
    onError(error);
  } finally {
    if (customLoader) {
      customLoader(false);
    }
  }
};
export const getRequest = async (
  url,
  onSuccess = () => {},
  onError = () => {},
  headers = {},
  showLoader = true,
) => {
  try {
    fetch(url, {
      method: 'get',
      headers: new Headers({
        Authorization: 'Basic ' + encode(auth.username + ':' + auth.password),
        'Content-Type': 'application/json',
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log('data', data);
        onSuccess(data);
      });
  } catch (error) {
    // console.log("[ApiManager].getRequest.error", error);
    onError(error);
  }
};
