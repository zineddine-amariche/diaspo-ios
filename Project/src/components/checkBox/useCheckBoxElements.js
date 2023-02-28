import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CheckBox, Icon } from "@rneui/themed";
import { COLORS } from "../../theme";
import { Image } from "react-native";

const UseCheckBoxElements = ({ isCheck, onPress }) => {
  return (
    <CheckBox
      checkedIcon={<Image  source={require("../../Assets/Img/verified.png")} />}
      uncheckedIcon={<Image  source={require("../../Assets/Img/notverified.png")} />}
      checked={isCheck}
      disabled
      onPress={onPress}



    />
  );
};

export default UseCheckBoxElements;

const styles = StyleSheet.create({});
