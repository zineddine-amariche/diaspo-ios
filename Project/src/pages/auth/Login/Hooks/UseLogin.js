import * as Yup from 'yup';
import {fr} from 'yup-locales';
import {setLocale} from 'yup';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {connect} from '../../../../redux/Features/auth';
import GetToken from '../../../../redux/Features/AppToken/GetToken';

setLocale(fr);
export function useLogin() {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };

  const initialValues = {
              // userName: '',
      // userPassword: '',
    // userName: "relzed@yopmail.com",
    //  userPassword: "DiaspoTontin@88",
    userName: "amarichezineddine@gmail.com",
     userPassword: "@Zinou12345",
    // userName: "test-djim-23@yopmail.com",
    //  userName: 'redadedv@yopmail.com',
    //  userName: "zinoudev@yopmail.com",
    // userPassword: "@Diaspo2023",
    // userPassword: "Diaspo@2022",
    //   userName: "rblink@yopmail.com",
    // userPassword: 'Diaspo@2022',
    //   userName: "kyc3@yopmail.com",
    //  userPassword: "kyc@yop23S",
  };

  // const initialValues = {
  //   userName: "s.djimera-diaspo1@yopmail.com",
  //   userPassword: "M0oiuyt12@uiU",
  // "mobileNumber": "+447307568988",
  // };

  // const initialValues = {
  //   userName: "hapaf13592@deitada.com",
  //   userPassword: "@Zinou123",
  // };

  // const initialValues = {
  //   userName: "",
  //   userPassword: "",
  // };
  const Login = async data => {
    // dispatch(connect())
    // console.log("data", data);

    GetToken();

    // await dispatch({ type: "LOGIN", payload: data });
  };

  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const specialsRegEx = /[^A-Za-z 0-9]/g;
  // const emailPhoneRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/ || /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g
  const emailPhoneRegex =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;

  let validationSchema = Yup.object().shape({
    userName: Yup.string()
      .max(
        35,
        'numéro telephone ou email est trop long - doit être de 35 caractères maximum.',
      )
      .required('numéro telephone ou email est requis')
      .matches(
        emailPhoneRegex,
        'Doit être un numéro téléphone ou email valide !',
      )
      .min(
        10,
        'Le Numéro téléphone est trop court - doit comporter au moins 10 caractères.',
      ),
    userPassword: Yup.string()
      .max(
        20,
        'Le mot de passe est trop long - doit être de 20 caractères maximum.',
      )
      .min(
        6,
        'Le mot de passe est trop court - doit comporter au moins 8 caractères.',
      )
      .matches(
        lowercaseRegEx,
        'Doit contenir un caractère alphabétique minuscule!',
      )
      .matches(
        uppercaseRegEx,
        'Doit contenir un caractère alphabétique majuscule!',
      )
      .matches(numericRegEx, 'Doit contenir un caractère numérique!')
      .matches(specialsRegEx, 'Doit contenir un caractère spécial')
      .required('Mot de passe requis'),
  });

  return {
    validationSchema,
    initialValues,
    Login,
    HandlehidePass,
    hidePass,
  };
}
