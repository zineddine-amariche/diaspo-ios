import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import HView from "../../../../../../components/views/HView/HView";
import { Txt } from "../../../../../../components/utils";
import Space from "../../../../../../components/Space";
import { COLORS, SIZES } from "../../../../../../theme";
import { TouchableOpacity } from "react-native";
const data = [
  {
    date: "2 cards connected",
    T2: "Bank",
    T1: "Allergan",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../Assets/Img/logo1.png"),
  },
  {
    date: "29 Jan 2020",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "charged",
    url: require("../../../../../../Assets/Img/choosebank/chrome_BLj2Oxgh7n-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../Assets/Img/choosebank/chrome_JEaWZYBdBG-removebg-preview.png"),
  }
  ,
  {
    date: "29 Jan 2020",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "charged",
    url: require("../../../../../../Assets/Img/choosebank/chrome_LA9ZlGVU77-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../Assets/Img/choosebank/chrome_MauPFLccey-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../Assets/Img/choosebank/chrome_BLj2Oxgh7n-removebg-preview.png"),
  },
  ,
  {
    date: "29 Jan 2020",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "charged",
    url: require("../../../../../../Assets/Img/choosebank/chrome_QE5PYOoxuO-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../Assets/Img/choosebank/chrome_BLj2Oxgh7n-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../Assets/Img/choosebank/chrome_LA9ZlGVU77-removebg-preview.png"),
  },
  ,
  {
    date: "29 Jan 2020",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "charged",
    url: require("../../../../../../Assets/Img/choosebank/chrome_XrndtV2TOZ-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank ",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../Assets/Img/choosebank/chrome_BLj2Oxgh7n-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../Assets/Img/choosebank/chrome_XrndtV2TOZ-removebg-preview.png"),
  },
];

const RenderItem = ({ navigation,onSuccess }) => {
  return (
    <View elevation={0.2} style={{ paddingVertical: 10, width: "90%" }}>
      <View style={{}}>
        <Space />
        <HView spaceBetween style={{ alignItems: "center" }}></HView>
        <Space />

        <View
          style={{
            width: "100%",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent:'space-evenly'
          }}
        >
          {data.map((i, index) => {
            return (
              <View key={index}>
                <Item navigation={navigation} item={i} onSuccess={onSuccess} />
              </View>
            );
          })}
        </View>
      </View>
      <Space />
    </View>
  );
};

export default RenderItem;

const Item = ({ navigation, item ,onSuccess}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSuccess()
      }}
      style={{
        width: (SIZES.width -70) / 3,
        alignItems:'center',
      }}
    >
      <HView
        spaceBetween
        style={{
          backgroundColor:COLORS.white,
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderRadius: 6,
          marginVertical: 5,
        }}
      >
        <View style={{}}>
          <Image source={item.url} style={{width:70 , height:35  }} resizeMode='contain' />
          <Space/>
          <Txt fontSize={14}  style={{textAlign:'center'}} Bold='700' color={COLORS.darkBlueGrey}>
            {item.T1}
          </Txt>
          <Txt fontSize={14} style={{textAlign:'center'}}  color={COLORS.darkBlueGrey}>{item.T2}</Txt>
        </View>
      </HView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
