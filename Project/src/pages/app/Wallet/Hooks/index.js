import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import { Logout } from '../../../../redux/Features/authentification/Login/Slice';
import { resetRegister } from '../../../../redux/Features/authentification/Register/Slice';
import { resetCode } from '../../../../redux/Features/ConfirmAccount/CodeSlice';
import { resetTontine } from '../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';

export function UseWallets() {
  const dispatch = useDispatch();

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
  };

  const onErrorAction = () => {
    clearAsyncStorage();
  };


  let object = {
    token,
    userId,
    onErrorAction,
    onSuccessAction
  };

  return {
    dispatch,
    object,
  };
}
