import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HView from "../HView/HView";
import { COLORS } from "../../../theme";
import { Txt } from "../../utils";

const RectangleWalltetItem = ({ T1, T2, T3, Price, date }) => {
  return (
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
      <View style={{ width: "70%" }}>
        <HView>
          <Txt numberOfLines={1} color={COLORS.slateGrey}>
            {T1} <Txt color={COLORS.dark}>{T2}</Txt>
          </Txt>
        </HView>
        <View>
          {T3 && <Txt color={COLORS.dark}>Service</Txt>}
          <Txt color={COLORS.coolGrey}>{date}</Txt>
        </View>
      </View>
      <View>
        <Txt
          fontSize={17}
          color={T3 === "" ? COLORS.peachyPink : COLORS.greenishTeal}
          Bold="700"
        >
          {Price}
        </Txt>
      </View>
    </HView>
  );
};

export default RectangleWalltetItem;

const styles = StyleSheet.create({});
