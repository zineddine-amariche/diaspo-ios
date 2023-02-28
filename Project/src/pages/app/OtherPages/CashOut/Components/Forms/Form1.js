
import { StyleSheet } from "react-native";
import React from "react";
import PrimaryInput from "../../../../../../components/Input";
import Space from "../../../../../../components/Space";
import { COLORS } from "../../../../../../theme";
import ImgIcon from "../../../../../../Assets/Img/icon24Scan.png";
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
  handleBlur,
  handleChange,
  navigation
  
}) => {
  const { amount2, agency2 } = values;
  return (
    <>
      <>
        <Space space={10} />
        <PrimaryInput
          name={amount2}
          Label={"Amount of money"}
          placeholder="1200.760"
          style={styles.Input}
          errors={errors.amount2}
          touched={touched.amount2}
          value={amount2}
          onBlur={handleBlur("amount2")}
          onChangeText={handleChange("amount2")}
          amount="euro"
          keyboardType="numeric"
          placeholderTextColor={COLORS.darkBlueGrey}
        />

        <Space space={20} />

        <PrimaryInput
          name={agency2}
          Label={"Agency"}
          placeholder="Enter phone no. or scan"
          style={styles.Input}
          errors={errors.agency2}
          touched={touched.agency2}
          value={agency2}
          onBlur={handleBlur("agency2")}
          onChangeText={handleChange("agency2")}
          icon={ImgIcon}
          fontSize={14}
          openDrawerisReceivers={()=>{
            navigation.navigate('Scann')
          }}
        />
        <Space space={20} />
      </>
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
    // //fontFamily: "Roboto-Bold",
    paddingLeft: 2,
  },
});
