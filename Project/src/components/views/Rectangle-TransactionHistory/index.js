import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HView from "../HView/HView";
import { COLORS } from "../../../theme";
import { Txt } from "../../utils";
import Imgshow from "../../../Assets/Img/Transaction/icon24DropdownIMG.png";
import Space from "../../Space";
import { useState } from "react";

const RectangleTransactionHistory = ({
  title,
  onPress,
  Change,
  price,
  item,
}) => {
  const [selcted, setSelcted] = useState(0);

  const onSelcet = (item) => {
    setSelcted(item);
  };
  return (
    <View style={styles.container}>
      <HView spaceBetween>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View
            style={{
              width: "50%",
              alignItems: "center",
            }}
          >
            <Txt fontSize={14}>From date</Txt>
            <HView>
              <Txt
                fontSize={14}
                color={COLORS.darkBlueGrey}
                style={{ marginRight: 10 }}
              >
                1 March 2020
              </Txt>
              <Image source={Imgshow} />
            </HView>
          </View>
          <View
            style={{ height: 44, width: 1, backgroundColor: COLORS.silverTwo }}
          />
          <View
            style={{
              width: "50%",
              alignItems: "center",
            }}
          >
            <Txt fontSize={14}>From date</Txt>
            <HView>
              <Txt
                fontSize={14}
                color={COLORS.darkBlueGrey}
                style={{ marginRight: 10 }}
              >
                1 March 2020
              </Txt>
              <Image source={Imgshow} />
            </HView>
          </View>
        </View>
      </HView>
      <Space />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          style={{
            width: 90,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            borderBottomWidth: 3,
            borderBottomColor: selcted === 0 ? COLORS.blueGreen : COLORS.white,
          }}
          onPress={() => {
            onSelcet(0);
          }}
        >
          <Txt>All</Txt>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 90,
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 3,
            borderBottomColor: selcted === 1 ? COLORS.blueGreen : COLORS.white,
          }}
          onPress={() => {
            onSelcet(1);
          }}
        >
          <Txt>Cash In</Txt>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 90,
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 3,
            borderBottomColor: selcted === 2 ? COLORS.blueGreen : COLORS.white,
          }}
          onPress={() => {
            onSelcet(2);
          }}
        >
          <Txt>Cash Out</Txt>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RectangleTransactionHistory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 20,
    zIndex: -1,
    width: "92%",
    alignSelf: "center",
  },
});
