import {Platform, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Formik} from 'formik';
import {useAmoutTopup} from './Hooks/useAmountTopup';
import Space from '../../../../../../../components/Space';
import ViewT1 from '../../../../../../../components/views/CardViewType1';
import {Head, Txt} from '../../../../../../../components/utils';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../../../components/Buttons';
import {COLORS} from '../../../../../../../theme';
import PrimaryInput from '../../../../../../../components/Input';
import ReturnHeader from '../../../../../../../components/Headers/root/ReturnHeader';
import CreatedSuccess from '../../../../../../../components/views/Layouts/AuthLayout/Model';

import illusphone from '../../../../../../../Assets/Img/illusphone.png';
import illusErr from '../../../../../../../Assets/Img/illusErr.png';
import {Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {handlAmount} from '../../../../../../../redux/Features/Payements/MTN/slice';

const AmountTopup = ({navigation, route}) => {
  const {onSubmit, state, schema} = useAmoutTopup();
  const {data, item} = route.params;

  const {isLoading} = useSelector(state => state.transaction);
  const {isCreditCardLoading} = useSelector(state => state.creditCard);
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

  const onSuccessAction = useCallback(value => {
    setsuccess(true);
    dispatch(handlAmount(value));
  }, []);

  const onErrorAction = useCallback(() => {
    setError(true);
  }, []);

  return (
    <ReturnHeader
      title={'Top up method'}
      goBack={() => {
        navigation.navigate('TopUp', {data});
      }}
      Loading={isLoading || isCreditCardLoading}>
      <>
        <Formik
          initialValues={state}
          validationSchema={schema}
          onSubmit={(values, formikAction) => {
            formikAction.setSubmitting(false);
            formikAction.resetForm();

            let obj = {
              amount: values.amount,
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
              amount: values.amount,
            };
            let object = {
              info,
              onErrorAction,
              onSuccessAction,
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
              <>
                <Space space={30} />
                <View style={{padding: 20}}>
                  <ViewT1>
                    <Txt color={COLORS.slateGrey} fontSize={14}>
                      You are topping up your {item?.label} account in euro
                      using
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
                    loading={isLoading}>
                    Next
                  </PrimaryButtonLinear>
                </View>
              </>
            );
          }}
        </Formik>
      </>
      <CreatedSuccess Visible={success} onDissmis={onDissmis} top={90}>
        {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
      </CreatedSuccess>

      <CreatedSuccess Visible={error} onDissmis={onDissmisError} top={90}>
        {BodyModel ? <BodyModelErr onDissmis={onDissmisError} /> : null}
      </CreatedSuccess>
    </ReturnHeader>
  );
};

export default AmountTopup;

const BodyModel = ({onDissmis}) => {
  const {amount} = useSelector(state => state.transaction);
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusphone} style={{width: '100%'}} />

        <Head
          //  fontFamily={"Poppins-Bold"}
          style={{padding: 20, textAlign: 'center'}}>
          Transfered successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            //fontFamily: "Poppins-SemiBold",
          }}>
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            {amount} euro
          </Txt>{' '}
          has been transfered successfully
          {/* to
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            {' '}
            Faith Felicity (+44 7538 110953).
          </Txt>
          You can check in your account
          <Txt Bold={'400'} color={COLORS.orangeYellow} fontSize={17}>
            {' '}
            transaction history.
          </Txt>
          . */}
        </Txt>

        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
      </View>
    </>
  );
};
const BodyModelErr = ({onDissmis}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusErr} style={{width: '100%'}} />

        <Head
          //  fontFamily={"Poppins-Bold"}
          style={{padding: 20, textAlign: 'center'}}
          color={COLORS.coral}>
          Topped up unsuccessfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            //fontFamily: "Poppins-SemiBold",
          }}>
          Sorry, something went wrong. Please try agian.
        </Txt>

        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  containerButton: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    padding: Platform.OS == 'ios' ? 20 : 15,
    position: 'absolute',
    bottom: 0,
  },
});
