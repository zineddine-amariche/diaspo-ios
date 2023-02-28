import { Pressable, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import check2 from "../../Assets/Img/icon24Checked.png";

import { COLORS } from "../../theme";
import { Txt } from "../utils";
const SquareCheckBox = ({
  checked,
  onPress,
  title,
  style,
  size,
  borderWidth,
  fontSize
  
}) => {
  return (
    <TouchableOpacity style={styles.container} {...style} onPress={onPress}>
      {checked ? (
        <TouchableOpacity onPress={onPress}
        style={styles.box}>
        
            <Image source={check2}   />
      
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}
        style={styles.box}
        >

        <View
          style={{
            height: size || 15,
            width: size || 15,
            backgroundColor: "#eee",
            borderWidth: borderWidth || 1.5,
            borderColor: COLORS.greyblue,
            margin:6,
          }}
        />
        </TouchableOpacity>

      )}

      <Txt color={COLORS.darkBlueGrey} style={styles.title} lineHeight={35}  fontSize={fontSize?fontSize:14}>
        {title}
      </Txt>
    </TouchableOpacity>
  );
};

export default SquareCheckBox;

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
