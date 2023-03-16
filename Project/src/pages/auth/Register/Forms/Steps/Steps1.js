import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import PrimaryInput from '../../../../../components/Input';
import CustomDatePiker from '../../../../../components/DatePiker';
import SelectCountry from '../../../../../components/select/SelectCountry';
import {COLORS} from '../../../../../theme';
import {useState} from 'react';
import Space from '../../../../../components/Space';
import * as ImagePicker from 'react-native-image-picker';
import avatar from '../../../../../Assets/Img/avatar.png';
import icon16CameraPlus from '../../../../../Assets/Img/icon16CameraPlus.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkEmailExists,
  selectEmailExistsStatus,
} from '../../../../../redux/Features/authentification/Register/emailExistsSlice';

const Step1 = ({
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
}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFF', borderRadius: 8}}>
      <FormInputs
        setFieldValue={setFieldValue}
        handleChange={handleChange}
        handleBlur={handleBlur}
        touched={touched}
        values={values}
        errors={errors}
        IsTouched={IsTouched}
        setIsTouched={setIsTouched}
        IsBirthDay={IsBirthDay}
        setIsBirthDay={setIsBirthDay}
        step={step}
        setValues={setValues}
        dirty={dirty}
      />
    </View>
  );
};

const FormInputs = ({
  values,
  setFieldValue,
  errors,
  handleChange,
  touched,
  handleBlur,
  setIsTouched,
  IsTouched,
  setIsBirthDay,
  IsBirthDay,
  step,
  setValues,
  dirty,
}) => {
  const {
    firstName,
    lastName,
    email,
    birthDay, //
    nationality, //
  } = values;

  const [fileUri, setFileUri] = useState('');

  const launchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: 'photo',
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.didCancel) {
      setFileUri(result.assets[0].uri);
    }
  };

  const [selected, setSelected] = useState(null);
  const [selectedNationality, setSelectedNationaity] = useState(null);
  const [selectedNationalityFlag, setSelectedNationaityFlag] = useState(null);

  const isReturns = useSelector(
    state => state.registerPerssisteSlice.isReturns,
  );

  useEffect(() => {
    if (step == 1 && isReturns === 1) {
      AsyncStorage.getItem('step1FormData').then(data => {
        if (data) {
          // console.log('data', typeof JSON.parse(data));
          let obj = JSON.parse(data);
          setValues(JSON.parse(data));
          //  console.log('obj', obj.birthDay);
          setFieldValue('birthDay', obj.birthDay);
          setSelected(obj.birthDay);
          setFieldValue('nationality', obj.nationality);
          setSelectedNationaity(obj.nationality);
          setSelectedNationaityFlag(obj.nationalityFlagName);
        }
      });
    }
  }, [step, dirty]);

  const minimumDate = new Date();
  minimumDate.setFullYear(minimumDate.getFullYear() - 90);
  const maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear() - 18);

  return (
    <>
      <View style={{flex: 1}}>
        <Space space={20} />
        <View style={styles.Avatar}>
          <Image
            source={fileUri ? {uri: fileUri} : avatar}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          />

          <TouchableOpacity
            style={styles.icon16CameraPlus}
            onPress={launchImageLibrary}>
            <Image source={icon16CameraPlus} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <PrimaryInput
            name={firstName}
            Label={'First name'}
            placeholder="Your first name"
            style={{
              fontWeight: firstName?.length !== 0 ? '700' : '400',
              fontSize: firstName?.length == 0 ? 16 : 20,
            }}
            errors={errors.firstName}
            touched={touched.firstName}
            value={firstName}
            onBlur={handleBlur('firstName')}
            onChangeText={handleChange('firstName')}
            width="48%"
            placeholderTextColor={COLORS.silver}
          />

          <PrimaryInput
            name={lastName}
            Label={'Last name'}
            placeholder="Your last name"
            style={{
              fontWeight: lastName?.length !== 0 ? '700' : '400',
              fontSize: lastName?.length == 0 ? 16 : 20,
            }}
            errors={errors.lastName}
            touched={touched.lastName}
            value={lastName}
            onBlur={handleBlur('lastName')}
            onChangeText={handleChange('lastName')}
            width="48%"
            placeholderTextColor={COLORS.silver}
          />
        </View>

        <Space space={20} />

        <CustomDatePiker
          label={'Date of birth'}
          setFieldValue={setFieldValue}
          name={'birthDay'}
          errors={errors.birthDay}
          touched={touched.birthDay}
          placeholder={'Select your date of birth'}
          onBlur={handleBlur('birthDay')}
          selectedValue={selected}
          placeholderTextColor={COLORS.darkBlueGrey}
          fontSize={18}
          IsTouched={IsBirthDay}
          setIsTouched={setIsBirthDay}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />

        <Space space={20} />

        <SelectCountry
          label={'Nationality'}
          placeholder={'Your nationality'}
          name={'nationality'}
          onBlur={handleBlur('country')}
          setFieldValue={setFieldValue}
          errors={errors.nationality}
          onChangeFormattedText={(text, flag) => {
            setFieldValue('nationality', text);
            setFieldValue('nationalityFlagName', flag);
          }}
          touched={IsTouched}
          setIsTouched={setIsTouched}
          selectedNationality={selectedNationality}
          selectedNationalityFlag={selectedNationalityFlag}
        />
        <Space space={20} />

        <PrimaryInput
          name={email}
          Label={'Email'}
          placeholder="Your email"
          style={{
            fontWeight: email?.length !== 0 ? '700' : '400',
            fontSize: email?.length == 0 ? 16 : 20,
          }}
          errors={errors.email}
          touched={touched.email}
          value={email}
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
          keyboardType="email-address"
          placeholderTextColor={COLORS.silver}
        />
        <Space space={20} />
      </View>
    </>
  );
};

export default Step1;

const styles = StyleSheet.create({
  Avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    position: 'relative',
    flex: 1,
    overflow: 'hidden',
  },
  icon16CameraPlus: {
    position: 'absolute',
    right: '25%',
    bottom: 35,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 100,
    shadowColor: COLORS.blueGreen,
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

{
  /* <Formik
initialValues={IdentityState}
validationSchema={validationSchemaIdentity}
onSubmit={(values, formikAction) => {
  const {
    firstName,
    lastName,
    birthDay, //
    nationality, //
  } = values;

  let obj = {
    password,
    email,
    firstName,
    lastName,
    mobileNumber,
    language,
    group,
    address: {
      streetName,
      streetNumber,
      city,
      postCode,
      state,
      country,
    },
  }; */
}

// dispatch(register(obj, navigation));
// }}
// >
// {({
//   values,
//   errors,
//   handleChange,
//   handleBlur,
//   touched,
//   handleSubmit,
//   isSubmitting,
//   setFieldValue,
// }) => {
//   return (
//     <>

//       {/* <PrimaryButtonLinear
//         width={"100%"}
//         onPress={() => {
//           // handleSubmit();
//           next()
//           // navigation.navigate("ConfirmPhoneNum");
//         }}
//         loading={isSubmitting}
//         disabled={true}
//       >
//         Next
//       </PrimaryButtonLinear> */}

//       <AcceptTerms />
//     </>
//   );
// }}
// </Formik>

{
  /* 


<SelectCountry
label={"Nationality"}
placeholder={"Your country"}
name={"country"}
onBlur={handleBlur("country")}
setFieldValue={setFieldValue}
errors={errors.country}
touched={touched.country}
onChangeFormattedText={(text) => {
  setFieldValue("country", text);
}}
/>
<Space space={20} /> */
}
