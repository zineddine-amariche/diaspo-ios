import { useSelector } from "react-redux";
import * as Yup from "yup";

export function useAmount() {
  const {selectedTontine} = useSelector(state => ({
    ...state.tontines,
  }));


  const state = {
    name: "",
    amount: "",
    frequencyOfPayment: "",
    currency: "EUR",
    startAt: "",
    endAt: "1705482199",
    status: "IN PROGRESS",
    asAPayer: selectedTontine == 'TONTINE_CUSTOM_TONTINE'  ? true :false ,
    retentionRate: "0",
    typeTontine: "personal",
    type: "",
  };

  let schema = Yup.object().shape({
    amount: Yup.number()
    .typeError('Amount must be a number')
    .positive('Amount must be a positive number')
    .required("Amount per person  is required"),
    name: Yup.string().required("Name of totine is required"),
    startAt: Yup.string().required("start date  is required"),
    // delete the value of endAt when fix this issue in the server 
    endAt: Yup.string().required("End date  is required"),
    retentionRate: Yup.number().required("retentionRate is required").max(50,"Number must be at most 50").min(0,'Number must be at least 0'),
    frequencyOfPayment: Yup.string().required("Frequency is required"),
    currency: Yup.string().required("Currency is required"),
    status: Yup.string().required("status is required"),
    asAPayer: Yup.string(),
    typeTontine: Yup.string().required("Type Tontine is required"),
    type: Yup.string(),
  });

  return {
    state,
    schema,
  };
}
