import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../theme";

const ViewT2 = ({ children, elevation }) => {
  return (
    <View
      style={[styles.container, { elevation: elevation === 0 ? elevation : 3 }]}
    >
      {children}
    </View>
  );
};

export default ViewT2;

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
    width: "100%",
    alignSelf: "center",
    marginBottom: 5,
  },
});
