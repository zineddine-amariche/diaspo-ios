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

    Country: "",
    bankName: "",
  };

  const State1 = {
    from: "",
    email: "",
    phone: "",

    BankNum: "",
    bankName: "",
  };
  const Transfers = async (data) => {
    // console.log("data",data);
  };

  const emailPhoneRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;

  let validationSchema = Yup.object().shape({
    from: Yup.string().required("full name is required"),
    email: Yup.string()
      .max(35, " email is too long - must be 35 characters maximum.")
      .required(" email is required")
      .matches(emailPhoneRegex, "Must be a valid email number!")
      .min(10, " email is too short - must be at least 10 characters."),
    phone: Yup.string()
      .max(35, "phone number  is too long - must be 35 characters maximum.")
      .required("phone number is required")
      .matches(emailPhoneRegex, "Must be a valid phone number!")
      .min(10, "Phone number is too short - must be at least 10 characters."),
    amount: Yup.string().required("amount is required"),
    message: Yup.string().required("message is required"),
    Country: Yup.string().required("Country is required"),
    bankName: Yup.string().required("bank Name is required"),
  });

  let validationSchema1 = Yup.object().shape({
    email: Yup.string()
      .max(35, "email is too long - must be 35 characters maximum.")
      .required("email is required")
      .matches(emailPhoneRegex, "Must be a valid  email !")
      .min(10, "email is too short - must be at least 10 characters."),
    from: Yup.string().required("ful name is required"),
    phone: Yup.string().required("phone number is required"),
    
    BankNum: Yup.string().required("Bank Number is required"),
    bankName: Yup.string().required("Bank name is required"),
  });

  const StateCode = {
    code: "",
  };
  let validationSchemaCode = Yup.object().shape({
    code: Yup.string()
      .max(6, "Le code est trop long - doit être de 6 caractères maximum.")
      .min(6, "Le code est trop court - doit être de 6 caractères maximum.")
      .required("code est requis"),
  });

  return {
    validationSchema,
    validationSchema1,
    State0,
    State1,
    Transfers,
    StateCode,
    validationSchemaCode,
  };
}
