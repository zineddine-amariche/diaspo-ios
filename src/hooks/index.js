import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {resetToken} from '../redux/Features/AppToken/GetToken';
import {Logout} from '../redux/Features/authentification/Login/Slice';
import {resetRegister} from '../redux/Features/authentification/Register/Slice';
import {resetCode} from '../redux/Features/ConfirmAccount/CodeSlice';

export const onError = (status, message, action) => {
  Toast.show(`${status} , ${message}`);
  if (action) {
    action();
  } else {
    return;
  }
};

export const onSucces = (status, message, action) => {
  Toast.show(`${status} , ${message}`);
  if (action) {
    action();
  } else {
    return;
  }
};

export const onExpiredToken = async (navigation, dispatch) => {
  dispatch(resetToken());
  dispatch(resetCode());
  dispatch(Logout());
  dispatch(resetRegister());
  navigation.navigate('SplashScreen');
  await AsyncStorage.clear();
};
