import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PrimaryInput from "../../../../../../../../components/Input";
import { COLORS } from "../../../../../../../../theme";

const Form2 = () => {

    const [amount, setAmount] = useState(null);
    const [errors, setErrors] = useState(null);
    const [touched, setTouched] = useState(false);
  return (
    <View style={styles.container}   >
      <PrimaryInput
        placeholder="Enter your card"
        style={styles.Input}
        name={amount}
        id={amount}
        value={amount}
        // onBlur={handleBlur("amount")}
        // onChangeText={handleChange("amount")}
        Label="Code"
        errors={errors}
        touched={touched}
        fontSize={14}
      />
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({
    container:{
        marginHorizontal:20
    },
    Input: {
        color: COLORS.black,
        fontSize: 16,
        //fontFamily: "Roboto-Bold",
        paddingLeft: 2,
      },
});
