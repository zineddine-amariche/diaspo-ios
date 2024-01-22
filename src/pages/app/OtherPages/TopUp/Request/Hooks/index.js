import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";

setLocale(fr);
export function useTransfers() {

  const State0 = {
    from: "",
    email: "",
    phone: "",

    amount: "",
    message: "",

    country: "",
    bankName: "",

    name:""
  };

  const State1 = {
    from: "",
    phone: "",
    email: "",
    
    BankNum: "",
    BankName: "",
  };
  const Transfers = async (data) => {
    console.log("data", data);
  };

  const emailPhoneRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .max(35, "email is too long - must be 35 characters maximum.")
      .required("email is required")
      .matches(emailPhoneRegex, "Must be a valid phone or email number!")
      .min(10, "email  is too short - must be at least 10 characters."),
    amount: Yup.string().required("amount is required"),
    phone: Yup.string().required("phone is required"),
    from: Yup.string().required("full name is required"),
    name: Yup.string().required("receiver's name is required"),
    phoneReceiver: Yup.string().required("receiver's phone is required"),
    message: Yup.string().required("message is required"),
    country: Yup.string().required("Country is required"),
    bankName: Yup.string().required("Bank name is required"),
  });

  let validationSchema1 = Yup.object().shape({
    email: Yup.string()
      .max(35, "email is too long - must be 35 characters maximum.")
      .required("email is required")
      .matches(emailPhoneRegex, "Must be a valid email !")
      .min(10, "email is too short - must be at least 10 characters."),
      BankNum: Yup.string().required("Bank number is required"),
    BankName: Yup.string().required("Bank Account is required"),
    from: Yup.string().required("full name is required"),
    phone: Yup.string().required("phone is required"),
  });

  const StateCode = {
    code: "",
  };


  return {
    validationSchema,
    validationSchema1,
    State0,
    State1,
    Transfers,
    StateCode,
 
  };
}
