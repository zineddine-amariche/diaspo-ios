import {Platform, StyleSheet, Text, View} from 'react-native';
import React, { useCallback, useRef } from 'react';
import {Formik} from 'formik';
import {useAmoutTopup} from './Hooks/useAmountTopup';
import Bottom4 from '../../BottomSheetPassword';
import Space from '../../../../../../../components/Space';
import ViewT1 from '../../../../../../../components/views/CardViewType1';
import { Txt } from '../../../../../../../components/utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { PrimaryButtonLinear } from '../../../../../../../components/Buttons';
import { COLORS } from '../../../../../../../theme';
import PrimaryInput from '../../../../../../../components/Input';
import ReturnHeader from '../../../../../../../components/Headers/root/ReturnHeader';
import { useSelector } from 'react-redux';

const AmountTopup = ({navigation,route}) => {
  const {onSubmit, state, schema} = useAmoutTopup();
  const bottomSheetModalRef = useRef(null);
  const {data,item} = route.params;

console.log('item', item)
//   const DeleteSelectMethod = () => {
//     setSelectMethod(null);
//   };
const {user} = useSelector(state => ({
  ...state.auth,
}));


console.log('user', user)
let token = user?.AccessToken;
let userId = user?.userId;


  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onSuccess = useCallback(() => {
    // setsuccess(true);
  }, []);
  const onError = useCallback(() => {
    // setsuccess(true);
  }, []);
  return (
    <ReturnHeader
    title={'Top up method'}
    goBack={() => {
      navigation.navigate("TopUp",{data});
    }}>
    <>
      <Formik
        initialValues={state}
        validationSchema={schema}
        onSubmit={(values, formikAction) => {
          formikAction.setSubmitting(false);
          formikAction.resetForm();


          let obj ={
            "amount": values.amount,
            "type": "MTN",
            "currency": "EUR",
            "originator": {
            "originatorType": "User",
            "originatorId": userId
            },
            "description": "Top Up",
            "regions": [
            "5e99a07063389569485205f3"
            ]
            }
            
          onSubmit(obj);
          // handlePresentModalPress();
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
      
            <>
              <Space space={30} />
              <View style={{padding: 20}}>
                <ViewT1>
                  <Txt color={COLORS.slateGrey} fontSize={14}>
                    You are topping up your {item?.label} account in euro using
                    <Txt color={COLORS.darkBlueGrey}>
                      {' '}
                      Credit Card No. 
                      {item?.price}.
                    </Txt>
                  </Txt>
                  <Space space={20} />
                  <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
                    <PrimaryInput
                      name={amount}
                      Label={'Top up amount'}
                      placeholder="14.760"
                      style={styles.Input}
                      errors={errors.amount}
                      touched={touched.amount}
                      value={amount}
                      onBlur={handleBlur('amount')}
                      onChangeText={handleChange('amount')}
                      amount="euro"
                      keyboardType="numeric"
                    />
                    <Space space={20} />
                  </KeyboardAwareScrollView>
                </ViewT1>
              </View>

              <View style={styles.containerButton}>
                <PrimaryButtonLinear
                  width={'100%'}
                  onPress={() => {
                    handleSubmit();
                  }}
                  disabled={true}
                  // loading={isSubmitting}
                >
                  Next
                </PrimaryButtonLinear>
              </View>
            </>
          );
        }}
      </Formik>

      <Bottom4
        bottomSheetModalRef={bottomSheetModalRef}
        onSuccess={onSuccess}
        onError={onError}
        // DeleteSelectMethod={DeleteSelectMethod}
      />
    </>
    </ReturnHeader>

  );
};

export default AmountTopup;

const styles = StyleSheet.create({
    containerButton: {
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        padding: Platform.OS == 'ios'?20:  15,
        position:"absolute",
        bottom:0
      },
});

{
  /* <Formik
initialValues={state}
validationSchema={schema}
onSubmit={(values, formikAction) => {
  formikAction.setSubmitting(false);
  formikAction.resetForm();
  onSubmit(values);
  handlePresentModalPress();
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
  const {amount} = values;
  return (
    <>
  <Space space={30} />
  <View style={{padding: 20}}>
    <ViewT1>
      <Txt color={COLORS.slateGrey} fontSize={14}>
        You are topping up your {data?.label} account in euro using
        <Txt color={COLORS.darkBlueGrey}>
          {' '}
          Credit Card No. {SelectMethod?.price}.
        </Txt>
      </Txt>
      <Space space={20} />
      <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
        <PrimaryInput
          name={amount}
          Label={'Top up amount'}
          placeholder="14.760"
          style={styles.Input}
          errors={errors.amount}
          touched={touched.amount}
          value={amount}
          onBlur={handleBlur('amount')}
          onChangeText={handleChange('amount')}
          amount="euro"
          keyboardType="numeric"
        />
        <Space space={20} />
      </KeyboardAwareScrollView>
    </ViewT1>
  </View>

  <View style={styles.containerButton}>
    <PrimaryButtonLinear
      width={'100%'}
      onPress={() => {
        handleSubmit();
      }}
      // loading={isSubmitting}
    >
      Next
    </PrimaryButtonLinear>
    <Space space={25} />
    <Line color={COLORS.black} />
  </View>

</>

  */
}
