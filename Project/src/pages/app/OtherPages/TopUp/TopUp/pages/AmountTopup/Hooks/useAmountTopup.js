import * as Yup from "yup";
import { useDispatch } from "react-redux";

export function useAmoutTopup() {
  const dispatch = useDispatch();
 

  const state = {
    amount: "",
  };

  const onSubmit = async (data) => {
     console.log("data", data);
  };

  const numericRegEx = /(?=.*[0-9])/;

  let schema = Yup.object().shape({
    amount: Yup.string()
      .max(
        10,
        "Amount is too long - must be no more than 10 ."
      )
      .min(
        2,
        "Amount is too short - must be at least 2 ."
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
