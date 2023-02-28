import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ToggleSwitch from "toggle-switch-react-native";
import Space from "../Space";
import { COLORS } from "../../theme";

const Switch = ({ label, onPress,state ,Switchs}) => {

  console.log('state', state)
  return (
    <View style={{ width: "100%" }}>
      <ToggleSwitch
        isOn={state}
        onColor={COLORS.green}
        offColor={COLORS.coolGrey}
        label={label}
        labelStyle={{
          color: "black",
          fontWeight: "900",
          fontSize: 16,
          justifyContent: "space-between",
          flex:1
        }}
        size="medium"
        onToggle={(isOn) =>{ 
          Switchs()
        }}
      />
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({});
