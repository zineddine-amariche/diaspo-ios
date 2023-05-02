import * as Yup from 'yup';
import {fr} from 'yup-locales';
import {setLocale} from 'yup';
import {useState} from 'react';
import GetToken from '../../../../redux/Features/AppToken/GetToken';

setLocale(fr);
export function useLogin() {
  const [hidePass, setHidePass] = useState(true);
  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };

  const initialValues = {
    //userName: '',
    // userPassword: '',
    //  userPassword: "DiaspoTontin@88",
    // userName: "amarichezineddine@gmail.com",
    // userName: "relzed@yopmail.com",
      userName: "trop@yopmail.com",
     userPassword: "@Zinou12345",
    // userName: "ramadan@yopmail.com",
    // userName: 'reda.bekka@nbk-cg.com',
    // userPassword: 'Azerty@2023',

    // userName: "test-djim-23@yopmail.com",
    // userName: 'redadedv@yopmail.com',

    // userName: 'zinoudev@yopmail.com',
    //  userPassword: "@Diaspo2022",
    // userPassword: '@Zinou12345',

    //  userPassword: "Diaspo@2022",
    //   userName: "rblink@yopmail.com",
    // userPassword: 'Diaspo@2022',
    //   userName: "kyc3@yopmail.com",
    //  userPassword: "kyc@yop23S",
  };

  const Login = async () => {
    GetToken();
  };

  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const specialsRegEx = /[^A-Za-z 0-9]/g;
  // const emailPhoneRegex =
  //   /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;

  const emailPhoneRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  let validationSchema = Yup.object().shape({
    userName: Yup.string()
      .max(35, 'Email is too long - must be 35 characters maximum.')
      .required('Email is required')
      .matches(emailPhoneRegex, 'Must be a valid email!')
      .min(10, 'Email is too short - must be at least 10 characters.'),
    userPassword: Yup.string()
      .max(20, 'Password is too long - must be no more than 20 characters.')
      .min(6, 'Password is too short - must be at least 8 characters.')
      .matches(lowercaseRegEx, 'Must contain a lowercase alphabetic character!')
      .matches(
        uppercaseRegEx,
        'Must contain an uppercase alphabetic character!',
      )
      .matches(numericRegEx, 'Must contain a numeric character!')
      .matches(specialsRegEx, 'Must contain a special character')
      .required('Password required'),
  });

  return {
    validationSchema,
    initialValues,
    Login,
    HandlehidePass,
    hidePass,
  };
}
