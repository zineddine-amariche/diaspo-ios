import { StyleSheet } from "react-native";
import React from "react";
import BottomSheetTransfert from "./BottomSheetTransfert";

const Transfers = ({ navigation, navigation: { goBack } }) => {
  return <BottomSheetTransfert goBack={goBack} />;
};

export default Transfers;

const styles = StyleSheet.create({});
