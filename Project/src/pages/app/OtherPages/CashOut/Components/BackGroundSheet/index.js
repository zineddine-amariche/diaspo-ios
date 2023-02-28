import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../../../theme";
import LinearGradient from "react-native-linear-gradient";

const BackgroundSheet = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback
    onPress={onPress}
    >
      <LinearGradient
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[COLORS.dirtyBlue, COLORS.lightNavy]}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 10,
          opacity: 0.8,
        }}
      ></LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default BackgroundSheet;

const styles = StyleSheet.create({
  // ...StyleSheet.absoluteFillObject,

});
