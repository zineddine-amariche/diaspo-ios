import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../components/views/Rectangle";
import Space from "../../../../../components/Space";
import { Txt } from "../../../../../components/utils";
import { COLORS } from "../../../../../theme";
import RenderItemsWalletConnection from "./components/RenderItems";
import Credit from "../../../../../Assets/Img/creditCards.png";
import Bank from "../../../../../Assets/Img/bankAccounts.png";
import EWallet from "../../../../../Assets/Img/icon24Wallet.png";

const data = [
  {
    date: "2 cards connected",
    T2: "Credit / Debit Cards",
    source: Credit,
    to: "CreditsCards",
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank Accounts",
    source: Bank,
    to: "BankAccounts",
  },
  {
    date: "1 e-wallet account connected",
    T2: "E-Wallet Accounts",
    source: EWallet,
    to: "EWalletAccounts",
  },
];
const WalletConnection = ({ navigation }) => {
  return (
    <Rectangle
      elevation={0.2}
      title={"Wallet Connection"}
      swiper
      style={{ paddingVertical: 10, width: "90%" }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Space />
        <Txt
          color={COLORS.blueGreen}
          fontSize={17}
        //  fontFamily="Poppins-Bold"
          style={{ paddingBottom: 10 }}
        >
          {"Wallet Connection"}
        </Txt>

        {data.map((i, index) => {
          return (
            <View key={index}>
              <RenderItemsWalletConnection
                T2={i.T2}
                date={i.date}
                source={i.source}
                index={index}
                lenght={data?.length}
                item={i}
                navigation={navigation}
              />
            </View>
          );
        })}
        {/* 
        <RenderItemsWalletConnection
          T2={"Melicia Diya"}
          T3={"chargerd"}
          date={"5 bank accounts connected"}
          Price={"+ £1,300"}
          source={Bank}
        />

        <RenderItemsWalletConnection
          T1={"Charged for "}
          T2={"Melicia Diya"}
          T3={"chargerd"}
          date={"29 Jan 2020"}
          Price={"+ £1,300"}
          source={EWallet}
        /> */}
      </View>
    </Rectangle>
  );
};

export default WalletConnection;

const styles = StyleSheet.create({});
