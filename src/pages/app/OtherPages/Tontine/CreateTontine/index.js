import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../components/Buttons';
import Space from '../../../../../components/Space';
import {Head, Txt} from '../../../../../components/utils';
import CreatedSuccess from '../../../../../components/views/Layouts/AuthLayout/Model';
import {COLORS, SIZES} from '../../../../../theme';
import Bottom4 from './BottomSheetPassword';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import {useAmount} from './Hooks';
import PrimaryInput from '../../../../../components/Input';
import illusphone from '../../../../../Assets/Img/illusphone.png';
import imgInfo from '../../../../../Assets/Img/icon24Info2.png';
import DropDown from '../../../../../components/select/DropDown';
import HView from '../../../../../components/views/HView/HView';
import {useDispatch, useSelector} from 'react-redux';
import CustomDatePiker from '../../../../../components/DatePiker';
import {resetSelectTontine} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import ReturnHeader from '../../../../../components/Headers/root/ReturnHeader';

const CreateTontine = ({navigation}) => {
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef(null);
  const {isLoading} = useSelector(state => ({
    ...state.tontines,
  }));

  const [success, setsuccess] = useState(false);
  const [error, setError] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const onDissmisError = useCallback(() => {
    setError(false);
  }, []);

  const [SelectMethod, setSelectMethod] = useState(null);

  const {state, schema} = useAmount();

  const onSelect = item => {
    setSelectMethod(item);
  };

  const DeleteSelectMethod = () => {
    setSelectMethod(null);
  };

  const data = [
    {
      color: '#44C5E4',
      label: 'Weekly',
      value: 1,
    },
    {
      color: '#44C5E4',
      label: 'Monthly',
      value: 2,
    },
    {
      color: '#44C5E4',
      label: 'Yearly',
      value: 2,
    },
  ];

  const [selected, setSelected] = useState(null);

  const onSelects = item => {
    setSelected(item);
  };
  // validation date piker
  const [IsTouched, setIsTouched] = useState(false);
  const [AdvancedSettingsState, setAdvancedSettings] = useState(false);

  const {tontines} = useSelector(state => ({
    ...state.tontines,
  }));
  return (
    <ReturnHeader
      title={'Create A New Tontine'}
      goBack={() => {
        navigation.navigate('Tontine');
        dispatch(resetSelectTontine());
      }}>
      <Formik
        enableReinitialize
        initialValues={state}
        validationSchema={schema}
        onSubmit={(values, formikAction) => {
          formikAction.resetForm();
          formikAction.setErrors('');
          navigation.navigate('PoliciesInstructions', {data: values});
        }}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
          setFieldValue,
        }) => {
          const {name, amount, retentionRate} = values;

          return (
            <>
              <ScrollView
                contentContainerStyle={{width: SIZES.width}}
                showsVerticalScrollIndicator={false}>
                <View style={{paddingHorizontal: 20}}>
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      paddingVertical: 20,
                      paddingHorizontal: 15,
                      borderRadius: 8,
                      elevation: 2,
                      shadowColor: '#171717',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.2,
                      shadowRadius: 2,
                      elevation: 2,
                    }}>
                    <Txt color={COLORS.slateGrey} fontSize={14}>
                      You are creating a new tontine:
                    </Txt>
                    <Space space={20} />

                    <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
                      <PrimaryInput
                        name={name}
                        Label={'Name of tontine'}
                        placeholder="Tontine name here"
                        style={styles.Input}
                        errors={errors.name}
                        touched={touched.name}
                        value={name}
                        onBlur={handleBlur('name')}
                        onChangeText={handleChange('name')}
                        placeholderTextColor={COLORS.darkBlueGrey}
                      />
                      <Space space={20} />

                      <PrimaryInput
                        name={amount}
                        Label={'Amount per person'}
                        placeholder="12.00"
                        style={styles.Input}
                        errors={errors.amount}
                        touched={touched.amount}
                        value={amount}
                        onBlur={handleBlur('amount')}
                        onChangeText={handleChange('amount')}
                        amount="euro"
                        placeholderTextColor={COLORS.darkBlueGrey}
                        keyboardType="numeric"
                      />
                      <Space space={20} />
                      <DropDown
                        data={data}
                        label={'Frequency of payment'}
                        setFieldValue={setFieldValue}
                        name={'frequencyOfPayment'}
                        errors={errors.frequencyOfPayment}
                        touched={touched.frequencyOfPayment}
                        placeholder={'Select your Frequency of payment'}
                        onBlur={handleBlur('frequencyOfPayment')}
                        value={selected}
                        onSelect={onSelects}
                        placeholderTextColor={COLORS.darkBlueGrey}
                        fontSize={20}
                      />
                      <Space space={20} />

                      <CustomDatePiker
                        label={'Start date'}
                        setFieldValue={setFieldValue}
                        name={'startAt'}
                        errors={errors.startAt}
                        touched={touched.startAt}
                        placeholder={'Select your Start date'}
                        onBlur={handleBlur('startAt')}
                        value={selected}
                        onSelect={onSelect}
                        placeholderTextColor={COLORS.darkBlueGrey}
                        fontSize={20}
                        isInteger={true}
                        IsTouched={IsTouched}
                        setIsTouched={setIsTouched}
                      />
                      <Space space={20} />

                      <AdvancedSettings
                        retentionRate={retentionRate}
                        errors={errors}
                        touched={touched}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        AdvancedSettings={AdvancedSettingsState}
                        setAdvancedSettings={setAdvancedSettings}
                      />
                      <Space space={40} />
                      <HView style={styles.BoxInfoTextYellow}>
                        <Image source={imgInfo} />
                        <Txt
                          color={COLORS.orangeYellow}
                          style={styles.textInfo}
                          fontSize={14}>
                          Policies and instructions
                        </Txt>
                      </HView>
                      <Space space={20} />
                    </KeyboardAwareScrollView>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.containerButton}>
                <PrimaryButtonLinear
                  width={'100%'}
                  onPress={() => {
                   
                      handleSubmit();
                      setIsTouched(true);
                      setAdvancedSettings(false);
                    
                 
                  }}
                  disabled={true}
                  loading={isLoading}>
                  next
                </PrimaryButtonLinear>
              </View>
            </>
          );
        }}
      </Formik>

      <Bottom4
        bottomSheetModalRef={bottomSheetModalRef}
        onSuccess={onSuccess}
        DeleteSelectMethod={DeleteSelectMethod}
      />

      <CreatedSuccess Visible={success} onDissmis={onDissmis} top={90}>
        {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
      </CreatedSuccess>

      <CreatedSuccess Visible={error} onDissmis={onDissmisError} top={90}>
        {BodyModel ? <BodyModelErr onDissmis={onDissmisError} /> : null}
      </CreatedSuccess>
    </ReturnHeader>
  );
};
export default CreateTontine;

const BodyModel = ({onDissmis}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusphone} style={{width: '100%'}} />

        <Head
          //fontFamily={'Poppins-Bold'}
          style={{padding: 20, textAlign: 'center'}}>
          Transfered successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            // //fontFamily: 'Poppins-SemiBold',
          }}>
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            12,000 euro
          </Txt>{' '}
          has been transfered successfully to
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            {' '}
            Faith Felicity (+44 7538 110953).
          </Txt>
          You can check in your account
          <Txt Bold={'400'} color={COLORS.orangeYellow} fontSize={17}>
            {' '}
            transaction history.
          </Txt>
          .
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
        <Image source={illusphone} style={{width: '100%'}} />

        <Head
          fontFamily={'Poppins-Bold'}
          style={{padding: 20, textAlign: 'center'}}>
          Transfered successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            //fontFamily: 'Poppins-SemiBold',
          }}>
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            12,000 euro
          </Txt>{' '}
          has been transfered successfully to
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            {' '}
            Faith Felicity (+44 7538 110953).
          </Txt>
          You can check in your account
          <Txt Bold={'400'} color={COLORS.orangeYellow} fontSize={17}>
            {' '}
            transaction history.
          </Txt>
          .
        </Txt>

        <PaleGreyButton onPress={onDissmisError}>close</PaleGreyButton>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  containerButton: {
    width: '100%',
    backgroundColor: COLORS.finished,
    position: 'absolute',
    bottom: 0,
    paddingBottom: Platform.OS == 'ios' ? 30 : 20,
    paddingHorizontal: Platform.OS == 'ios' ? 30 : 20,
    paddingTop: 15,
  },
  BoxInfoTextYellow: {
    justifyContent: 'center',
  },
  textInfo: {
    marginLeft: 8,
  },
  Input: {
    color: COLORS.darkBlueGrey,
    fontSize: 20,
    flex: 1,
    paddingLeft: 2,
  },
});

const AdvancedSettings = ({
  retentionRate,
  errors,
  touched,
  handleBlur,
  handleChange,
  AdvancedSettings,
  setAdvancedSettings,
}) => {
  const [value, setValue] = useState(0);

  const [visible, setVisible] = useState(false);

  const onDissmis = useCallback(() => {
    setVisible(false);
  }, []);
  const onSuccess = useCallback(() => {
    setVisible(true);
  }, []);

  return AdvancedSettings ? (
    <>
      <Space space={1} />

      <PrimaryInput
        name={retentionRate}
        Label={'Retention rate'}
        placeholder="Your retention rate"
        style={styles.Input}
        errors={errors.retentionRate}
        touched={touched.retentionRate}
        value={retentionRate}
        onBlur={handleBlur('retentionRate')}
        onChangeText={handleChange('retentionRate')}
        amount="%"
        placeholderTextColor={COLORS.darkBlueGrey}
        keyboardType="numeric"
        isAdvanced={true}
        onDissmis={onDissmis}
        visible={visible}
        onSuccess={onSuccess}
        advancedSettings={AdvancedSettings}
      />
    </>
  ) : (
    <>
      <TouchableOpacity
        onPress={() => {
          setAdvancedSettings(true);
        }}>
        <Space space={10} />

        <HView>
          <Txt
            color={COLORS.orangeYellow}
            style={{textDecorationLine: 'underline'}}
            fontSize={14}>
            Advanced Settings
          </Txt>
        </HView>
      </TouchableOpacity>
    </>
  );
};
