import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import notification from "../../../Assets/Img/icon24BellDefault.png";
import search from "../../../Assets/Img/icon24SearchDefault.png";
import next from "../../../Assets/Img/icon24ChevronRightDefault(2).png";
import HView from "../../views/HView/HView";
import { COLORS } from "../../../theme";
import { Head, Txt } from "../../utils";
import Space from "../../Space";
const WalletHead = ({ openDrawer, Analysis, title, Navigate, soustitre }) => {
  return (
    <View style={styles.header}>
      <HView style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={openDrawer}>
          <View
            style={{ height: 4, width: 25, backgroundColor: COLORS.white }}
          ></View>
          <View
            style={{ height: 4, width: 25, backgroundColor: COLORS.white }}
          ></View>
        </TouchableOpacity>

        <Head color={COLORS.white} fontSize={24}>
          {title}
        </Head>
      </HView>

      <HView>
        <View style={styles.active}></View>
        <View style={styles.inActive}></View>
        <View style={styles.inActive}></View>
        <View style={styles.inActive}></View>
      </HView>
    </View>
  );
};

export default WalletHead;

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingLeft: 25,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    alignItems: "center",
    height: 30,
    justifyContent: "space-evenly",
    paddingRight: 15,
  },
  active: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: COLORS.paleGreyTwo,
    borderRadius:20,
    marginRight:6
  },
  inActive: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: COLORS.greyblue,
    borderRadius:20,
    marginRight:6,
    backgroundColor:COLORS.greyblue

  },
});
