import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Txt } from "../../../../../../../components/utils";
import Space from "../../../../../../../components/Space";
import { useAddNewPersson } from "../Hooks";
import {
  PrimaryButtonLinear,
  WhiteButton,
} from "../../../../../../../components/Buttons";
import { useState } from "react";
import DropDown from "../../../../../../../components/select/DropDown";
import { COLORS } from "../../../../../../../theme";
import { Formik } from "formik";
import PrimaryInput from "../../../../../../../components/Input";
import Line from "../../../../../../../components/views/line";

const RenderBottomEdiit = ({ handleClosePress, onSuccess }) => {
  const { onSubmit, state, schema } = useAddNewPersson();

  const [selected, setSelected] = useState(null);

  const onSelect = (item) => {
    setSelected(item);
  };

  const data2 = [
    {
      color: COLORS.grayIcon,
      label: "USA, United Kingdom ",
      value: 1,
      icon: "city",
    },
    {
      color: COLORS.grayIcon,
      label: "Algeria, Alger Centre",
      value: 2,
      icon: "city",
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <Txt style={styles.title} fontSize={20}>
          Edit information
        </Txt>
        <Space space={20} />
        <Formik
          initialValues={state}
          validationSchema={schema}
          onSubmit={(values, formikAction) => {
            //   formikAction.resetForm();
            //   dispatch(login(values));
            handleClosePress();
            // onSuccess()
            onSubmit(values);
            formikAction.setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            touched,
            isValid,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            const {
              full_name,
              phone,
              email,
              address,
              bankaccount,
              bankName,
            } = values;
            return (
              <>
                <PrimaryInput
                  name={full_name}
                  Label={"Enter full name"}
                  placeholder="Enter full name"
                  style={styles.Input}
                  errors={errors.full_name}
                  touched={touched.full_name}
                  value={full_name}
                  onBlur={handleBlur("full_name")}
                  onChangeText={handleChange("full_name")}
                />
                <Space space={20} />
                <PrimaryInput
                  name={phone}
                  Label={"Phone number"}
                  placeholder="Enter phone number"
                  style={styles.Input}
                  errors={errors.phone}
                  touched={touched.phone}
                  value={phone}
                  onBlur={handleBlur("phone")}
                  onChangeText={handleChange("phone")}
                />
                <Space space={20} />
                <PrimaryInput
                  name={email}
                  Label={"Email address"}
                  placeholder="Enter email address"
                  style={styles.Input}
                  errors={errors.email}
                  touched={touched.email}
                  value={email}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                />
                <Space space={20} />
                <PrimaryInput
                  name={bankaccount}
                  Label={"Bank account number"}
                  placeholder="Enter bank account number"
                  style={styles.Input}
                  errors={errors.bankaccount}
                  touched={touched.bankaccount}
                  value={bankaccount}
                  onBlur={handleBlur("bankaccount")}
                  onChangeText={handleChange("bankaccount")}
                />
                <Space space={20} />
                <DropDown
                  data={data2}
                  label={"bankName"}
                  setFieldValue={setFieldValue}
                  name={"bankName"}
                  errors={errors.bankName}
                  touched={touched.bankName}
                  placeholder={"Select your gender"}
                  onBlur={handleBlur("bankName")}
                  value={selected}
                  onSelect={onSelect}
                />
                <Space space={30} />
                <PrimaryButtonLinear
                  width={"100%"}
                  onPress={() => {
                    handleSubmit();
                  }}
                  loading={isSubmitting}
                  disabled={true}
                >
                  save changes
                </PrimaryButtonLinear>
                <Space space={5} />
                <WhiteButton
                  width={"100%"}
                  onPress={() => {
                    handleSubmit();
                  }}
                  loading={isSubmitting}
                  disabled={isValid}
                >
                  cancel
                </WhiteButton>
              </>
            );
          }}
        </Formik>
      </View>
      <Line color={COLORS.blueGreen} />
      <Space space={5} />
    </>
  );
};

export default RenderBottomEdiit;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
  },
});
