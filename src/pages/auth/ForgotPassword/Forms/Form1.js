import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Head, Txt} from '../../../../components/utils';
import {Formik} from 'formik';
import ViewT1 from '../../../../components/views/CardViewType1';
import {PrimaryButtonLinear} from '../../../../components/Buttons';
import {useForgot} from '../Hooks/UseForgot';
import {COLORS} from '../../../../theme';
import icon24RotateCcw from '../../../../Assets/Img/icon24RotateCcw.png';
import {useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import {useSelector} from 'react-redux';

const Form1 = ({handleNextForm}) => {
  const {StateCode, validationSchemaCode} = useForgot();
  let textInput = useRef(null);
  let clockCall = null;
  const colorScheme = useColorScheme();

  const lengthInput = 6;
  const defaultCounter = 30;
  const [interVal, setinterVal] = useState('');
  const [Counter, setCounter] = useState(defaultCounter);
  const [EnbableResend, setEnbableResend] = useState(false);

  const {isError, isSuccess, message} = useSelector(state => ({
    ...state.confirmpass,
  }));

  const {username} = useSelector(state => ({
    ...state.forgot,
  }));

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementColck();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

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
    textInput.focus();
  }, []);

 
  return (
    <View style={{marginHorizontal: 20}}>
      <ViewT1>
        <Formik
          initialValues={StateCode}
          validationSchema={validationSchemaCode}
          onSubmit={(values, formikAction) => {
            formikAction.setSubmitting(false);
            let object = {
              username,
              confirmationCode: values.code,
            };
            handleNextForm(object);
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
                <Head style={styles.label}>{'Enter OTP code'}</Head>
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
                            <Txt style={styles.cellText} 
                            
                            color={
                              colorScheme == 'dark'
                                ? COLORS.silver
                                : COLORS.silver
                            }
                            >
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
                <TouchableOpacity
                  style={[styles.boxImage, {}]}
                  onPress={OnSendOtp}
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
                <PrimaryButtonLinear
                  width={'100%'}
                  onPress={() => {
                    handleSubmit();
                  }}
                  loading={isSubmitting}
                  disabled={interVal.length}>
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

export default Form1;

const styles = StyleSheet.create({
  label: {
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 20,
  },
  bodyText: {
    fontSize: 17,
    lineHeight: 20,

    textAlign: 'center',
    paddingLeft: 10,
  },
  boxImage: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  codeContainer: {
    marginTop: 30,
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
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
