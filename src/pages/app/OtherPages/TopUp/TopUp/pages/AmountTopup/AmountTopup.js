import { StyleSheet, Keyboard, View, Pressable} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Formik} from 'formik';
import {useAmoutTopup} from './Hooks/useAmountTopup';
import Space from '../../../../../../../components/Space';
import {
  PrimaryButtonLinear,
} from '../../../../../../../components/Buttons';
import {COLORS} from '../../../../../../../theme';
import PrimaryInput from '../../../../../../../components/Input';
import ReturnHeader from '../../../../../../../components/Headers/root/ReturnHeader';
import CreatedSuccess from '../../../../../../../components/views/Layouts/AuthLayout/Model';
import {useDispatch, useSelector} from 'react-redux';
import {handlAmount} from '../../../../../../../redux/Features/Payements/MTN/slice';
import {ShowBg} from '../../../../../../../redux/Features/Payements/creditCard/slice';
import {KeyboardAvoidingView} from 'react-native';
import { BodyModel, BodyModelErr } from '../../../../../../../components/Models/payements';

const AmountTopup = ({navigation, route}) => {
  const {onSubmit, onCheckout, state, schema} = useAmoutTopup();
  const {data, item} = route.params;

  const {isLoading} = useSelector(state => state.transaction);
  const {isCreditCardLoading, bg} = useSelector(state => state.creditCard);
  const dispatch = useDispatch();

  const [success, setsuccess] = useState(false);
  const [error, setError] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
    navigation.navigate('TopUp', {data});
  }, []);

  const onDissmisError = useCallback(() => {
    setError(false);
    navigation.navigate('TopUp', {data});
  }, []);

  const showSuccess = () => {
    setsuccess(true);
    dispatch(ShowBg(false));
  };
  const onSuccessAction = useCallback((value, clientSecret) => {
    dispatch(handlAmount(value));
    setTimeout(() => {
      let obj = {
        showSuccess,
        clientSecret,
      };
      onCheckout(obj);
    }, 700);
  }, []);

  const onSuccessActionMTN = useCallback((value, clientSecret) => {
    dispatch(handlAmount(value/100));
    setTimeout(() => {
      setsuccess(true);
    }, 700);
  }, []);

  const onErrorAction = useCallback(() => {
    setError(true);
    dispatch(ShowBg(false));
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ReturnHeader
      title={'Top up method'}
      goBack={() => {
        navigation.navigate('TopUp', {data});
      }}
      Loading={isLoading || isCreditCardLoading}>
      {bg ? (
        <View
          style={{
            flex: 1,

            backgroundColor: COLORS.blueGreenOpacity9,
            position: 'absolute',
            height: '100%',
            width: '100%',
            zIndex: 2,
            marginTop: 90,
          }}></View>
      ) : null}

      <View
        style={{
          flex: 1,
          padding: 1,
          width: '100%',
          alignItems: 'center',
          backgroundColor: COLORS.finished,
        }}>
        <Space space={20} />
        <Formik
          initialValues={state}
          validationSchema={schema}
          onSubmit={(values, formikAction) => {
            formikAction.setSubmitting(false);
            formikAction.resetForm();

            let obj = {
              amount: Math.floor(values.amount * 100),
              type: item.value,
              currency: 'EUR',
              originator: {
                originatorType: 'User',
                originatorId: data?.userId,
              },
              description: 'Top Up',
              regions: ['5e99a07063389569485205f3'],
            };
            let info = {
              accountId: data.accountId,
              userId: data?.userId,
              obj,
              amount: Math.floor(values.amount * 100),
            };
            let object = {
              info,
              onErrorAction,
              onSuccessAction,
              onSuccessActionMTN,
            };
            onSubmit(object);
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
            const {amount} = values;

            return (
              <KeyboardAvoidingView
                style={{flex: 1, width: '100%', alignItems: 'center'}}
                behavior="padding">
                <Pressable
                  style={{
                    backgroundColor: COLORS.finished,
                    width: '90%',
                    flex: 1,
                    justifyContent: 'space-between',
                  }}
                  onPress={dismissKeyboard}
                  
                  >
                  <Pressable
                    style={{
                      backgroundColor: COLORS.white,
                      borderRadius: 8,
                      shadowColor: '#171717',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                      elevation: 2,
                      padding: 20,
                      marginTop: 10,
                      width: '100%',
                    }}
                    onPress={dismissKeyboard}>
                    {/* <Txt color={COLORS.slateGrey} fontSize={14}>
                      You are topping up your {item?.label} account in euro
                      using
                      <Txt color={COLORS.darkBlueGrey}>
                        {' '}
                        Credit Card No.
                        {item?.price}.
                      </Txt>
                    </Txt> */}
                    <Space space={20} />
                    <View style={{height: 90}}>
                      <PrimaryInput
                        name={amount}
                        Label={'Top up amount'}
                        placeholder="15.000"
                        style={styles.Input}
                        errors={errors.amount}
                        touched={touched.amount}
                        value={amount}
                        onBlur={() => {
                          handleBlur('amount');
                          dismissKeyboard();
                        }}
                        onChangeText={handleChange('amount')}
                        amount="euro"
                        keyboardType="numeric"
                      />
                    </View>
                    <Space space={20} />
                  </Pressable>
                  <View style={styles.containerButton}>
                    <PrimaryButtonLinear
                      width={'100%'}
                      onPress={() => {
                        handleSubmit();
                      }}
                      disabled={true}
                      loading={isLoading}>
                      Next
                    </PrimaryButtonLinear>
                  </View>
                </Pressable>
              </KeyboardAvoidingView>
            );
          }}
        </Formik>
      </View>
      <CreatedSuccess Visible={success} onDissmis={onDissmis} top={90}>
        {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
      </CreatedSuccess>

      <CreatedSuccess Visible={error} onDissmis={onDissmisError} top={90}>
        {BodyModel ? <BodyModelErr  onDissmis={onDissmisError} /> : null}
      </CreatedSuccess>
    </ReturnHeader>
  );
};

export default AmountTopup;

// const BodyModel = ({onDissmis}) => {
//   const {amount} = useSelector(state => state.transaction);
//   return (
//     <>
//       <View style={styles.ModelContainer}>
//         <Image source={illusphone} style={{width: '100%'}} />

//         <Head
//           //  fontFamily={"Poppins-Bold"}
//           style={{padding: 20, textAlign: 'center'}}>
//           Transfered successfully
//         </Head>
//         <Txt
//           color={COLORS.slateGrey}
//           style={{
//             paddingHorizontal: 10,
//             textAlign: 'center',
//             //fontFamily: "Poppins-SemiBold",
//           }}>
//           <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
//             {amount / 100} euro
//           </Txt>{' '}
//           has been transfered successfully
//           {/* to
//           <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
//             {' '}
//             Faith Felicity (+44 7538 110953).
//           </Txt>
//           You can check in your account
//           <Txt Bold={'400'} color={COLORS.orangeYellow} fontSize={17}>
//             {' '}
//             transaction history.
//           </Txt>
//           . */}
//         </Txt>

//         <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
//       </View>
//     </>
//   );
// };
// const BodyModelErr = ({onDissmis}) => {
//   return (
//     <>
//       <View style={styles.ModelContainer}>
//         <Image source={illusErr} style={{width: '100%'}} />

//         <Head
//           //  fontFamily={"Poppins-Bold"}
//           style={{padding: 20, textAlign: 'center'}}
//           color={COLORS.coral}>
//           Topped up unsuccessfully
//         </Head>
//         <Txt
//           color={COLORS.slateGrey}
//           style={{
//             paddingHorizontal: 10,
//             textAlign: 'center',
//             //fontFamily: "Poppins-SemiBold",
//           }}>
//           Sorry, something went wrong. Please try agian.
//         </Txt>

//         <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
//       </View>
//     </>
//   );
// };
const styles = StyleSheet.create({
  containerButton: {backgroundColor: COLORS.white,  },
});
