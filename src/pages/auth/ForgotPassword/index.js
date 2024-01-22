import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {COLORS} from '../../../theme';
import {Txt} from '../../../components/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useState} from 'react';
import Form0 from './Forms/Form0';
import Form1 from './Forms/Form1';
import AuthLayout from '../../../components/views/Layouts/AuthLayout';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetForgot} from '../../../redux/Features/authentification/ForgotPass/Slice';

const initialState = {
  email_phone: '',
  code: '',
};

const Forgot = ({navigation, navigation: {goBack}}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [data, setData] = useState(initialState);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = (newData, final = false) => {
    setData(prev => ({...prev, ...newData}));
    if (final) {
      return;
    }
    setCurrentStep(prev => prev + 1);
  };
  const Navigate = object => {
    navigation.navigate('CreatPassword', {object});
  };

  const onSuccesReq = () => {
    handleNextStep();
  };

  useEffect(() => {
    if (!isFocused) {
      setCurrentStep(0);
    }
  }, [isFocused]);

  const steps = [
    <Form0 data={data} currentStep={currentStep} onSuccesReq={onSuccesReq} />,
    <Form1
      data={data}
      currentStep={currentStep}
      navigation={navigation}
      handleNextForm={Navigate}
    />,
  ];

  return (
    <AuthLayout
      Title={'Forgot your password'}
      goBack={() => {
        goBack();
        setCurrentStep(0);
        dispatch(resetForgot());
      }}
      width={'70%'}>
      <View style={styles.container}>
        <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
          {steps[currentStep]}
        </KeyboardAwareScrollView>
        <BottomNav />
      </View>
    </AuthLayout>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 40,
    paddingTop: 10,
  },
  text: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  sign: {
    textDecorationLine: 'underline',
    paddingLeft: 10,
  },
});

const BottomNav = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.text}>
      <Txt color={COLORS.white}>Here for the first time?</Txt>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Txt color={COLORS.yellow} style={styles.sign}>
          Sign Up
        </Txt>
      </TouchableOpacity>
    </View>
  );
};
