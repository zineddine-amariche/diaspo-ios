import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../../components/views/Rectangle";
import img from "../../../../../../Assets/Img/chrome_Xe3GBwajCV-removebg-preview.png";
import HView from "../../../../../../components/views/HView/HView";
import { PaleGreyButton, PrimaryLinearOption } from "../../../../../../components/Buttons";
const RenterConnectCarte = ({onPress}) => {
  return (
    <Rectangle
      elevation={0.2}
      title={"Wallet Connection"}
      swiper
      style={{
        paddingVertical: 10,
        width: "90%",
        marginTop: 20,
        paddingHorizontal: 10,
      }}
      radius={24}
    >
      <HView spaceBetween>
        <Image source={img} />
        <PaleGreyButton onPress={onPress} width={"40%"} height={40}>connected</PaleGreyButton>
      </HView>
    </Rectangle>
  );
};

export default RenterConnectCarte;

const styles = StyleSheet.create({});
