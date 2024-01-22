import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const HView = ({ children, spaceBetween,style,width }) => {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: spaceBetween ? "space-between" : "flex-start", },
      ]}
      {...style}
    >
      {children}
    </View>
  );
};

export default HView;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
