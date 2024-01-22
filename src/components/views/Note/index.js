import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageInfo from "../../../Assets/Img/icon24Info.png";
import { Txt } from "../../utils";
import { COLORS } from "../../../theme";

const Note = () => {
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        width: "90%",
        alignItems: "stretch",
        marginBottom:1
      }}
    >
      <Image source={ImageInfo} style={{ marginRight: 10, marginTop: 5 }} />
      <Txt color={COLORS.slateGrey} fontSize={14}>
        <Txt color={COLORS.black}>Note:</Txt> Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam.
      </Txt>
    </View>
  );
};

export default Note;

const styles = StyleSheet.create({});
