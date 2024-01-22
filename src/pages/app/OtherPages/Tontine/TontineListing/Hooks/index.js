import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {resetTontine} from '../../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logout} from '../../../../../../redux/Features/authentification/Login/Slice';
import { resetRegister } from '../../../../../../redux/Features/authentification/Register/Slice';
import { resetCode } from '../../../../../../redux/Features/ConfirmAccount/CodeSlice';

export function UseTontines() {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };

  const state = {
    amount: '',
  };

  const onSubmit = async data => {
    // console.log("data", data);
  };

  const numericRegEx = /(?=.*[0-9])/;

  let schema = Yup.object().shape({
    amount: Yup.string()
      .max(20, 'Amount is too long - must be no more than 20 characters.')
      .min(4, 'Amount is too short - must be at least 8 characters.')
      .matches(numericRegEx, 'Must contain a numeric character!')
      .required('Amount required'),
  });

  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  let token = user?.AccessToken;
  let userId = user?.userId;

  const onSuccessAction = () => {};

  const clearAsyncStorage = async () => {
    dispatch(Logout());
    dispatch(resetTontine());
    dispatch(resetCode());
    dispatch(resetRegister());
    await AsyncStorage.clear();
    // navigation.navigate('SplashScreen');
  };

  const onErrorAction = () => {
    clearAsyncStorage();
  };

  let object = {
    token,
    userId,
    onSuccessAction,
    onErrorAction,
  };

  return {
    onSubmit,
    state,
    schema,
    object,
  };
}
