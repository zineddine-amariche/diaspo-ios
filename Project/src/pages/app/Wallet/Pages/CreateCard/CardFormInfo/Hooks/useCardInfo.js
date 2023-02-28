import * as Yup from "yup";
import { fr } from "yup-locales";
import { setLocale } from "yup";

setLocale(fr);
export function useCreatCard() {
  const initialValues = {
    CardNumber: "",
    fullName: "",
    ValidTill: "",
    CVV: "",
    Country: "",
  };

  const Submit = async (data) => {
    console.log("data", data);
  };

  let validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .max(35, "full name est trop long - doit être de 35 caractères maximum.")
      .required("full name est requis")
      .min(
        4,
        "full name est trop court - doit comporter au moins 10 caractères."
      ),
    CardNumber: Yup.string().required("This card number can't be recognized. Please try again."),
    ValidTill: Yup.string().required("Valid Till required"),
    CVV: Yup.string().required("CVV is required"),
    Country: Yup.string().required("Country required"),
  });

  return {
    validationSchema,
    initialValues,
    Submit,
  };
}
