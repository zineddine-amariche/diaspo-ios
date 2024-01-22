import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PrimaryInput from "../../../../../../../components/Input";
import { Formik } from "formik";
import { COLORS, SIZES } from "../../../../../../../theme";
import Space from "../../../../../../../components/Space";
import { useAmount } from "../../../Hooks";

const Form = () => {
  const { state, schema, onSubmit } = useAmount();
  return (
    <Formik
      initialValues={state}
      validationSchema={schema}
      onSubmit={(values, formikAction) => {
        // console.log("values", values);
        formikAction.setSubmitting(false);
        formikAction.resetForm();
        // Login();
        onSubmit(values);
      }}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        touched,
        handleSubmit,
        isSubmitting,
      }) => {
        const { amount } = values;

        return (
          <>
            <PrimaryInput
              name={amount}
              Label={"Top up amount"}
              placeholder="14.760"
              style={styles.Input}
              errors={errors.amount}
              touched={touched.amount}
              value={amount}
              onBlur={handleBlur("amount")}
              onChangeText={handleChange("amount")}
              amount="euro"
              keyboardType="numeric"
            />
            <Space space={20} />

  
          </>
        );
      }}
    </Formik>
  );
};

export default Form;

const styles = StyleSheet.create({
  Input: {
    color: COLORS.Noir,
    fontSize: 16,
    // //fontFamily: "Roboto-Bold",
    flex: 1,
    paddingLeft: 2,
  },

});
