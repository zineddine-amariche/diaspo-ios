import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../../../theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const RenderHeaderBottomSheet = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback style={styles.panelHeader} onPress={onPress}>
      <View style={styles.buttonContainer2}>
        <View style={styles.panelHandle} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RenderHeaderBottomSheet;

const styles = StyleSheet.create({
  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
  },

  panelHeader: {
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.greyblue,
    marginVertical: 10,
  },
});
