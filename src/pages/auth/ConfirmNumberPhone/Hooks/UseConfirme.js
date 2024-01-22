import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";

setLocale(fr);
export function UseConfirme() {
 
  const StateCode = {
    code: "",
  };

  const Confirm = async (data) => {
    // console.log('ddd',data);
    // await dispatch({ type: "LOGIN", payload: data });
  };

  let validationSchemaCode = Yup.object().shape({
    code: Yup.string()
      .max(6, "Le code est trop long - doit être de 6 caractères maximum.")
      .min(6, "Le code est trop court - doit être de 6 caractères maximum.")
      .required("code est requis"),
  });

  return {
    validationSchemaCode,
   
    StateCode,
  };
}
