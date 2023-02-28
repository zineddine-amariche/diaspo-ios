import { Pressable, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import check2 from "../../Assets/Img/verified.png";
import notverified from "../../Assets/Img/notverified.png";

import { COLORS } from "../../theme";
import { Txt } from "../utils";
const CircleCheckBox = ({
  checked,
  onPress,
  title,
  style,
  size,
  borderWidth,
  fontSize
  
}) => {
  return (
    <View style={styles.container} {...style}>
      {checked ? (
        <TouchableOpacity onPress={onPress}
        style={styles.box}>
        
            <Image source={check2}   />
      
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}
        style={styles.box}
        >
        <Image source={notverified}   />
{/* 
        <View
          style={{
            height: size || 15,
            width: size || 15,
            backgroundColor: "#eee",
            borderWidth: borderWidth || 1.5,
            borderColor: COLORS.greyblue,
            margin:6,
          }}
        /> */}
        </TouchableOpacity>

      )}

      <Txt color={COLORS.darkBlueGrey} style={styles.title} fontSize={fontSize?fontSize:14}>
        {title}
      </Txt>
    </View>
  );
};

export default CircleCheckBox;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    marginLeft: 10,
  },
  box:{
    width:20,
    height:20,
    alignItems:"center",
    justifyContent:'center'
  }
});
