import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useState } from "react";

export function useAmount() {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };

  const state = {
    amount: "",
  };

  const onSubmit = async (data) => {
    // console.log("data", data);
  };

  const numericRegEx = /(?=.*[0-9])/;

  let schema = Yup.object().shape({
    amount: Yup.string()
      .max(
        20,
        "Amount is too long - must be no more than 20 characters."
      )
      .min(
        4,
        "Amount is too short - must be at least 8 characters."
      )
      .matches(numericRegEx, "Must contain a numeric character!")
      .required("Amount required"),
  });

  return {
    onSubmit,
    state,
    schema,
  };
}
