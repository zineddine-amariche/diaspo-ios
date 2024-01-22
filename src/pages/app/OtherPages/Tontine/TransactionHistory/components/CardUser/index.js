import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../../components/utils";
import { COLORS } from "../../../../../../../theme";

import Rectangle from "../../../../../../../components/views/Rectangle";

const CardUserHistory = ({ item , index }) => {
  return (
    <TouchableOpacity activeOpacity={.9} >
      <Rectangle style={styles.Container}>
        {/* <Image source={thumbnailPath} style={styles.Img} resizeMode="contain" /> */}
        <View style={{ width: "40%" }}>
          <Head fontSize={14} color={COLORS.darkBlueGrey} numberOfLines={1}>
            {item.displayName}
          </Head>

          <Txt fontSize={12} color={COLORS.coolGrey}>
            {item?.phoneNumbers[0]?.number}
          </Txt>
        </View>
        <View>
          <Txt fontSize={17} color={index === 5 ||  index === 9  ? COLORS.coral : COLORS.blueGreen} > + £250</Txt>
        </View>
      </Rectangle>
    </TouchableOpacity>
  );
};

export default CardUserHistory;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    width:"100%", 
    padding:15,
    justifyContent:'space-between'
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
    marginRight: 20,
  },
});
