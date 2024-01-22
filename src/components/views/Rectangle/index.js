import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../../theme";

const Rectangle = ({ children, style, width,   elevation,radius }) => {
  return (
    <View
      style={[
        styles.container,
        {
          width,
          elevation: elevation ? elevation : 3,
          borderRadius:radius? radius : 8
        },
      ]}
      {...style}
    >
    <View style={{width:"100%" , flex:1}}>

      {children}
    </View>
    </View>
  );
};

export default Rectangle;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    overflow:'hidden'
  },
});
