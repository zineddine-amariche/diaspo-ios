import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageInfo from "../../../Assets/Img/icon24Info.png";
import { Txt } from "../../utils";
import { COLORS } from "../../../theme";

const NoteBank = () => {
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        width: "90%",
        alignItems: "stretch",
      }}
    >

      <Txt color={COLORS.slateGrey} fontSize={14}>
        Diaspo has connected various popular banks in our system. Follow  <Txt color={COLORS.orangeYellow}>our
        instruction  </Txt> to start to connect your bank account.
      </Txt>
    </View>
  );
};

export default NoteBank;

const styles = StyleSheet.create({});
