import {Keyboard, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useCashout} from './Hooks';
import ReturnHeader from '../../../../components/Headers/root/ReturnHeader';
import {Formik} from 'formik';
import {PrimaryButtonLinear} from '../../../../components/Buttons';
import Form0 from './Components/Forms/Form0';
import {COLORS, SIZES} from '../../../../theme';
import Space from '../../../../components/Space';
import Note from '../../../../components/views/Note';
import CreatedSuccess from '../../../../components/views/Layouts/AuthLayout/Model';
import {BodyModel, BodyModelErr} from '../../../../components/Models/payements';

const CashOut = ({navigation, navigation: {goBack}, route}) => {
  const {validationSchema, State0, cashout} = useCashout();

  const {data} = route.params;
  // console.log('data--', data)
  const [checked, setchecked] = useState(null);
  const [NavigationCashOut, setNavigationCashOut] = useState(null);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ReturnHeader
      title={'Cash Out'}
      goBack={() => {
        goBack();
      }}>
      <View style={{width: '100%', flex: 1}}>
        <Formik
          initialValues={State0}
          validationSchema={validationSchema}
          onSubmit={values => {
            let obj = {
              values,
              data: NavigationCashOut,
              accountId: data.accountId,
              originatorId: data.userId,
            };
            cashout(obj);
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
            isValid,
          }) => {
            return (
              <View
                style={{
                  backgroundColor: COLORS.finished,
                  padding: 20,
                  flex: 1,
                  justifyContent: 'space-between',
                  marginTop: 30,
                }}>
                <Pressable
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: 8,
                    flex: 1,
                    justifyContent: 'space-between',

                  }}
                  onPress={dismissKeyboard}
                  
                  >
                  <Form0
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    navigation={navigation}
                    setchecked={setchecked}
                    checked={checked}
                    setNavigationCashOut={setNavigationCashOut}
                  onPress={dismissKeyboard}

                  />

                  <Note />
                </Pressable>
                <Space space={20} />

                <View>
                  <PrimaryButtonLinear
                    disabled={NavigationCashOut}
                    onPress={() => {
                      handleSubmit();
                    }}>
                    VALIDATE
                  </PrimaryButtonLinear>
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </ReturnHeader>
  );
};

export default CashOut;

const styles = StyleSheet.create({
  buttonsConatiner: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: 15,
  },
});
