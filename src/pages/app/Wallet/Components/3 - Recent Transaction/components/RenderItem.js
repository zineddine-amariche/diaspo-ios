import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Txt } from "../../../../../../components/utils";
import { COLORS } from "../../../../../../theme";
import HView from "../../../../../../components/views/HView/HView";

const Item = ({ T1, T2, T3, Price, date ,status}) => {
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
      <View style={{ width: "73%" }}>
        <HView>
          <Txt fontSize={14} numberOfLines={1} color={COLORS.slateGrey}>
            {T1} <Txt color={COLORS.dark}>{T2}</Txt>
          </Txt>
        </HView>
        <View>
          {status !== "transfer" && <Txt color={COLORS.dark}>Service</Txt>}
          <Txt fontSize={12} color={COLORS.coolGrey}>{date}</Txt>
        </View>
      </View>
      <View>
        <Txt
          fontSize={17}
          color={status !== "transfer" ? COLORS.peachyPink : COLORS.greenishTeal}
          Bold="700"
        >
          {Price}
        </Txt>
      </View>
    </HView>
  );
};

export default Item;

const styles = StyleSheet.create({});
