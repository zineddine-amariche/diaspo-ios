import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";

setLocale(fr);
export function useCreatePassword() {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const [c_hidePass, setC_HidePass] = useState(true);

  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };
  const HandlehideC_Pass = () => {
    setC_HidePass(!c_hidePass);
  };
  const initialState = {
    newPassword: "",
    c_password: "",
  };




  let validationSchema = Yup.object().shape({
    newPassword: Yup.string()

      .min(
        6,
        "Le mot de passe est trop court - doit comporter au moins 8 caractères."
      )
      .required("Mot de passe requis"),
    c_password: Yup.string()
      .required("Confirm Mot de passe requis")
      .oneOf([Yup.ref("newPassword")], "Les mots de passe ne correspondent pas"),
  });


  return {
    validationSchema,
    initialState,
    HandlehidePass,
    hidePass,
    c_hidePass,
    HandlehideC_Pass,
  };
}
