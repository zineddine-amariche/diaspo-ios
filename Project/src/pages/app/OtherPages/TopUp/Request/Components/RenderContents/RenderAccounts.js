import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import HView from "../../../../../../../components/views/HView/HView";
import { Head, Txt } from "../../../../../../../components/utils";
import { COLORS } from "../../../../../../../theme";
import Space from "../../../../../../../components/Space";
import { WhiteButton } from "../../../../../../../components/Buttons";
import { useSelector } from "react-redux";

const data = [
  {
    id: 1,
    label: "DIASPO ACCOUNT",
    value: "2nd FX",
    price: "12,089.50",
    currency: "USD",
  },
  {
    id: 0,
    label: "TONTINE ACCOUNT",
    value: "Main Account",
    price: "32,589.50",
    currency: "euro",
  },
];

const ContentRenders = ({ onPress, ChangeAccount }) => {
  const { walletAccount } = useSelector((state) => state.walletAccounts);

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
        }}
      >
        <Head style={styles.Head}>Select Account</Head>
        <ScrollView>
          {walletAccount?.walletAccounts.map((i, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => {
                  ChangeAccount(i);
                }}
              >
                <HView spaceBetween style={styles.item}>
                  <View>
                    <HView>
                      <View style={styles.Point}></View>
                      <Txt fontSize={17} color={COLORS.orangeYellow}>
                        {i.name}
                      </Txt>
                    </HView>
                    <HView>
                      <Txt
                        color={COLORS.blueGreen}
                        style={{ lineHeight: 40, fontSize: 32 }}
                      >
                        {i.balance}{" "}
                      </Txt>
                      <Txt
                        color={COLORS.greyblue}
                        style={{ lineHeight: 24, fontSize: 16 }}
                      >
                        {"euro"}
                      </Txt>
                    </HView>
                  </View>
                </HView>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <WhiteButton onPress={onPress}>cancel</WhiteButton>
        <Space space={90} />
      </View>
    </>
  );
};

export default ContentRenders;

const styles = StyleSheet.create({
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.orangeYellow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 3,
  },
  item: {
    backgroundColor: COLORS.paleGreyTwo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    height: 80,
    justifyContent: "space-between",
    width: "100%",
  },
  Head: {
    alignSelf: "center",
    paddingVertical: 10,
  },
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.orangeYellow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 3,
  },
  item: {
    backgroundColor: COLORS.paleGreyTwo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    height: 80,
  },
});
