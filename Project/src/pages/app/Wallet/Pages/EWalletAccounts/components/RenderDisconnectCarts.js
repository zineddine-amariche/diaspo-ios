import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../../components/views/Rectangle";
import HView from "../../../../../../components/views/HView/HView";
import imaPoint from "../../../../../../Assets/Img/Ewallet.png";

import { PaleGreyButton, PrimaryLinearOption } from "../../../../../../components/Buttons";
const RenderDisconnectCarts = ({connect}) => {
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
        <Image source={imaPoint} />
        <PaleGreyButton onPress={connect} width={"40%"} height={40}>connected</PaleGreyButton>
      </HView>
    </Rectangle>
  );
};

export default RenderDisconnectCarts;

const styles = StyleSheet.create({});
