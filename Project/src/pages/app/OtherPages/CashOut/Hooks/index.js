import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { connect } from "../../../../redux/Features/auth";

setLocale(fr);
export function useTransfers() {
  const dispatch = useDispatch();

  const State0 = {
    amount: "",
    // agency: "",
  };

  const State1 = {
    amount2: "",
    agency2:""
  };
  const cashout = async (data) => {
    // console.log("data",data);
  };

  const emailPhoneRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;

  let validationSchema = Yup.object().shape({
    amount: Yup.string().required("amount is required"),
    // agency: Yup.string().required("agency is required"),
  });

  let validationSchema1 = Yup.object().shape({

    amount2: Yup.string().required("amount is required"),
    agency2: Yup.string().required("agency is required"),
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
    cashout,
    StateCode,
    validationSchemaCode,

  };
}
