import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../theme";
import Space from "../Space";

const Divider = () => {
  return (
    <>
      <Space space={10} />
      <View style={styles.container}></View>
    </>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    height: 2,
    backgroundColor: COLORS.silverTwo,
  },
});
