import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

setLocale(fr);

export function useRegister() {
  const [hidePass, setHidePass] = useState(true);
  const phoneRegex = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
  const lowercaseRegEx = /(?=.*[a-z])/;
  const uppercaseRegEx = /(?=.*[A-Z])/;
  const numericRegEx = /(?=.*[0-9])/;
  const specialsRegEx = /[^A-Za-z 0-9]/g;
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };

  // const initialState = {
  //   password: "@Zinou123",
  //   email: "hapaf13592@deitada.com",
  //   firstName: "UserDev",
  //   lastName: "AmaTest",
  //   mobileNumber: "+447307568957",
  //   language: "EN",

  //   streetName: "Wicksteed House",
  //   streetNumber: "35",
  //   city: "Elephant And Castle",
  //   postCode: "SE16RQ",
  //   state: "London",
  //   country: "United Kingdom",

  //   group: "USER",
  // };

  const initialState = {

    password: "",
    email: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
    language: "",
    streetName: "",
    streetNumber: "",
    city: "",
    postCode: "",
    state: "",
    country: "",

    group: "USER",
  };

  const { token } = useSelector((state) => ({ ...state.token }));

  let configHead = {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "fr",
      Authorization: `Bearer ${token}`,
    },
  };

  let validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("email is required")
      .min(8, "email is too short - must be at least 8 characters.")
      .matches(emailRegex, "Must be a valid email !"),
    password: Yup.string()
      .min(
        6,
        "Password is too short - must be at least 6 characters."
      )
      .matches(
        lowercaseRegEx,
        "Must contain a lowercase alphabetic character!"
      )
      .matches(
        uppercaseRegEx,
        "Must contain an uppercase alphabetic character!"
      )
      .matches(numericRegEx, "Must contain a numeric character!")
      .matches(specialsRegEx, "Must contain a special character")
      .required("Password is required"),
    mobileNumber: Yup.string()
      .matches(phoneRegex, "Must be a valid phone number!")
      .required("Phone number is required")
      .min(
        10,
        "Phone Number is too short - must be at least 10 characters."
      ),
    firstName: Yup.string().required("first name is required"),
    lastName: Yup.string().required("last name is required"),
    language: Yup.string().required("language is required"),
    group: Yup.string(),
    streetName: Yup.string().required("street name is required"),
    streetNumber: Yup.string().required("street number number is required"),
    city: Yup.string().required("city is required"),
    postCode: Yup.string().required("postCode is required"),
    state: Yup.string().required("state is required"),
    country: Yup.string().required("country is required"),
  });

  return {
    validationSchema,
    initialState,
    HandlehidePass,
    hidePass,
  };
}

// navigation.navigate("ConfirmPhoneNum")

// try {
//   const res = await axios.get(
//     `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users`
//   );

//   // setcheckAsyc(res.data.data.AccessToken)
//   console.log('ress',res);

//   // dispatch(connect(res.data.data.AccessToken))
//   // console.log('ress',res.data);
//   // setcheckAsyc(true);
//   return res;
// } catch (error) {
//   console.log(error.response);
//   return error.response;
// }

// email_phone: Yup.string()
// .max(
//   35,
//   "numéro telephone ou email est trop long - doit être de 35 caractères maximum."
// )
// // .required("numéro telephone ou email est requis")
// .matches(emailRegex, "Doit être un numéro téléphone ou email valide !")
// .min(
//   10,
//   "Le Numéro téléphone est trop court - doit comporter au moins 10 caractères."
// ),

// required("state_city is required"),
// gender: Yup.string().required("gender is required"),
// address: Yup.string().required("address is required"),
// country: Yup.string().required("country is required"),
// full_name: Yup.string()
//   .min(4, "Full_name est trop court - doit être de 4 caractères minimum.")
//   .max(35, "Full_name est trop long - doit être de 35 caractères maximum."),
// .required("Full_name est requis"),
