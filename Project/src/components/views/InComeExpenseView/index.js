import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HView from "../HView/HView";
import { Txt } from "../../utils";
import { COLORS } from "../../../theme";

const IncomeExpenses = ({ lable, price, color, currency }) => {
  return (
    <View>
      <HView>
        <View
          style={[
            styles.Point,
            {
              backgroundColor: color ? COLORS.greenishTeal : COLORS.peachyPink,
            },
          ]}
        ></View>
        <Txt>{lable}</Txt>
      </HView>
      <Txt
        fontSize={17}
        color={color ? COLORS.greenishTeal : COLORS.peachyPink}
      >
        {price}{' '}
        <Txt fontSize={11} color={COLORS.coolGrey}>
          {currency}
        </Txt>
      </Txt>
    </View>
  );
};

export default IncomeExpenses;

const styles = StyleSheet.create({
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 3,
  },
});
