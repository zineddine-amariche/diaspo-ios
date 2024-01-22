import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SmTxt, Txt } from "../utils";
import { COLORS } from "../../theme";

const Spiner = () => {
  return (
    <View style={styles.Uper}>
      <View style={styles.container}>
        <ActivityIndicator
          color={COLORS.Vert1}
          size={30}
          style={styles.ActivityIndicator}
        />
        <Txt color={COLORS.black}>Loading</Txt>
        <SmTxt color={COLORS.gray}>Please wait ...</SmTxt>
      </View>
    </View>
  );
};

export default Spiner;

const styles = StyleSheet.create({
  Uper: {
    flex: 1,
    backgroundColor: COLORS.paleGrey,
    justifyContent: "center",
    position: "absolute",
    left:0,
    right:0,
    top:0,
    bottom:0,
  },
  container: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    width: "40%",
    alignSelf: "center",
    paddingVertical: 35,
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  ActivityIndicator: {
    padding: 20,
  },
});
