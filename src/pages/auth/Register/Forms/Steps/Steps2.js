import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import PrimaryInput from '../../../../../components/Input';
import DropDown from '../../../../../components/select/DropDown';
import {COLORS} from '../../../../../theme';
import {useState} from 'react';
import {useRegister} from '../../Hooks/useRegister';
import {PrimaryButtonLinear} from '../../../../../components/Buttons';
import {useSelector} from 'react-redux';
import ViewT1 from '../../../../../components/views/CardViewType1';
import {Formik} from 'formik';
import AcceptTerms from './AcceptTerms';
import Space from '../../../../../components/Space';
import InputPhone from '../../../../../components/Input/PhoneInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomPhoneInpute from '../../../../../components/Input/CustomPhoneInput';

 

const data2 = [
  {
    color: COLORS.grayIcon,
    label: 'French',
    value: 1,
    icon: 'city',
  },
  {
    color: COLORS.grayIcon,
    label: 'English',
    value: 2,
    icon: 'city',
  },
];

const Step2 = ({
  step,
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
  handleBlur,
  setValues,
  dirty,
  setIsTouchedLanguage
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 8,
        overflow: 'hidden',
        paddingVertical: 20,
      }}>
      <FormInputs
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        values={values}
        errors={errors}
        step={step}
        setValues={setValues}
        dirty={dirty}
        setIsTouchedLanguage={setIsTouchedLanguage}
      />
    </View>
  );
};

export default Step2;

const styles = StyleSheet.create({});

const FormInputs = ({
  values,
  setFieldValue,
  errors,
  handleChange,
  touched,
  handleBlur,
  step,
  setValues,
  dirty,
  setIsTouchedLanguage
}) => {
  const {mobileNumber, language} = values;

  // console.log('firvaluesst', values)

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [formattedValue, setFormattedValue] = useState('');

  const onSelectLanguage = item => {
    setSelectedLanguage(item);
    // setIsTouchedLanguage(true)
  };

  const [phoneValue, setphoneValue] = useState(null);
  const isReturns = useSelector(state => state.registerPerssisteSlice.isReturns)

  const phoneInputRef = useRef(null)
  // console.log('isReturns', isReturns)
  // console.log('step', step)

  // console.log('formattedValue', formattedValue)
  // console.log('mobileNumber', mobileNumber)
  const [Update, setUpdate] = useState(false);

  useEffect(() => {
    if (step == 2 && isReturns ==2) {
      AsyncStorage.getItem('step2FormData').then(data => {
        if (data) {
          // console.log('data',  JSON.parse(data));
          let obj = JSON.parse(data);
          setValues(JSON.parse(data));
          // console.log('obj', obj);
          setFieldValue('mobileNumber', obj.mobileNumber);
          setFormattedValue(obj.mobileNumber);
          setSelectedLanguage({label: obj.language});
        }else{
          setUpdate(false)
        }
      });
    }
  }, [step, dirty]);

  return (
    <>
      <InputPhone
        onChangeFormattedText={text => {
          setFormattedValue(text);
          setFieldValue('mobileNumber', text);
        }}
        name={'mobileNumber'}
        Label={'Phone number'}
        // placeholder="Your Phone number"
        style={styles.Input}
        errors={errors.mobileNumber}
        touched={touched.mobileNumber}
        onBlur={handleBlur('mobileNumber')}
        keyboardType="numeric"
        value={mobileNumber}
        setFormattedValue={setFormattedValue}
        setFieldValue={setFieldValue}
        placeholder="Your Phone number"
        phoneInputRef={phoneInputRef}
        formattedValue={formattedValue}
        Update={Update}
        setUpdate={setUpdate}
      />
      <Space space={20} />

      {/* <CustomPhoneInpute
        onChangeFormattedText={text => {
          setFormattedValue(text);
          setFieldValue('mobileNumber', text);
        }}
        name={'mobileNumber'}
        Label={'Phone number exsiste'}
        // placeholder="Your Phone number"
        style={styles.Input}
        errors={errors.mobileNumber}
        touched={touched.mobileNumber}
        onBlur={handleBlur('mobileNumber')}
        keyboardType="numeric"
        value={mobileNumber}
        setFormattedValue={setFormattedValue}
        setFieldValue={setFieldValue}
        placeholder="Your Phone number"
  
      />
      <Space space={20} /> */}

      {/* <DropDown
        label={'Language'}
        data={data2}
        setFieldValue={setFieldValue}
        name={'language'}
        errors={errors.language}
        touched={touched}
        placeholder={'Select language'}
        onBlur={handleBlur('language')}
        value={selectedLanguage}
        onSelect={onSelectLanguage}
      />
      <Space space={20} /> */}
    </>
  );
};
