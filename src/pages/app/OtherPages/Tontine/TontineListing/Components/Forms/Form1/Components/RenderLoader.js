import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";

const RenderLoader = ({ Loading }) => {
  return Loading ? (
    <View style={styles.loaderStyle}>
      <ActivityIndicator size="large" color="#aaa" />
    </View>
  ) : null;
};

export default RenderLoader;

const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
