import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useDispatch } from "react-redux";
import {useNavigation} from '@react-navigation/native';

setLocale(fr);
export function useCashout() {
  const dispatch = useDispatch();
  const navigation =useNavigation()

  const State0 = {
    amount: "",
  };

    
  const cashout = async (obj) => {

    const {data} = obj
     
    navigation.navigate(data,{obj});

  };


  let validationSchema = Yup.object().shape({
    amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be a positive number')
    .required("Amount per person  is required"),  });

 


  return {
    validationSchema,
    State0,
    cashout,

  };
}
