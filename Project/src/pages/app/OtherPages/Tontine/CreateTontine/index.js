import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Line from '../../../../../components/views/line';

import ImgBack from '../../../../../Assets/Img/HomeBack.png';

import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../components/Buttons';
import SecondaryHeader from '../../../../../components/Headers/root/SecondaryHeader';
import Space from '../../../../../components/Space';
import {Head, Txt} from '../../../../../components/utils';
import CreatedSuccess from '../../../../../components/views/Layouts/AuthLayout/Model';
import {COLORS, SIZES} from '../../../../../theme';
import Bottom4 from './BottomSheetPassword';

import ViewT1 from '../../../../../components/views/CardViewType1';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import {useAmount} from './Hooks';
import PrimaryInput from '../../../../../components/Input';
import Slider from '@react-native-community/slider';

// var Slider = require('react-native-slider');

// import Slider from 'react-native-slider';

import illusphone from '../../../../../Assets/Img/illusphone.png';
import imgInfo from '../../../../../Assets/Img/icon24Info2.png';
import DropDown from '../../../../../components/select/DropDown';
import SquareCheckBox from '../../../../../components/checkBox/useSquareCheck';
import HView from '../../../../../components/views/HView/HView';
import {useDispatch, useSelector} from 'react-redux';
import CustomDatePiker from '../../../../../components/DatePiker';
import {resetSelectTontine} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';

const CreateTontine = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {type, ind} = route.params;
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
  // const [IsTouched2, setIsTouched2] = useState(false);
  const [AdvancedSettingsState, setAdvancedSettings] = useState(false);

  const [checked, setChecked] = useState(false);
  const onCheck = () => {
    setChecked(!checked);
  };


  const {selectedTontine} = useSelector(state => ({
    ...state.tontines,
  }));


  // console.log('selectedTontine', selectedTontine)
  // console.log('checked', checked)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SecondaryHeader
        goBack={() => {
          navigation.navigate('Tontine');
          dispatch(resetSelectTontine());
        }}
        title={'Create A New Tontine'}
        Cancel="retrun"
      />

      <Formik
        enableReinitialize
        initialValues={state}
        validationSchema={schema}
        onSubmit={(values, formikAction) => {
          // formikAction.setValues("");
          // formikAction.setErrors(null)
          formikAction.resetForm()
          formikAction.setErrors('')
          navigation.navigate('PoliciesInstructions', {data: values});
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
          const {name, amount, startAt, retentionRate} = values;
            // console.log('values', values)
          return (
            <>
              <ScrollView
                contentContainerStyle={{width: SIZES.width}}
                showsVerticalScrollIndicator={false}>
                <View style={{padding: 20}}>
                  <Space space={20} />
                  <ViewT1>
                    <Space space={10} />
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

                      {/* {startAt && (
                        <CustomDatePiker
                          label={"End date"}
                          setFieldValue={setFieldValue}
                          name={"endAt"}
                          errors={errors.endAt}
                          touched={touched.endAt}
                          placeholder={"Select your end date"}
                          onBlur={handleBlur("endAt")}
                          value={selected}
                          onSelect={onSelect}
                          placeholderTextColor={COLORS.darkBlueGrey}
                          fontSize={20}
                          isInteger={true}
                          IsTouched={IsTouched2}
                          setIsTouched={setIsTouched2}
                        />
                      )} */}

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
                      <Space space={20} />

                  {/* {    selectedTontine == 'TONTINE_CUSTOM_TONTINE' &&selectedTontine ? <SquareCheckBox
                        title={'Include you as a payer'}
                        checked={checked}
                        onPress={() => {
                          onCheck();
                          setFieldValue('asAPayer', checked);
                        }}
                        disabled={selectedTontine == 'TONTINE_CUSTOM_TONTINE'  ? true :false }
                      /> : null } */}
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
                  </ViewT1>
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
                <Space space={25} />
                <Line color={COLORS.black} />
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
    </SafeAreaView>
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
            transaction histopy.
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
            transaction histopy.
          </Txt>
          .
        </Txt>

        <PaleGreyButton onPress={onDissmisError}>close</PaleGreyButton>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: 'center',
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    height: 110,
  },
  topinuptxt: {
    padding: 20,
  },
  containerButton: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 110,
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
    //fontFamily: 'Roboto-Bold',
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
  setFieldValue,
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


  // console.log('v', value);
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
          <Txt color={COLORS.orangeYellow} style={{textDecorationLine:'underline '}} fontSize={14}>
            Advanced Settings
          </Txt>
    
        </HView>
      </TouchableOpacity>

      {/* <CreatedSuccess Visible={visible} onDissmis={onDissmis} top={90}>
        {BodyModel ? <BodyModelInfo onDissmis={onDissmis} /> : null}
      </CreatedSuccess> */}
    </>
  );
};


