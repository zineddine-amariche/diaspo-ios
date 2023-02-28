import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AnalysisImg from "../../../../../../../../Assets/Img/analysisImg.png";
import { COLORS } from "../../../../../../../../theme";
import { Txt } from "../../../../../../../../components/utils";
import HView from "../../../../../../../../components/views/HView/HView";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Space from "../../../../../../../../components/Space";
import Plans from "../../../../Plans";

const Route1 = ({ handlePresentModalPress }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.paleGrey,
        flex: 1,
      }}
    >
      <Space space={20} />
      <Plans
        onOpen={handlePresentModalPress}
        title={"Food & Drink"}
        status={"On track"}
      />
      <Space space={10} />
      <Plans
        onOpen={handlePresentModalPress}
        title={"Bills, Services"}
        status={"Over expense"}
      />
      <Space space={10} />
      <Plans
        onOpen={handlePresentModalPress}
        title={"Shopping"}
        status={"Warning"}
      />
      <Space space={10} />
      <Plans
        onOpen={handlePresentModalPress}
        title={"Passive Income"}
        status={"On track"}
      />
    </View>
  );
};

export default Route1;

const styles = StyleSheet.create({});
