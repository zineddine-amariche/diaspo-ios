import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../../theme";

const Line = ({ color, height, style , width}) => {
  return (
    <View {...style} style={[styles.line]}>
      <View
        style={{
          backgroundColor: color ? color : COLORS.Vert0,
          height: height ? height : 3,
          width: width ? width :"30%",
          borderRadius: 4,
        }}
      ></View>
    </View>
  );
};

export default Line;

const styles = StyleSheet.create({
  line: {
    width: SIZES.width,
    alignSelf: "center",
    height: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
