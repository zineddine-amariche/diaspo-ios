import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { useTransfers } from "../../Hooks";
import PrimaryInput from "../../../../../../components/Input";
import Space from "../../../../../../components/Space";
import { COLORS } from "../../../../../../theme";
import ImgIcon from "../../../../../../Assets/Img/icon24ViewtypeList.png";
import DropDownimp from "../../../../../../Assets/Img/icon24Dropdown.png";

const data = [
  {
    color: "#44C5E4",
    label: "Eastwest Bank",
    value: 1,
    icon: "city",
  },
  {
    color: "#EB4592",
    label: "West Bank",
    value: 2,
    icon: "city",
  },
];
const Form1 = ({
  handlePresentModalPress3,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  handlePresentModalSelect,
}) => {
  const { validationSchema1, State1, Transfers } = useTransfers();
  const {
    phone,
    email,
    amount,
    from,
    Country,
    message,
    BankNum,
    bankName,
  } = values;



  return (
    <>
      <Space space={10} />
      <PrimaryInput
        name={from}
        Label={"Request from"}
        placeholder="Enter full name"
        style={styles.Input}
        errors={errors.from}
        touched={touched.from}
        value={from}
        onBlur={handleBlur("from")}
        onChangeText={handleChange("from")}
        icon={ImgIcon}
        fontSize={14}
        openDrawerisReceivers={handlePresentModalPress3}
      />
      <Space space={20} />

      <PrimaryInput
        placeholder="Phone number"
        style={styles.Input}
        name={phone}
        id={phone}
        value={phone}
        onBlur={handleBlur("phone")}
        onChangeText={handleChange("phone")}
        Label="Enter Phone number"
        errors={errors.phone}
        touched={touched.phone}
        fontSize={14}
      />
      <Space space={20} />

      <PrimaryInput
        Label="Email address"
        style={styles.Input}
        name={email}
        id={email}
        value={email}
        onBlur={handleBlur("email")}
        onChangeText={handleChange("email")}
        placeholder="Enter Email "
        errors={errors.email}
        touched={touched.email}
        fontSize={14}
        keyboardType="email-address"

      />
      <Space space={20} />

      <PrimaryInput
        Label="Bank account number"
        style={styles.Input}
        name={BankNum}
        id={BankNum}
        value={BankNum}
        onBlur={handleBlur("BankNum")}
        onChangeText={handleChange("BankNum")}
        placeholder="Enter bank account number"
        errors={errors.BankNum}
        touched={true}
        fontSize={14}
        keyboardType="numeric"
      />
      <Space space={20} />

      <PrimaryInput
        errors={errors.bankName}
        touched={true}
        onBlur={handleBlur("bankName")}
        onChangeText={handleChange("bankName")}
        fontSize={14}
        Label={"Bank Name"}
        setFieldValue={setFieldValue}
        name={bankName}
        placeholder={"Select bank"}
        icon={DropDownimp}
        value={bankName}
        editable={false}
        openDrawerisReceivers={handlePresentModalSelect}
        style={styles.Input}
      />
      <Space space={20} />
    </>
  );
};

export default Form1;

const styles = StyleSheet.create({
  buttonsConatiner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 127,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  Input: {
    color: COLORS.black,
    fontSize: 16,
    //fontFamily: "Roboto-Bold",
    paddingLeft: 2,
  },
});
