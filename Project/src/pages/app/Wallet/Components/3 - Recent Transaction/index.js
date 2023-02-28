import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../components/views/Rectangle";
import { COLORS } from "../../../../../theme";
import { Txt } from "../../../../../components/utils";
import Space from "../../../../../components/Space";
import HView from "../../../../../components/views/HView/HView";
import { PrimaryButton } from "../../../../../components/Buttons";
import Item from "./components/RenderItem";

const data = [
  {
    date: "2 cards connected",
    T2: "Melicia Diya",
    T1: "Transfered to",
    Price: "+ £1,200",
    status: "transfer",
  },
  {
    date: "29 Jan 2022",
    T2: "Fatima Cleaning Service",
    T1: "Charged to",
    Price: "+ £1,200",
    status: "charged",
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank Accounts",
    T1: "Transfered to",
    Price: "+ £1,200",
    status: "transfer",
  },
];
const RecentTransaction = ({ navigation }) => {
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
            {"Recent Transactions"}
          </Txt>
        </HView>
        <Space />

        {data.map((i, index) => {
          return (
            <View key={index}>
              <Item
                T1={i.T1}
                T2={i.T2}
                status={i.status}
                date={i.date}
                Price={i.Price}
              />
            </View>
          );
        })}
      </View>
      <Space space={20} />
      <View
        style={{
          width: "40%",
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.active}></View>
        <View style={styles.inActive}></View>
        <View style={styles.inActive}></View>
      </View>

      <PrimaryButton
        width={"90%"}
        style={{ alignSelf: "center" }}
        textTransform="uppercase"
        onPress={() => {
          navigation.navigate("HistoryTransaction");
        }}
      >
        View Transaction History
      </PrimaryButton>
    </Rectangle>
  );
};

export default RecentTransaction;

const styles = StyleSheet.create({
  slide1: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  slide2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  slide3: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  wrapper: {
    height: 280,
  },
  active: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: COLORS.blueGreen,
    borderRadius: 20,
    marginRight: 6,
  },
  inActive: {
    width: 8,
    height: 8,
    borderRadius: 20,
    marginRight: 6,
    backgroundColor: COLORS.greyblue,
  },
});
// <Rectangle
//   title={"LAST DISCOUNTS"}
//   sousTitre={" (coming soon)"}
//   style={{ paddingVertical: 10 }}
// >
{
  /* <Image source={banner} />
   */
}
{
  /* </Rectangle> */
}
