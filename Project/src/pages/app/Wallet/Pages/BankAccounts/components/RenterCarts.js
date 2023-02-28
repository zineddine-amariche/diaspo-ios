import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../../components/views/Rectangle";
import { Txt } from "../../../../../../components/utils";
import HView from "../../../../../../components/views/HView/HView";
import imaPoint from "../../../../../../Assets/Img/icon24More.png";
import { COLORS } from "../../../../../../theme";
import Space from "../../../../../../components/Space";
const RenterCarts = ({ item,onPress }) => {
  return (
    <Rectangle
      elevation={0.2}
      title={"Wallet Connection"}
      swiper
      style={{
        paddingVertical: 20,
        width: "90%",
        marginTop: 20,
        paddingHorizontal: 10,
      }}
      radius={24}
    >
      <HView spaceBetween>
        <Image source={item.source} />
        <TouchableOpacity onPress={onPress} style={{ position: "absolute", top: 10, right: 20 }}>
          <Image source={imaPoint} />
        </TouchableOpacity>
      </HView>
      <View style={styles.points} >
        <Txt color={COLORS.coolGrey}>Account Number</Txt>
        <Txt lineHeight={30}  color={COLORS.darkBlueGrey} fontSize={24}>{item.nameNumber}</Txt>
      </View>
    </Rectangle>
  );
};

export default RenterCarts;

const styles = StyleSheet.create({
  points: {
  marginTop:20,
   paddingLeft:20
  },
});
