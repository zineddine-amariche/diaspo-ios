import * as Yup from 'yup';
import {fr} from 'yup-locales';
import {setLocale} from 'yup';
import {useDispatch} from 'react-redux';
import {useState} from 'react';

setLocale(fr);
export function useForgot() {
 const dispatch =useDispatch()
 const [hidePass, setHidePass] = useState(true);
 const HandlehidePass = () => {
  setHidePass(!hidePass);
};

  const initialState = {
    email_phone: '',
    code: '',
  };
  const StateEmail = {
    email_phone: '',
  };
  const StateCode= {
    code: '',
  };

  const Login = async data => {
    // console.log('data',data);
    // await dispatch({ type: "LOGIN", payload: data });
  };


  const emailPhoneRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/

  let validationSchema = Yup.object().shape({
    email_phone: Yup.string()
      .max(35,'numéro telephone ou email est trop long - doit être de 35 caractères maximum.',)
      .required('numéro telephone ou email est requis')
      .matches(emailPhoneRegex, 'Doit être un numéro téléphone ou email valide !')
      .min(10,'Le Numéro téléphone est trop court - doit comporter au moins 10 caractères.',),
  });

  let validationSchemaCode = Yup.object().shape({
    code: Yup.string()
      .max(6,'Le code est trop long - doit être de 6 caractères maximum.',)
      .min(6,'Le code est trop court - doit être de 6 caractères maximum.',)
      .required('code est requis'),
  });

  return {
    validationSchema,
    validationSchemaCode,
    initialState,
    Login,
    HandlehidePass,
    hidePass,
    StateEmail,
    StateCode,
    
  }
}
