import * as Yup from 'yup';
import {fr} from 'yup-locales';
import {setLocale} from 'yup';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

setLocale(fr);

export function useRegister() {
  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const phoneRegex =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const specialsRegEx = /[^A-Za-z 0-9]/g;
  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  // const emailPhoneRegex =
  // /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;

  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };
  const HandlehidePass2 = () => {
    setHidePass2(!hidePass2);
  };

  const {devicetoken, deviceOS} = useSelector(state => ({...state.register}));
  const {exists, error, status} = useSelector(state => ({
    ...state.existingEmail,
  }));

  const IdentityState = {
    firstName: '',
    lastName: '',
    birthDay: '', //
    nationality: '', //
    deviceToken: devicetoken,
    deviceOs: deviceOS,
    email: '',
    nationalityFlagName: '',
  };

  const InformationState = {
    mobileNumber: '',
    language: 'English',
  };

  const AdressState = {
    state: '',
    streetName: '',
    streetNumber: '',
    addressComplement: '', //
    city: '',
    country: '',
    region: '', //
    postCode: '',
    countryFlagName: '',
  };

  const ProofState = {
    startAt: '', //
    profIdentity: '', // BOOLEAN
    profAdress: '', // BOOLEAN
    profIdentityData: '', // Data
    profAdressData: '', // Data
    group: 'USER',
    password: '',
    confirmPassword: '',
  };

  let validationSchemaIdentity = Yup.object().shape({
    firstName: Yup.string().required('first name is required'),
    nationalityFlagName: Yup.string(),
    lastName: Yup.string().required('last name is required'),
    birthDay: Yup.string().required('Date of birth  is required'),
    nationality: Yup.string().required('nationality  is required'),
    email: Yup.string()
      .test('email-exists', 'Email already exists', async value => {
        return !exists;
      })
      .required('Email is required')
      .min(8, 'Email is too short - must be at least 4 characters.')
      .matches(emailRegex, 'Must be a valid email!'),
  });
  let validationSchemaInformation = Yup.object().shape({
    mobileNumber: Yup.string()
      .matches(
        /^(?:(?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(?:(?:\(?\d{3}\)?[\- ]?)?\d{3}[\- ]?\d{4}|\d{2}[\- ]?\d{3}[\- ]?\d{3})$/,
        'Must be a valid phone number!',
      )
      .required('Phone number is required')
      .max(15, 'Must be a valid phone number'),

    language: Yup.string().required('language is required'),
  });
  let validationSchemaAdressState = Yup.object().shape({
    streetName: Yup.string().required('Address is required'),
    postCode: Yup.string()
      .required('Post code is required')
      .max(8, 'Max post code is 8 characters'),
    countryFlagName: Yup.string(),
  });
  let validationSchemaProofState = Yup.object().shape({
    startAt: Yup.string().required(' Date signed is required'),
    profIdentity: Yup.string().required('Proof Identity is required'),
    profAdress: Yup.string(),
    // .required("Proof Address is required"),

    profIdentityData: Yup.string().required('Proof Address is required'),
    profAdressData: Yup.string(),

    group: Yup.string(),
    password: Yup.string()
      .min(10, 'Password is too short - must be at least 10 characters.')
      .matches(lowercaseRegEx, 'Must contain a lowercase alphabetic character!')
      .matches(
        uppercaseRegEx,
        'Must contain an uppercase alphabetic character!',
      )
      .matches(numericRegEx, 'Must contain a numeric character!')
      .matches(specialsRegEx, 'Must contain a special character'),

    // confirm Password and its validations
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  async function clearItem(itemKey) {
    await AsyncStorage.removeItem(itemKey)
      .then(() => {
        // console.log(`Successfully removed ${itemKey} from AsyncStorage`);
      })
      .catch(error => {
        // console.error(`Error removing ${itemKey} from AsyncStorage`);
      });
  }

  return {
    IdentityState,
    InformationState,
    AdressState,
    ProofState,
    validationSchemaIdentity,
    validationSchemaInformation,
    validationSchemaAdressState,
    validationSchemaProofState,
    HandlehidePass,
    HandlehidePass2,
    hidePass,
    clearItem,
    hidePass2,
  };
}
