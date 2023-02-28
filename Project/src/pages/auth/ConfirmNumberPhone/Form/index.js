import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Head, Txt} from '../../../../components/utils';
import {PrimaryButtonLinear} from '../../../../components/Buttons';
import {Formik} from 'formik';
import ViewT1 from '../../../../components/views/CardViewType1';
import {UseConfirme} from '../Hooks/UseConfirme';
import {useRef} from 'react';
import {COLORS} from '../../../../theme';
import * as Animatable from 'react-native-animatable';
import icon24RotateCcw from '../../../../Assets/Img/icon24RotateCcw.png';
import HView from '../../../../components/views/HView/HView';
import {
  onConfirmCode,
  onReSendCode,
  resetCode,
} from '../../../../redux/Features/ConfirmAccount/CodeSlice';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logout} from '../../../../redux/Features/authentification/Login/Slice';
import {useNavigation} from '@react-navigation/native';
import {resetRegister} from '../../../../redux/Features/authentification/Register/Slice';
import {resetToken} from '../../../../redux/Features/AppToken/GetToken';

const Form = ({onReturn, userName, onErrorAction, onSuccess}) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const {validationSchemaCode, StateCode} = UseConfirme();
  const {isLoading} = useSelector(state => state.code);
  const {token} = useSelector(state => ({...state.token}));

  let textInput = useRef(null);
  let clockCall = null;

  const lengthInput = 6;
  const defaultCounter = 30;
// console.log('messoe', message)
  const [EnbableResend, setEnbableResend] = useState(false);
  const [Counter, setCounter] = useState(defaultCounter);
  const [interVal, setinterVal] = useState('');

  const decrementColck = () => {
    if (Counter === 0) {
      setEnbableResend(true);
      setCounter(0);
      clearInterval(clockCall);
    } else {
      setCounter(Counter - 1);
    }
  };
  const OnSendOtp = () => {
    if (EnbableResend) {
      setCounter(defaultCounter);
      setEnbableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementColck();
      }, 1000);
    }
  };

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementColck();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });
  useEffect(() => {
    textInput.focus();
  }, []);

  return (
    <View>
      <ViewT1>
        <Formik
          initialValues={StateCode}
          validationSchema={validationSchemaCode}
          onSubmit={(values, formikAction) => {
            const {code} = values;

            let object = {
              code,
              token,
              userName,
              onSuccess,
              onErrorAction,
            };
            dispatch(onConfirmCode(object));
          }}>
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            const {code} = values;

            return (
              <>
                <EnterOtpHeader userName={userName} onReturn={onReturn} />

                <TextInput
                  onChangeText={val => {
                    setinterVal(val);
                    setFieldValue('code', val);
                  }}
                  style={{width: 0, height: 0}}
                  value={interVal}
                  maxLength={lengthInput}
                  returnKeyType="done"
                  keyboardType="numeric"
                  ref={input => {
                    textInput = input;
                  }}
                  onBlur={handleBlur('code')}
                />

                <View style={styles.containerInput}>
                  {Array(lengthInput)
                    .fill()
                    .map((data, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            textInput.focus();
                          }}>
                          <View
                            style={[
                              styles.cellView,
                              {
                                borderBottomColor:
                                  index === interVal?.length
                                    ? COLORS.Vert1
                                    : COLORS.gray,
                              },
                            ]}>
                            <Txt
                              style={styles.cellText}
                              color={
                                colorScheme == 'dark'
                                  ? COLORS.silver
                                  : COLORS.silver
                              }>
                              {interVal && interVal.length > 0
                                ? interVal[index]
                                : ''}
                            </Txt>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>
                {errors.code && touched.code ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.error}>{errors.code} </Text>
                  </Animatable.View>
                ) : null}

                <ResendOtp
                  userName={userName}
                  onErrorAction={onErrorAction}
                  OnSendOtp={OnSendOtp}
                  EnbableResend={EnbableResend}
                  Counter={Counter}
                />

                <PrimaryButtonLinear
                  width={'100%'}
                  onPress={() => {
                    handleSubmit();
                  }}
                  loading={isLoading}
                  disabled={true}>
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

export default Form;

const styles = StyleSheet.create({
  boxImage: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  containerInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    color: COLORS.coral,
    marginVertical: 15,
    paddingLeft: 10,
    fontSize: 13,
  },
});

const EnterOtpHeader = ({onReturn, userName}) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        flexWrap: 'wrap',
      }}>
      <Txt color={COLORS.slateGrey} style={{textAlign: 'center'}}>
        {'Enter your verification code'}
      </Txt>
      <HView>
        <Txt color={COLORS.slateGrey} style={{textAlign: 'center'}}>
          {'sent to'}
        </Txt>
        <Txt style={{paddingHorizontal: 5}} color={COLORS.black} fontSize={17}>
          {userName}
        </Txt>
      </HView>
      <TouchableOpacity onPress={onReturn}>
        <Txt style={{textAlign: 'center'}} color={COLORS.orangeYellow}>
          {'Change it.'}
        </Txt>
      </TouchableOpacity>
    </View>
  );
};

const ResendOtp = ({userName, onErrorAction, OnSendOtp, EnbableResend,Counter}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => ({...state.token}));

  return (

    <>
    
    <TouchableOpacity
      style={styles.boxImage}
      onPress={() => {
        let object = {
          token,
          userName,
          onErrorAction,
          OnSendOtp, //onSuccess
        };
        dispatch(onReSendCode(object));
      }}
      disabled={EnbableResend ? false : true}>
      {EnbableResend ? <Image source={icon24RotateCcw} /> : null}

      <Txt
        style={{
          color: EnbableResend ? COLORS.orangeYellow : COLORS.gray,
          fontSize: 17,
          lineHeight: 20,
          textAlign: 'center',
          paddingLeft: 10,
        }}>
        {'  '} Resend OTP {Counter === 0 ? null : Counter}
      </Txt>
    </TouchableOpacity>
    <View style={styles.space}></View>

    </>
  );
};
