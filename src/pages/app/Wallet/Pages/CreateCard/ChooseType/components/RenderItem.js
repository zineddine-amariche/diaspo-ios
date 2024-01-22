import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import HView from "../../../../../../../components/views/HView/HView";
import { Txt } from "../../../../../../../components/utils";
import Rectangle from "../../../../../../../components/views/Rectangle";
import Space from "../../../../../../../components/Space";
import { COLORS } from "../../../../../../../theme";
import img from "../../../../../../../Assets/Img/default.png";
import { TouchableOpacity } from "react-native";
const data = [
  {
    date: "2 cards connected",
    T2: "Melicia Diya",
    T1: "GooglePay",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../../Assets/Img/cardLogo2-removebg-preview.png"),
  },
  {
    date: "29 Jan 2020",
    T2: "Fatima Cleaning Service",
    T1: "ApplePay",
    Price: "+ £1,200",
    status: "charged",
    url: require("../../../../../../../Assets/Img/apple-pay-icon-28-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank Accounts",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../../Assets/Img/cardLogoCopy.png"),
  },
];

const RenderItem = ({navigation}) => {
  return (
    <Rectangle elevation={0.2} style={{ paddingVertical: 10, width: "90%" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space />
        <HView spaceBetween style={{ alignItems: "center" }}>
          <Txt
            color={COLORS.blueGreen}
            fontSize={17}
          //  fontFamily="Poppins-Bold"
            style={{ marginTop: 3 }}
          >
            {"Supported card types"}
          </Txt>
        </HView>
        <Space />

        {data.map((i, index) => {
          return (
            <View key={index}>
              <Item navigation={navigation} item={i} />
            </View>
          );
        })}
      </View>
      <Space />
    </Rectangle>
  );
};

export default RenderItem;

const Item = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CardFormInfo");
      }}
    >
      <HView
        spaceBetween
        style={{
          backgroundColor: COLORS.paleGreyTwo,
          paddingHorizontal: 10,
          paddingVertical: 20,
          borderRadius: 6,
          marginVertical: 5,
        }}
      >
        <View
          style={{ width: "73%", flexDirection: "row", alignItems: "center" }}
        >
          <Image source={item.url} style={{ marginRight: 20 }} />
          <Txt fontSize={14} color={COLORS.darkBlueGrey}>
            {item.T1}
          </Txt>
        </View>
        <View>
          <Image source={img} />
        </View>
      </HView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
