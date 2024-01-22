import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import DropDownimp from "../../../../../../../Assets/Img/icon24Dropdown.png";
import { useTransfers } from "../../Hooks";
import PrimaryInput from "../../../../../../../components/Input";
import Space from "../../../../../../../components/Space";
import { COLORS } from "../../../../../../../theme";
import ImgIcon from "../../../../../../../Assets/Img/icon24ViewtypeList.png";
import DropDown from "../../../../../../../components/select/DropDown";
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
  errors,
  values,
  setFieldValue,
  handleBlur,
  handleChange,
  touched,
  handlePresentModalSelect,
}) => {
  const { email,phone, amount, message, BankNum, BankName, from } = values;
  return (
    <>
      <PrimaryInput
        name={from}
        Label={"Request from"}
        placeholder="Enter full name "
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
      <Space space={10} />
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
        fontSize={14}
        keyboardType="numeric"
        openDrawerisReceivers={handlePresentModalPress3}
      />
      <Space space={20} />

      <PrimaryInput
        placeholder="Enter email"
        style={styles.Input}
        name={email}
        id={email}
        value={email}
        onBlur={handleBlur("email")}
        onChangeText={handleChange("email")}
        Label="Email address"
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
        // Label={"Account type du destinataire"}
        Label={"Bank Name"}
        setFieldValue={setFieldValue}
        name={"BankName"}
        errors={errors.BankName}
        touched={true}
        placeholder={"Select bank"}
        onBlur={handleBlur("BankName")}
        // onSelect={onSelect}
        icon={DropDownimp}
        value={BankName}
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
