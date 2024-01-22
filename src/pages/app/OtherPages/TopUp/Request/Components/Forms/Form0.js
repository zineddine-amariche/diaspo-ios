import { StyleSheet  } from "react-native";
import React from "react";
import PrimaryInput from "../../../../../../../components/Input";
import { COLORS } from "../../../../../../../theme";
import Space from "../../../../../../../components/Space";
import ImgIcon from "../../../../../../../Assets/Img/icon24ViewtypeList.png";
import SelectCountry from "../../../../../../../components/select/SelectCountry";

const Form0 = ({
  handlePresentModalPress3,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,

}) => {
  const { phone, email, amount,from,Country, message, bankName,name,phoneReceiver } = values;
  return (
    <>
    <Space/>
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
      // icon={ImgIcon}
      fontSize={14}
      keyboardType="numeric"

      openDrawerisReceivers={handlePresentModalPress3}
    />
    <Space space={20} />
    <PrimaryInput
      name={name}
      Label={"Receiver's name"}
      placeholder="Enter receiver's name"
      style={styles.Input}
      errors={errors.name}
      touched={touched.name}
      value={from}
      onBlur={handleBlur("name")}
      onChangeText={handleChange("name")}
      fontSize={14}
      openDrawerisReceivers={handlePresentModalPress3}
    />
    <Space space={20} />
    <PrimaryInput
      name={phoneReceiver}
      Label={"Receiver's phone number"}
      placeholder="Enter Receiver's phone number"
      style={styles.Input}
      errors={errors.phoneReceiver}
      touched={touched.phoneReceiver}
      value={phone}
      onBlur={handleBlur("phoneReceiver")}
      onChangeText={handleChange("phoneReceiver")}
      // icon={ImgIcon}
      fontSize={14}
      keyboardType="numeric"

      openDrawerisReceivers={handlePresentModalPress3}
    />
    <Space space={20} />
    <PrimaryInput
        name={email}
        Label={"Receiver’s email "}
        placeholder="Email "
        style={styles.Input}
        errors={errors.email}
        touched={touched.email}
        value={email}
        onBlur={handleBlur("email")}
        onChangeText={handleChange("email")}
        fontSize={14}
        keyboardType="email-address"
        openDrawerisReceivers={handlePresentModalPress3}
      />
      <Space space={20} />

    <PrimaryInput
      placeholder="Enter your amount"
      style={styles.Input}
      name={amount}
      id={amount}
      value={amount}
      onBlur={handleBlur("amount")}
      onChangeText={handleChange("amount")}
      Label="Amount of money"
      errors={errors.amount}
      touched={touched.amount}
      fontSize={14}
      keyboardType="numeric"

    />
    <Space space={20} />

    <PrimaryInput
      Label="Request message"
      style={styles.Input}
      name={message}
      id={message}
      value={message}
      onBlur={handleBlur("message")}
      onChangeText={handleChange("message")}
      placeholder="Enter your message"
      errors={errors.message}
      touched={touched.message}
      fontSize={14}
    />
    <Space space={20} />
    <SelectCountry
        label={"Country"}
        placeholder={"Your country"}
        name={"country"}
        onBlur={handleBlur("country")}
        setFieldValue={setFieldValue}
        errors={errors.country}
        touched={touched.country}
        onChangeFormattedText={(text) => {
          setFieldValue("country", text);
        }}
      />
      {/* <Space space={20} />
    <PrimaryInput
        Label={"Bank Name"}
        name={"bankName"}
        errors={errors.bankName}
        touched={touched.bankName}
        placeholder={"Select Account"}
        style={styles.Input}
        editable={false}
        icon={DropDownimp}
        openDrawerisReceivers={handlePresentModalSelect}
        value={bankName}
    /> */}
    <Space space={30} />
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
    fontSize: 16,
    //fontFamily: "Roboto-Bold",
    paddingLeft: 2,
  },
});
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
