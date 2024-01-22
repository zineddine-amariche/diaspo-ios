import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../theme";

const SimpleView = ({ children, elevation ,width}) => {
  return (
    <View

      style={[styles.container, { elevation: elevation === 0 ? elevation : 3 ,    width:width?width: "93%" }]}
    >
      {children}
    </View>
  );
};

export default SimpleView;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignSelf: "center",
    marginBottom: 5,
    paddingHorizontal: 1,
    alignSelf: "center",
    borderRadius:8, 
  },
});
