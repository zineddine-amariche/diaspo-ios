import {StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import AuthLayout from '../../../components/views/Layouts/AuthLayout';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Forms from './Forms';
import {useDispatch, useSelector} from 'react-redux';
import Spiner from '../../../components/spiner';
import {resetRegister} from '../../../redux/Features/authentification/Register/Slice';
import {useRegister} from './Hooks/useRegister';
import {activateReturn} from '../../../redux/Features/authentification/Register/perssistingRegisterInputs/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetCode} from '../../../redux/Features/ConfirmAccount/CodeSlice';
import {Logout} from '../../../redux/Features/authentification/Login/Slice';
import {getkycUserId} from '../../../redux/Features/kyc/identityVerefication/slice';
import {getUserInformations} from '../../../redux/Features/authentification/User_informations/slice';
import {resetToken} from '../../../redux/Features/AppToken/GetToken';

const Register = ({navigation, navigation: {goBack}}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const {isLoading} = useSelector(state => state.register);
  const {clearItem} = useRegister();

  const onSuccess = (userName, id) => {
    dispatch(getkycUserId(id));
    dispatch(getUserInformations(id));

    navigation.navigate('ConfirmPhoneNum', {
      userName,
    });
    clearItem('step1FormData');
    clearItem('step2FormData');
    clearItem('step3FormData');
    clearItem('step4FormData');
    setStep(1);
  };

  const onErrorAction = async () => {
    dispatch(resetRegister());
    dispatch(resetToken());
    dispatch(resetCode());
    dispatch(Logout());
    clearItem('step1FormData');
    clearItem('step2FormData');
    clearItem('step3FormData');
    clearItem('step4FormData');
    setStep(1);

    await AsyncStorage.clear();
    navigation.navigate('SplashScreen');
  };

  const onUserExist = () => {
    dispatch(resetRegister());
    clearItem('step1FormData');
    clearItem('step2FormData');
    clearItem('step3FormData');
    clearItem('step4FormData');
    setStep(1);
  };

  const [IsTouched, setIsTouched] = useState(false);
  const [IsTouchedNationality, setIsTouchedNationality] = useState(false);

  const returnback = () => {
    if (step === 1) {
      goBack();
      dispatch(resetRegister());
      clearItem('step1FormData');
      clearItem('step2FormData');
      clearItem('step3FormData');
      clearItem('step4FormData');
      setStep(1);
    } else if (step > 1) {
      setStep(step - 1);
      dispatch(activateReturn(step - 1));
      setIsTouched(false);
    }
  };
  const scrollViewRef = useRef(null);

  const refSubmit = values => {
    // handle form submission
    scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  return (
    <AuthLayout
      Title={'Create a new account'}
      goBack={() => {
        returnback();
      }}
      width={'70%'}>
      <View style={styles.space}>
        {isLoading ? (
          <Spiner />
        ) : (
          <View
            style={{
              overflow: 'hidden',
              // flex: 1,
              backgroundColor: '#FFF',
              marginHorizontal: 20,
              borderRadius: 8,
              justifyContent:"center",
              paddingVertical:step ==4 ?0:20,
              paddingTop:step ==4?20:0
            }}>
            <KeyboardAwareScrollView
              extraHeight={180}
              enabledOnAndroid
              innerRef={scrollViewRef}>
              <Forms
                navigation={navigation}
                step={step}
                setStep={setStep}
                setIsTouched={setIsTouched}
                IsTouched={IsTouched}
                IsTouchedNationality={IsTouchedNationality}
                setIsTouchedNationality={setIsTouchedNationality}
                onSuccess={onSuccess}
                onUserExist={onUserExist}
                onErrorAction={onErrorAction}
                refSubmit={refSubmit}
              />
            </KeyboardAwareScrollView>
          </View>
        )}
      </View>
    </AuthLayout>
  );
};

export default Register;

const styles = StyleSheet.create({
  space: {
    flex: 1,
    paddingBottom: 30,
  },
});

// useEffect(() => {
//   if (status && user?.StatusDescription) {
//     Alert.alert(
//       user.status,
//       user?.StatusDescription
//         ? JSON.stringify(user?.StatusDescription)
//         : 'Something went wrong',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => dispatch(resetRegister()),
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => dispatch(resetRegister())},
//       ],
//     );
//   }

//   if (status && user?.status === 'success') {
//     navigation.navigate('ConfirmPhoneNum', {
//       userName: user?.data?.walletAccountUser?.email,
//     });
//     clearItem('step1FormData');
//     clearItem('step2FormData');
//     clearItem('step3FormData');
//     clearItem('step4FormData');
//     setStep(1);
//   }

//   // dispatch(reset());
// }, [user, isError, message, dispatch]);

// useEffect(() => {
//   if (message) {
//     Alert.alert('Error', message ? message : 'Something went wrong', [
//       {
//         text: 'Cancel',
//         onPress: () => dispatch(resetRegister(), setStep(1)),
//         style: 'cancel',
//       },
//       {text: 'OK', onPress: () => dispatch(resetRegister(), setStep(1))},
//     ]);
//   }
// }, [message]);

// console.log('step', step)
