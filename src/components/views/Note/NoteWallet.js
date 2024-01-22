import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageInfo from "../../../Assets/Img/icon24Info.png";
import { Txt } from "../../utils";
import { COLORS } from "../../../theme";

const NoteWallet = () => {
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        width: "90%",
        alignItems: "stretch",
      }}
    >
      <Image source={ImageInfo} style={{ marginRight: 10, marginTop: 5 }} />
      <Txt color={COLORS.slateGrey} fontSize={14}>
        <Txt color={COLORS.black}>Note:</Txt>  Depending on your
        bank, releasing each transaction amount can take up to 30 days. Learn
        more about  <Txt color={COLORS.orangeYellow}>payment authorisations </Txt>.
      </Txt>
    </View>
  );
};

export default NoteWallet;

const styles = StyleSheet.create({});
