import { StyleSheet } from "react-native";
import React from "react";
import BottomSheetTransfert from "./BottomSheetTransfert";

const CashOut = ({ navigation, navigation: { goBack } }) => {
  return <BottomSheetTransfert goBack={goBack} navigation={navigation} />;
};

export default CashOut;

const styles = StyleSheet.create({});
