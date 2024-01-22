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
    // nameTotine: "",
    // amountperperson: "",
    // frequency: "",
    // date: "",
    // retention: "",

    // nameTotine: "enzo nino",
    // amountperperson: "1700",
    // frequency: "25",
    // date: "25/10/2020",
    // retention: "10",

    name: "Main account",
    amount: 20,
    frequencyOfPayment: "WEEKLY",
    currency: "EUR",
    accountType: "personal",
    startAt: "",
    endAt: '',
    status: "IN PROGRESS",
    asAPayer: true,
    retentionRate: "4",
  };

  const onSubmit = async (data) => {
    // console.log("data", data);
  };

  const dateSecond = /(\d+\/\d+\/\d+)\s*-\s*(\d+\/\d+\/\d+)/;

  let schema = Yup.object().shape({
    amount: Yup.string()
      .max(
        20,
        "Amount per person is too long - must be no more than 2 characters."
      )
      // .min(4, "Amount per person is too short - must be at least 2 characters.")
      // .matches(numericRegEx, "Must contain a numeric character!")
      .required("Amount per person  is required"),
    name: Yup.string()
      .max(20, "Amount is too long - must be no more than 2 characters.")
      .min(4, "Amount is too short - must be at least 2 characters.")
      .required("Name of totine is required"),

      
      startAt: Yup.string().required("start date  is required"),
    endAt: Yup.string().required("End date  is required"),
    retentionRate: Yup.string().required("retentionRate is required"),
    frequencyOfPayment: Yup.string()
      // .max(2, "Frequency is too long - must be no more than 2 characters.")
      // .min(2, "Frequency is too short - must be at least 2 characters.")
      .required("Frequency is required"),
    currency: Yup.string().required("Currency is required"),
    status: Yup.string().required("status is required"),
    accountType: Yup.string().required("accountType is required"),
    asAPayer: Yup.string(),
  });

  return {
    onSubmit,
    state,
    schema,
  };
}
