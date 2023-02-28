import { StyleSheet, View } from "react-native";
import React from "react";
import PrimaryInput from "../../../../../../components/Input";
import { COLORS } from "../../../../../../theme";
import Space from "../../../../../../components/Space";
import { useState } from "react";
import SelectAccount from "./Components";
import { Head, Txt } from "../../../../../../components/utils";

const Form0 = ({
  handlePresentModalPress3,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  navigation,
  setchecked,
  checked,
  setNavigationCashOut
}) => {
  const { amount } = values;

  return (
    <>
      <View style={{ paddingHorizontal: 20 }}>
        <PrimaryInput
          name={amount}
          Label={"Amount of money"}
          placeholder="12,000"
          style={styles.Input}
          errors={errors.amount}
          touched={touched.amount}
          value={amount}
          onBlur={handleBlur("amount")}
          onChangeText={handleChange("amount")}
          amount="euro"
          keyboardType="numeric"
          placeholderTextColor={COLORS.darkBlueGrey}
        />
      </View>
      <Space space={20} />
      <View style={{ flex: 1 }}>
        <Head color={COLORS.blueGreen} style={{ marginLeft: 20 }}>
          Select Cash Out Method
        </Head>
        <Space />
        <SelectAccount
          navigation={navigation}
          setchecked={setchecked}
          checked={checked}
          setNavigationCashOut={setNavigationCashOut}
        />
      </View>
    </>
  );
};

export default Form0;

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
    fontSize: 20,
    // //fontFamily: "Roboto-Bold",
    paddingLeft: 2,
  },
  errors: {
    color: COLORS.coral,
    fontSize: 13,
  },
});

// const list = [
//   {
//     name: "OCBC BANK",
//     no: "8732 6920 8237 7201",
//     img: require("../../../../../../Assets/Img/BANK1.png"),
//   },
//   {
//     name: "eastwest bank",
//     no: "8723 6923 7491",
//     img: require("../../../../../../Assets/Img/BANK2.png"),
//   },
//   {
//     name: "standard charte…",
//     no: "0276 3817 2698",
//     img: require("../../../../../../Assets/Img/BANK3.png"),
//   },
//   {
//     name: "posb bank",
//     no: "001 267 812 149",
//     img: require("../../../../../../Assets/Img/BANK4.png"),
//   },
//   {
//     name: "posb bank",
//     no: "001 267 812 149",
//     img: require("../../../../../../Assets/Img/BANK5.png"),
//   },
// ];

// const { validationSchema, State0, Transfers } = useTransfers();

{
  /* <Formik
        initialValues={State0}
        validationSchema={validationSchema}
        onSubmit={(values, formikAction) => {
          setTimeout(() => {
            // console.log("values", values);
            formikAction.setSubmitting(false);
            formikAction.resetForm();
            Transfers(values);
          }, 2000);
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
          const { email_phone, amount, message } = values;

          return (
            <> */
}

{
  /* <PrimaryButtonLinear
              width={"100%"}
              onPress={() => {
                handleSubmit();
              }}

              loading={isSubmitting}
            >
              Login
            </PrimaryButtonLinear> */
}
{
  /* 
              <View style={styles.buttonsConatiner}>
                <PrimaryButtonLinear disabled={false}>
                  CONFIRM
                </PrimaryButtonLinear>
              </View> */
}
{
  /* </>
          );
        }}
      </Formik> */
}
