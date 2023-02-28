import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../components/views/Rectangle-Home";
import RectangleItem from "../../../../../components/views/Rectangle-Home-Item";
import Space from "../../../../../components/Space";
import { useTranslation } from "react-i18next";

const Recent = ({ onPress }) => {
  const { t, i18n } = useTranslation();

  return (
    <Rectangle title={t("Home.recent_box.title")} onPress={onPress}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space />
        <RectangleItem
          T1={"Transfered to"}
          T2={"Melicia Diya"}
          T3={""}
          date={"29 Nov 2022"}
          Price={"+ £1,200"}
        />
        <RectangleItem
          T1={"Charged for "}
          T2={"Melicia Diya"}
          T3={"chargerd"}
          date={"29 Oct 2022"}
          Price={"+ £1,300"}
        />
      </View>
    </Rectangle>
  );
};

export default Recent;

const styles = StyleSheet.create({});
