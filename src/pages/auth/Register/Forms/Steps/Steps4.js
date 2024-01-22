import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import PrimaryInput from '../../../../../components/Input';
import CustomDatePiker from '../../../../../components/DatePiker';
import {COLORS} from '../../../../../theme';
import {useState} from 'react';
import {useRegister} from '../../Hooks/useRegister';
import Space from '../../../../../components/Space';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const Step4 = ({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
  handleBlur,
  IsTouched,
  setIsTouched,
  setValues,
  dirty,
  step,
}) => {
  const {hidePass, HandlehidePass,hidePass2,HandlehidePass2, ToRegister} = useRegister();
  return (
    <View style={{flex: 1, backgroundColor: '#FFF', borderRadius: 8}}>
      <FormInputs
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        values={values}
        errors={errors}
        hidePass={hidePass}
        hidePass2={hidePass2}
        HandlehidePass={HandlehidePass}
        HandlehidePass2={HandlehidePass2}
        IsTouched={IsTouched}
        setIsTouched={setIsTouched}
        step={step}
        setValues={setValues}
        dirty={dirty}
      />
    </View>
  );
};

export default Step4;

const styles = StyleSheet.create({
  error: {
    color: COLORS.coral,
    fontSize: 13,
    marginVertical: 5,
  },
});

const FormInputs = ({
  values,
  setFieldValue,
  errors,
  handleChange,
  touched,
  handleBlur,
  hidePass,
  HandlehidePass,
  hidePass2,
  HandlehidePass2,
  setValues,
  dirty,
  step,
}) => {
  const {
    startAt, //
    profIdentity, // BOOLEAN
    profAdress, // BOOLEAN
    profIdentityData, // Data
    profAdressData, // Data
    password,
    confirmPassword,
  } = values;
  // validation date piker
  const [selected, setSelected] = useState(null);
  const [typeIdentity, setTypeIdentity] = useState(null);
  const [typeAdress, setTypeAdress] = useState(null);

  const onSelect = item => {
    setSelected(item);
  };

  // console.log('step', step)

  const isReturns = useSelector(
    state => state.registerPerssisteSlice.isReturns,
  );
  // console.log('step4isReturns', isReturns)
  //   useEffect(() => {
  //     if (step == 4 &&isReturns==4&&dirty) {
  //       AsyncStorage.setItem(
  //         'step4FormData',
  //         JSON.stringify(values),
  //       );
  //       console.log('set4',values)
  //     }

  //   }, [step, isReturns,dirty]);


  
  useEffect(() => {
    if (step == 4 && isReturns == 4) {
      AsyncStorage.getItem('step4FormData').then(data => {
        if (data) {
          // console.log('data', JSON.parse(data));
          let obj = JSON.parse(data);
          setValues(JSON.parse(data));
          //  console.log('obj', obj);
        }
      });
    }
  }, [step, isReturns]);

  return (
    <>
      {/* <Space space={30} /> */}
      {/* proof ID */}
      {/* <Proof
        title={"Proof of identity to be provide by the client*"}
        radioT1={"Passport"}
        radioT2={"Identity card"}
        errors={errors.profIdentity}
        setTypeIdentity={setTypeIdentity}
        typeIdentity={typeIdentity}
        setFieldValue={setFieldValue}
        name="profIdentity"
        IsTouched={IsTouched}
      /> */}
      {/* <UploadProof
        title="Passport/ID Upload"
        sousTitre="Please upload related documents"
        disable={!typeIdentity ? true : false}
        errors={errors.profIdentityData}
        typeIdentity={typeIdentity}
        setFieldValue={setFieldValue}
        name="profIdentityData"
      /> */}
      {/* 
      <Proof
        title={"Proof of address to be provide by the applicant"}
        radioT1={"Passport"}
        radioT2={"Id"}
        errors={errors.profAdress}
        setTypeIdentity={setTypeAdress}
        typeIdentity={typeAdress}
        setFieldValue={setFieldValue}
        name="profAdress"
        IsTouched={IsTouched}
      /> */}

      {/* <Space space={20} /> */}
      <PrimaryInput
        placeholder="Your password"
        // style={styles.Input}
        name={password}
        id={password}
        value={password}
        onBlur={handleBlur('password')}
        onChangeText={handleChange('password')}
        Label="Password"
        secureTextEntry={hidePass ? true : false}
        isPassword={'pass'}
        hidePass={hidePass}
        HandlehidePass={HandlehidePass}
        errors={errors.password}
        touched={touched.password}
        placeholderTextColor={COLORS.silver}
        style={{
          fontWeight: password?.length !== 0 ? '700' : '400',
          fontSize: password?.length == 0 ? 16 : 20,
        }}
      />
      <Space space={30} />
      
      <PrimaryInput
        placeholder="Confirm password"        
        name={confirmPassword}
        id={confirmPassword}
        value={confirmPassword}
        onBlur={handleBlur('confirmPassword')}
        onChangeText={handleChange('confirmPassword')}
        Label="Confirm password"
        secureTextEntry={hidePass2 ? true : false}
        isPassword={'pass'}
        hidePass={hidePass2}
        HandlehidePass={HandlehidePass2}
        errors={errors.confirmPassword}
        touched={touched.confirmPassword}
        placeholderTextColor={COLORS.silver}
        style={{
          fontWeight: confirmPassword?.length !== 0 ? '700' : '400',
          fontSize: confirmPassword?.length == 0 ? 16 : 20,
        }}
      />
    </>
  );
};
