import React, { Component } from "react";
import { CheckBox } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../theme";


const RadioInput = ({ onPress, checked ,disable }) => {
    return (
      <CheckBox
        checked={checked}
        containerStyle={{
          alignSelf: "flex-start",
          margin: 0,
          padding: 0,
          borderWidth: 0,

        }}
        checkedIcon={
          <Ionicons name="checkmark-circle" size={24} color={disable ? COLORS.silver:COLORS.green} />
        }
        uncheckedIcon={
          <Ionicons
            name="ios-radio-button-off-outline"
            size={24}
            color={disable ? COLORS.silver:  COLORS.green}
          />
        }
        onPress={onPress}
      />
    );
  };

  export default RadioInput