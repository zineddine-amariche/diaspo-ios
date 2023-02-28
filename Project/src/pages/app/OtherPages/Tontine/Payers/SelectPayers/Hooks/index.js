import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { deleteSelectedListPayers, resetPayers } from "../../../../../../../redux/Features/Tontine/ManagePayers";

export function useAddNewPersson() {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);

  
  const { tontines } = useSelector((state) => ({
    ...state.tontines,
  }));

  
  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };

  const state = {
    full_name: "user",
    phone: "0773820877",
    email: "inisg@gmail.com",
    bankaccount: "new akk",
    bankName: "best",
  };

  const onSubmit = async (data) => {
    // console.log("data", data);
  };
  const phoneRegex = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
  const numericRegEx = /(?=.*[0-9])/;
  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  let schema = Yup.object().shape({
    email: Yup.string()
      .required("email is required")
      .min(8, "email is too short - must be at least 4 characters.")
      .matches(emailRegex, "Must be a valid email !"),
    phone: Yup.string()
      .matches(phoneRegex, "Must be a valid phone number !")
      .required("phone is required")
      .min(10, "phone number is too short - must be at least 10 number."),
    full_name: Yup.string()
      .max(20, "full_name is too long - must be no more than 20 characters.")
      .min(4, "full_name is too short - must be at least 4 characters.")
      .required("Full name is required"),
    bankaccount: Yup.string().required("bank account is required"),
    bankName: Yup.string().required("bank name is required"),
  });


  const durationMs = 350;
 
  const {
    selectedconnectUser,
    selectedconnectUserContacts,
    selectedconnectNonUserApp,
    laoder,
  } = useSelector((state) => ({
    ...state.payers,
  }));
  const { token } = useSelector((state) => ({ ...state.token }));


  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);


  const goBackFun= (navigation)=>{
    navigation.navigate("Tontine");
    setTimeout(
      () => dispatch(resetPayers(), dispatch(deleteSelectedListPayers())),
      durationMs
    );
  }





  return {
    onSubmit,
    state,
    schema,
    durationMs,
    dispatch,
    selectedconnectUser,
    selectedconnectUserContacts,
    selectedconnectNonUserApp,
    laoder,
    token,
    bottomSheetModalRef,
    bottomSheetModalRef2,
    goBackFun
  };
}
