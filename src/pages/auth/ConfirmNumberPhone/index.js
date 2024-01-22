import {Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AuthLayout from '../../../components/views/Layouts/AuthLayout';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Form from './Form';
import {Head, Txt} from '../../../components/utils';
import illusphone from '../../../Assets/Img/illusphone.png';
import {COLORS} from '../../../theme';
import {CircleButton} from '../../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import Spiner from '../../../components/spiner';
import {resetCode} from '../../../redux/Features/ConfirmAccount/CodeSlice';
import {resetRegister} from '../../../redux/Features/authentification/Register/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logout} from '../../../redux/Features/authentification/Login/Slice';

const ConfirmPhoneNum = ({navigation, navigation: {goBack}, route}) => {
  const dispatch = useDispatch();
  
  const {isLoading} = useSelector(state => state.code);

  const [ShowSucces, setShowSucces] = useState(false);
  const {userName} = route.params;


  const onSuccess = () => {
    setShowSucces(true);
  };
  const onErrorAction = async () => {
    dispatch(resetCode());
    dispatch(Logout());
    dispatch(resetRegister());
    await AsyncStorage.clear();
    navigation.navigate('SplashScreen');
  };
  const onDissmis = () => {
    setShowSucces(false);
    navigation.navigate('KycForm');
    // navigation.navigate('login');
  };

  return (
    <AuthLayout
      Title={'Confirm your account'}
      BodyModel={BodyModel}
      goBack={() => {
        goBack();
        dispatch(resetRegister());
      }}
      width={'76%'}
      Visible={ShowSucces}
      onDissmis={() => {
        onDissmis();
        dispatch(resetRegister());
      }}
      top={'10%'}>
      {isLoading ? (
        <Spiner />
      ) : (
        <View style={styles.space}>
          <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
            <Form
              onSuccess={onSuccess}
              onErrorAction={onErrorAction}
              navigation={navigation}
              userName={userName}
              onReturn={() => {
                navigation.navigate('Register');
                dispatch(resetRegister());
              }}
            />
          </KeyboardAwareScrollView>
        </View>
      )}
    </AuthLayout>
  );
};

export default ConfirmPhoneNum;

const styles = StyleSheet.create({
  space: {
    padding: 20,
  },
});
const BodyModel = ({top, onDissmis}) => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusphone} style={{width: '100%'}} />

        <Head
          // fontFamily={'Poppins-Bold'}
          style={{padding: 20, textAlign: 'center'}}>
          Congratulation! Your wallet has been created
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 20,
            textAlign: 'center',
            // fontFamily: 'Poppins-SemiBold',
          }}>
          More information needs to be confirmed in your profile before you can make any transactions.
        </Txt>
        <View style={{height: 20}}></View>

        <CircleButton
          marginVertical={5}
          onPress={() => {
            onDissmis();
            dispatch(resetRegister());
          }}
        />

        <View style={{height: 20}}></View>
      </View>
    </>
  );
};

// useEffect(() => {
//   if (isError && message?.status === 'error') {
//     Alert.alert(
//       message?.status,
//       message?.StatusDescription
//         ? JSON.stringify(message?.StatusDescription)
//         : 'The code is incorrect',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => dispatch(resetCode()),
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => dispatch(resetCode())},
//       ],
//     );
//   }

//   if (isSuccess || userData) {
//     // navigation.navigate("login");
//     setShowSucces(true);
//   }

//   dispatch(resetCode());
// }, [userData, isError, isSuccess, message, dispatch]);
