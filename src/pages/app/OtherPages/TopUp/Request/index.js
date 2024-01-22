import { StyleSheet } from "react-native";
import React from "react";
import BottomSheetRequest from "./BottomSheetRequest";

const Request = ({ navigation, navigation: { goBack } }) => {
  return <BottomSheetRequest goBack={goBack} navigation={navigation} />;
};

export default Request;

const styles = StyleSheet.create({});
