import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';

import Step1 from './Steps1';
import Step4 from './Steps4';
import Step2 from './Steps2';
import Step3 from './Steps3';
import AcceptTerms from './AcceptTerms';

import {useRegister} from '../../Hooks/useRegister';
import {PrimaryButtonLinear} from '../../../../../components/Buttons';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  activateReturn,
  get_step_A,
  get_step_B,
  get_step_C,
} from '../../../../../redux/Features/authentification/Register/perssistingRegisterInputs';
import {register} from '../../../../../redux/Features/authentification/Register/Slice';

const renderStep = (
  step,
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
  handleBlur,
  IsTouched,
  setIsTouched,
  IsBirthDay,
  setIsBirthDay,
  setValues,
  dirty,
  IsTouchedLanguage,
  setIsTouchedLanguage,
  IsTouchedNationality,
  setIsTouchedNationality,
) => {
  switch (step) {
    case 1:
      return (
        <Step1
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          values={values}
          step={step}
          handleChange={handleChange}
          handleBlur={handleBlur}
          IsTouched={IsTouchedNationality}
          setIsTouched={setIsTouchedNationality}
          IsBirthDay={IsBirthDay}
          setIsBirthDay={setIsBirthDay}
          setValues={setValues}
          dirty={dirty}
        />
      );
    case 2:
      return (
        <Step2
          errors={errors}
          touched={IsTouchedLanguage}
          setFieldValue={setFieldValue}
          values={values}
          step={step}
          handleChange={handleChange}
          handleBlur={handleBlur}
          dirty={dirty}
          setValues={setValues}
          setIsTouchedLanguage={setIsTouchedLanguage}
        />
      );
    case 3:
      return (
        <Step3
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          values={values}
          step={step}
          handleChange={handleChange}
          handleBlur={handleBlur}
          dirty={dirty}
          setValues={setValues}
        />
      );
    case 4:
      return (
        <Step4
          errors={errors}
          touched={touched}
          setFieldValue={setFieldValue}
          values={values}
          step={step}
          handleChange={handleChange}
          handleBlur={handleBlur}
          IsTouched={IsTouched}
          setIsTouched={setIsTouched}
          dirty={dirty}
          setValues={setValues}
        />
      );
    default:
      return null;
  }
};

export const MultiStep = ({
  setStep,
  step,
  IsTouched,
  setIsTouched,
  navigation,
  IsTouchedNationality,
  setIsTouchedNationality,
  onSuccess,
  onErrorAction
}) => {
  const {isLoading} = useSelector(state => state.register);
  const {
    IdentityState,
    validationSchemaIdentity,
    InformationState,
    validationSchemaInformation,
    AdressState,
    validationSchemaAdressState,
    ProofState,
    validationSchemaProofState,
    hidePass,
    HandlehidePass,
    ToRegister,
  } = useRegister();

  const [ObjectRegister, setObjectRegister] = useState([]);

  const handleSubmits = values => {
    // setObjectRegister([...ObjectRegister, values]);
    setStep(step => step + 1);
  };

  const registerPerssisteSlice = useSelector(
    state => state.registerPerssisteSlice,
  );

  const isReturns = useSelector(
    state => state.registerPerssisteSlice.isReturns,
  );

  let tab1 = registerPerssisteSlice?.step_A;
  let tab2 = registerPerssisteSlice?.step_B;
  let tab3 = registerPerssisteSlice?.step_C;

  //  console.log('tab1', tab1);
  //  console.log('tab2', tab2);
  //  console.log('tab3', tab3);

  let formData =
    step === 1
      ? IdentityState
      : step === 2
      ? InformationState
      : step === 3
      ? AdressState
      : step === 4
      ? ProofState
      : '';
  let validationSchema =
    step === 1
      ? validationSchemaIdentity
      : step === 2
      ? validationSchemaInformation
      : step === 3
      ? validationSchemaAdressState
      : step === 4
      ? validationSchemaProofState
      : '';

  const dispatch = useDispatch();

  let {email, birthDay, deviceToken, firstName, lastName, nationality} = tab1
    ? tab1
    : [
        {
          birthDay: '',
          deviceToken: '',
          firstName: '',
          lastName: '',
          nationality: '',
          email: '',
          nationalityFlagName: '',
        },
      ];
  let {language, mobileNumber} = tab2
    ? tab2
    : [
        {
          language: '',
          mobileNumber: '',
        },
      ];
  let {
    addressComplement,
    city,
    postCode,
    region,
    state,
    streetName,
    streetNumber,
  } = tab3
    ? tab3
    : [
        {
          addressComplement: '',
          city: '',
          country: '',
          postCode: '',
          region: '',
          state: '',
          streetName: '',
          streetNumber: '',
        },
      ];

  // console.log('ObjectRegister', obj)

  // useEffect(() => {
  //   if (ObjectRegister[3]?.password && ObjectRegister[3]?.startAt) {
  //     dispatch(register(obj, navigation));
  //   }
  // }, [step, ObjectRegister]);

  // useEffect(() => {
  // if (registerPerssisteSlice) {
  // console.log('registerPerssisteSlice', registerPerssisteSlice);
  // }
  // }, [registerPerssisteSlice,dispatch]);

  // console.log('registerPerssisteSlice', registerPerssisteSlice?.step_A);

  const [IsBirthDay, setIsBirthDay] = useState(false);

  // set Language isTouched !
  const [IsTouchedLanguage, setIsTouchedLanguage] = useState(false);
  // console.log('step', step)
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{...formData}}
        validationSchema={validationSchema}
        onSubmit={(values, formikAction) => {
          handleSubmits(values);
        }}>
        {({
          values,
          errors,
          setFieldValue,
          touched,
          isSubmitting,
          handleSubmit,
          handleChange,
          handleBlur,
          isValid,
          setValues,
          dirty,
        }) => {
          // if(step==4){
          //   AsyncStorage.setItem(
          //     'step4FormData',
          //     JSON.stringify(values),
          //   );
          //   console.log('values', values)
          // }
          return (
            <>
              <View style={styles.Form}>
                {renderStep(
                  step,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  handleChange,
                  handleBlur,
                  IsTouched,
                  setIsTouched,
                  IsBirthDay,
                  setIsBirthDay,
                  setValues,
                  dirty,
                  IsTouchedLanguage,
                  setIsTouchedLanguage,
                  IsTouchedNationality,
                  setIsTouchedNationality,
                )}
                <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                  {step !== 5 && <AcceptTerms />}

                  {step !== 4 && (
                    <PrimaryButtonLinear
                      step={step}
                      width={'100%'}
                      onPress={() => {
                        handleSubmit();
                        setIsBirthDay(true);
                        // setIsTouchedNationality(true);
                        if (step == 1) {
                          AsyncStorage.setItem(
                            'step1FormData',
                            JSON.stringify(values),
                          );
                          setIsTouched(true);

                          dispatch(get_step_A(values));
                          dispatch(activateReturn(isReturns == 1 ? 2 : 1));
                        } else if (step == 2) {
                          AsyncStorage.setItem(
                            'step2FormData',
                            JSON.stringify(values),
                          );
                          dispatch(get_step_B(values));
                          dispatch(activateReturn(isReturns == 2 ? 3 : 2));
                          setIsTouchedLanguage(true);
                        } else if (step == 3) {
                          AsyncStorage.setItem(
                            'step3FormData',
                            JSON.stringify(values),
                          );
                          dispatch(get_step_C(values));
                          dispatch(activateReturn(isReturns == 3 ? 4 : 3));
                        } else if (step == 4) {
                          // dispatch(get_step_D(values));
                          return;
                        }
                      }}
                      // loading={isSubmitting}
                      disabled={
                        (isValid || isSubmitting) &&
                        ((dirty && values.firstName && values.email) ||
                          (dirty && values.mobileNumber && values.language) ||
                          (dirty &&
                            values.streetName &&
                            values.postCode))
                      }>
                      {'Next'}
                    </PrimaryButtonLinear>
                  )}

                  {step == 4 && (
                    <PrimaryButtonLinear
                      step={step}
                      width={'100%'}
                      onPress={() => {
                        // setObjectRegister([...ObjectRegister, values]);
                        setIsTouched(true);
                        AsyncStorage.setItem(
                          'step4FormData',
                          JSON.stringify(values),
                        );
                      
                        let {
                          group,
                          password,
                          confirmPassword,
                          profAdress,
                          profAdressData,
                          profIdentity,
                          profIdentityData,
                          startAt,
                        } = values
                          ? values
                          : [
                              {
                                group: '',
                                password: '',
                                profAdress: '',
                                profAdressData: '',
                                profIdentity: '',
                                profIdentityData: '',
                                startAt: '',
                                countryFlagName: '',
                              },
                            ];

                        let obj = {
                          firstName,
                          lastName,
                          email,
                          password,
                          mobileNumber,
                          language,
                          birthDay,
                          deviceToken,
                          nationality,
                          address: {
                            streetName,
                            postCode,         
                          },
                          group: 'USER',
                        };

                        let object = {
                          obj,
                          onSuccess,
                          onErrorAction
                        }
                        // console.log('obj', obj);
                        dispatch(register(object, navigation));
                      }}
                      loading={isLoading}
                      disabled={
                        (!errors.password &&  !errors.confirmPassword &&
                          values.password
                          ) ||
                        isSubmitting
                      }>
                      {'Register'}
                    </PrimaryButtonLinear>
                  )}
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  Form: {
    flex: 1,
  },
});
