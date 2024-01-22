import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HView from "../../../../../components/views/HView/HView";
import { Head, Txt } from "../../../../../components/utils";
import { COLORS } from "../../../../../theme";
import Space from "../../../../../components/Space";
import { PaleGreyButton, WhiteButton } from "../../../../../components/Buttons";
import UseCheckBoxElements from "../../../../../components/checkBox/useCheckBoxElements";

const data = [
  {
    label: "Food & Drink",
    color: COLORS.coral,
  },
  {
    label: "Shopping",
    price: "12,089.50",
    color: COLORS.peachyPink,
  },
  {
    label: "Bills, Services",
    color: COLORS.darkSkyBlue,
  },
  {
    label: "Entertainment",
    color: COLORS.orangeYellow,
  },
  {
    label: "Transfer",
    color: COLORS.coral,
  },

  {
    label: "Other Expenses",
    color: COLORS.coolGrey,
  },
];

const ContentRenders = ({ onPress, navigation }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
          // height: SIZES.height / 4,
        }}
      >
        <Head style={styles.Head}>Add transaction tag</Head>

        <HView spaceBetween style={styles.BoxAddTrans}>
          <View>
            <Txt fontSize={14} color={COLORS.slateGrey}>
              Transfered to <Txt color={COLORS.darkBlueGrey}>Melicia Diya</Txt>{" "}
            </Txt>
            <Space space={4} />
            <Txt color={COLORS.coolGrey} fontSize={12}>
              29 Oct 2022{" "}
            </Txt>
          </View>
          <Txt>- £1,200</Txt>
        </HView>
        <ScrollView>
          <Space space={20} />
          {data.map((i, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => {
                  // console.log('item' , i)
                  // onPress();
                  // navigation.navigate("TopUp", { data: i });
                }}
              >
                <HView spaceBetween style={styles.item}>
                  <HView>
                    <View style={[styles.Point,{backgroundColor:`${i.color}`}]}></View>
                    <Txt fontSize={17} color={COLORS.darkBlueGrey}>
                      {i.label}
                    </Txt>

                  </HView>
                  <UseCheckBoxElements />
                </HView>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Space space={10} />

        <PaleGreyButton onPress={onPress}>cancel</PaleGreyButton>
        <Space space={20} />
      </View>
    </>
  );
};

export default ContentRenders;

const styles = StyleSheet.create({
  Point: {
    height: 12,
    width: 12,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    marginTop: 3,
  },
  item: {
    borderRadius: 8,
    justifyContent: "space-between",
    width: "100%",
    marginTop: 1,
    paddingLeft:20
  },
  Head: {
    alignSelf: "center",
    paddingVertical: 10,
  },
  BoxAddTrans: {
    backgroundColor: COLORS.paleGreyTwo,
    borderRadius: 4,
    paddingHorizontal:20,
    paddingVertical:10
  },
});
