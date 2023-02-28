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
import {
  PaleGreyButton,
  PrimaryButton,
  WhiteButton,
} from "../../../../../components/Buttons";
import { ButtonGroup } from "react-native-elements";

const data = [
  {
    id: 0,
    label: "Main Account",
    value: "Main Account",
    price: "32,589.50",
    currency: "euro",
  },
  {
    id: 1,
    label: "2nd FX",
    value: "2nd FX",
    price: "12,089.50",
    currency: "USD",
  },
  {
    id: 2,
    label: "2rd FX",
    value: "2rd FX",
    price: "32,099.50",
    currency: "AUD",
  },
];

const ContentRenders = ({ onPress, navigation, closeBottomUp2, onPress2 ,closeBottomUp1}) => {
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
          // height: SIZES.height / 4,
        }}
      >
        <Head style={styles.Head}>Select cash-in type</Head>
        <ScrollView>
          <Space space={20} />
          <PrimaryButton
            marginVertical={5}
            onPress={() => {
              navigation.navigate("Request");
              closeBottomUp2();
              // closeBottomUp1()
            }}
          >
            DIASPO ACCOUNT REQUEST
          </PrimaryButton>
          <PrimaryButton
            marginVertical={5}
            onPress={() => {
              // closeBottomUp2();
              closeBottomUp1()
              onPress2();
            }}
          >
            TOP UP
          </PrimaryButton>
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
});
