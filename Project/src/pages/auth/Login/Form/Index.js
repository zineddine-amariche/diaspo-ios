import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ViewT1 from '../../../../components/views/CardViewType1';
import {Formik} from 'formik';
import {useLogin} from '../Hooks/UseLogin';
import {Txt} from '../../../../components/utils';
import {PrimaryButtonLinear} from '../../../../components/Buttons';
import {COLORS} from '../../../../theme';
import PrimaryInput from '../../../../components/Input';
import Space from '../../../../components/Space';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPermission,
  login,
  Logout,
  setLoader,
} from '../../../../redux/Features/authentification/Login/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetCode } from '../../../../redux/Features/ConfirmAccount/CodeSlice';
import { resetRegister } from '../../../../redux/Features/authentification/Register/Slice';
import { getkycUserId } from '../../../../redux/Features/kyc/identityVerefication/slice';
import { getUserInformations } from '../../../../redux/Features/authentification/User_informations/slice';
import { resetToken } from '../../../../redux/Features/AppToken/GetToken';

const Form = ({navigation}) => {
  const dispatch = useDispatch();

  const {isLoading} = useSelector(state => ({
    ...state.auth,
  }));

  const {initialValues, validationSchema, hidePass, HandlehidePass} =
    useLogin();

  const navtokyc = (id) => {
    navigation.navigate('KycForm');
    dispatch(setLoader());
    dispatch(getkycUserId(id))
    dispatch(getUserInformations(id));

    // dispatch(setUserInfoOnLogin(payload));
  };
  const navtoReview = (obj,id) => {
    navigation.navigate('KycStatusPage',{obj,id:id});
    dispatch(setLoader());
    dispatch(getkycUserId(id))
    dispatch(getUserInformations(id));


  };
  const navtoHomePage = (id) => {
    dispatch(getPermission());
    dispatch(getkycUserId(id))
    dispatch(getUserInformations(id));

  };
  const onErrorAction = async () => {
    dispatch(resetToken())
    dispatch(resetCode());
    dispatch(Logout());
    dispatch(resetRegister());
    navigation.navigate('SplashScreen');
    await AsyncStorage.clear();
  };

  return (
    <View style={{marginHorizontal: 20}}>
      <ViewT1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikAction) => {
            let object = {
              navtokyc,
              navtoReview,
              navtoHomePage,
              user: values,
              onErrorAction
            };
            formikAction.resetForm();
            dispatch(login(object));
          }}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            touched,
            isValid,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            const {userName, userPassword} = values;

            return (
              <>
                <PrimaryInput
                  name={userName}
                  Label={'Email Or Phone number'}
                  placeholder="Your full name"
                  style={styles.Input}
                  errors={errors.userName}
                  touched={touched.userName}
                  value={userName}
                  onBlur={handleBlur('userName')}
                  onChangeText={handleChange('userName')}
                  keyboardType="email-address"
                />
                <Space space={20} />
                <PrimaryInput
                  placeholder="Your password"
                  style={styles.Input}
                  name={userPassword}
                  id={userPassword}
                  value={userPassword}
                  onBlur={handleBlur('userPassword')}
                  onChangeText={handleChange('userPassword')}
                  Label="Password"
                  secureTextEntry={hidePass ? true : false}
                  isPassword={'pass'}
                  hidePass={hidePass}
                  HandlehidePass={HandlehidePass}
                  errors={errors.userPassword}
                  touched={touched.userPassword}
                />

                <Space space={10} />

                <TouchableOpacity
                  style={styles.password}
                  onPress={() => {
                    navigation.navigate('Forgot');
                  }}>
                  <Txt color={COLORS.yellow}>Forgot your password</Txt>
                </TouchableOpacity>

                <Space space={30} />
                <PrimaryButtonLinear
                  width={'100%'}
                  onPress={() => {
                    handleSubmit();
                  }}
                  loading={isLoading}
                  disabled={isValid}>
                  Login
                </PrimaryButtonLinear>
              </>
            );
          }}
        </Formik>
      </ViewT1>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Input: {
    color: COLORS.Noir,
    fontSize: 16,
    // fontFamily: 'Roboto-Bold',
    flex: 1,
    paddingLeft: 2,
  },
  password: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
});

// let msg = message?.StatusDescription
//   ? message?.StatusDescription
//   : 'Somthing went wrong.';

// let msg2 = message?.statusDescription
//   ? message?.statusDescription
//   : 'Somthing went wrong.';

// useEffect(() => {
//   if (isError && message?.status === 'error') {
//     Alert.alert(message?.status, msg, [
//       {
//         text: 'Cancel',
//         onPress: () => dispatch(resetLogin()),
//         style: 'cancel',
//       },
//       {text: 'OK', onPress: () => dispatch(resetLogin())},
//     ]);
//   }
//   if (isError && message?.status === 'failure') {
//     Alert.alert(message?.status, msg2, [
//       {
//         text: 'Cancel',
//         onPress: () => dispatch(Logout()),
//         style: 'cancel',
//       },
//       {text: 'OK', onPress: () => dispatch(Logout())},
//     ]);
//   }
// }, [user, isError, isSuccess, message, dispatch]);

// console.log('user', user)
// console.log('isError', isError)
// console.log('isSuccess', isSuccess)
//  console.log('message', message)
// console.log('message', message.StatusDescription)
