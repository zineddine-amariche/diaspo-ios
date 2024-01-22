import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logout } from '../../../../redux/Features/authentification/Login/Slice';
import { resetTontine } from '../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import { resetCode } from '../../../../redux/Features/ConfirmAccount/CodeSlice';
import { resetRegister } from '../../../../redux/Features/authentification/Register/Slice';
import { clearPassportDoc, clearProofDocument, handleClearBackPhotoDocument, handleClearFrontPhotoDocument, handleClearSelfiePhotoObject, setStep } from '../../../../redux/Features/kyc/identityVerefication/slice';
import {useNavigation} from '@react-navigation/native';
 

export function UseIdentity() {
  const dispatch = useDispatch();

  const onSubmit = async data => {
    // console.log("data", data);
  };

  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  let token = user?.AccessToken;
  let userId = user?.userId;

  let objectWallet = {
    userId,
    token,
  };

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
    onSuccessAction,
    onErrorAction,
  };


  const onClose = (nav,setTypeFileToSend) => {
    nav.navigate('login');
    setTypeFileToSend('PHOTO_CARD');
    dispatch(setStep(1));
    dispatch(handleClearSelfiePhotoObject());
    dispatch(handleClearFrontPhotoDocument());
    dispatch(handleClearBackPhotoDocument());
    dispatch(clearProofDocument());
    dispatch(clearPassportDoc());
  };

 

  return {
    onSubmit,
    object,
    objectWallet,
    onClose
  };
}
