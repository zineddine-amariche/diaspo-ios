import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Txt } from "../../../../../../../components/utils";
import HView from "../../../../../../../components/views/HView/HView";
import { COLORS } from "../../../../../../../theme";
import { Image } from "react-native";

import imgs from "../../../../../../../Assets/Img/default.png";
import Line from "../../../../../../../components/views/line";
import { RadioButton } from "react-native-paper";
import { useState } from "react";
import RadioInput from "../../../../../../../components/radionButton";
import Space from "../../../../../../../components/Space";

const RenderItemsWalletConnection = ({
  lenght,
  index,
  T1,
  T2,
  T3,
  Price,
  date,
  source,
  item,
  navigation,
  checked,
  ChangeCheck,
}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor:COLORS.paleGrey,
          marginTop: 8,
          padding:10,
          borderRadius:8

        }}
        onPress={() => {
          // console.log("item ", item.T2);
          // navigation.navigate(item.to)
          ChangeCheck(item.T2);
        }}
      >
        <HView
          spaceBetween
          style={{
            justifyContent: "space-between",
          }}
        >
          <HView
            style={{
              borderRadius: 6,
              marginVertical: 5,
            }}
          >
            <Image source={source} style={{ marginRight: 10 }} />
            <View style={{}}>
              <Txt
                fontSize={16}
                //fontFamily={"Poppins-SemiBold"}
                color={COLORS.darkBlueGrey}
              >
                {T2}
              </Txt>
            </View>
          </HView>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RadioInput
              onPress={() => {
                ChangeCheck(item.T2);
              }}
              disable={false}
              checked={checked == item.T2 ? true : false}
            />
          </View>
        </HView>
      </TouchableOpacity>
      {/* {lenght - 1 !== index ? (
        <Line height={1} color={COLORS.silverTwo} width={"80%"} />
      ) : null} */}
    </>
  );
};

export default RenderItemsWalletConnection;

const styles = StyleSheet.create({
  item: {
    justifyContent: "space-between",
  },
});
