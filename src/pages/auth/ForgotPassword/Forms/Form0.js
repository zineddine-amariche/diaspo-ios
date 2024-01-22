import {View, StyleSheet} from 'react-native';
import React from 'react';
import ViewT1 from '../../../../components/views/CardViewType1';
import {Formik} from 'formik';
import PrimaryInput from '../../../../components/Input';
import {Txt} from '../../../../components/utils';
import {PrimaryButtonLinear} from '../../../../components/Buttons';
import {useForgot} from '../Hooks/UseForgot';
import {COLORS} from '../../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  sendReqcode,
  setUserName,
} from '../../../../redux/Features/authentification/ForgotPass/Slice';
import {resetCode} from '../../../../redux/Features/ConfirmAccount/CodeSlice';
import {Logout} from '../../../../redux/Features/authentification/Login/Slice';
import {resetRegister} from '../../../../redux/Features/authentification/Register/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Form0 = ({onSuccesReq}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {isLoading} = useSelector(state => ({...state.forgot}));
  const {StateEmail, validationSchema} = useForgot();

  const onErrorAction = async () => {
    dispatch(resetCode());
    dispatch(Logout());
    dispatch(resetRegister());
    await AsyncStorage.clear();
    navigation.navigate('SplashScreen');
  };

 

  return (
    <View style={{marginHorizontal: 20}}>
      <ViewT1>
        <Formik
          initialValues={StateEmail}
          validationSchema={validationSchema}
          onSubmit={(values, formikAction) => {
            let object = {
              user:values,
              onErrorAction,
              onSuccesReq
            };
            dispatch(sendReqcode(object));
            dispatch(setUserName(values.email_phone));
          }}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            isSubmitting,
          }) => {
            const {email_phone} = values;

            return (
              <>
                <PrimaryInput
                  name="nom"
                  Label={'Register email'}
                  placeholder="Typing"
                  style={styles.Input}
                  errors={errors.email_phone}
                  touched={touched.email_phone}
                  value={email_phone}
                  onBlur={handleBlur('email_phone')}
                  onChangeText={handleChange('email_phone')}
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.silver}
                />

                <Txt style={styles.bodyText}>
                  We will send a OTP code to your registered email address.
                </Txt>
                <View style={styles.space}></View>
                <PrimaryButtonLinear
                  width={'100%'}
                  onPress={() => {
                    handleSubmit();
                  }}
                  loading={isLoading}
                  disabled={email_phone.length >= 3}>
                  NEXT
                </PrimaryButtonLinear>
              </>
            );
          }}
        </Formik>
      </ViewT1>
    </View>
  );
};

export default Form0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 20,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.slateGrey,
    textAlign: 'center',
    marginTop: 15,
  },
  Input: {
    color: COLORS.Noir,
    fontSize: 16,
    flex: 1,
    paddingLeft: 2,
  },
});
