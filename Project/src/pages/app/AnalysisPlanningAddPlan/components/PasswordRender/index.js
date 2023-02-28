import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Txt } from "../../../../../components/utils";
import Space from "../../../../../components/Space";
import HView from "../../../../../components/views/HView/HView";
import UseCheckBoxElements from "../../../../../components/checkBox/useCheckBoxElements";
import { COLORS } from "../../../../../theme";
import { PaleGreyButton, WhiteButton } from "../../../../../components/Buttons";
const data = [
  {
    name: "This week",
    date: "04 Sep, 2022 - 10 Nov, 2022",
  },
  {
    name: "This month",
    date: " 04 Sep,2022 - 10 Nov 2022 ",
  },
  {
    name: "This quarter",
    date: "01 Sep, 2022 - 31 Nov, 2022",
  },
  {
    name: "This year",
    date: "01 Sep, 2022 - 30 Nov, 2022",
  },
  {
    name: "Next month",
    date: " 04 Sep,2022 - 10 Nov 2022 ",
  },
  {
    name: "Next quarter",
    date: "01 Sep, 2022 - 30 Nov, 2022",
  },
  {
    name: "Next year",
    date: "01 Sep, 2021 - 31 Nov, 2021",
  },
];
const PasswordRender = () => {
  return (
    <View style={styles.container}>
      <Space space={20} />
      <Txt fontSize={20}>Select time range</Txt>
      {data.map((item, index) => {
        return (
          <View width="100%">
            <HView spaceBetween style={styles.containerItem}>
              <View>
                <Txt color={COLORS.darkBlueGrey} fontSize={17}>{item.name}</Txt>
                <Txt color={COLORS.slateGrey} fontSize={14} >{item.date}</Txt>
              </View>
              <UseCheckBoxElements />
            </HView>
            <Space />
            {data.length - 1 !== index && <Line height={1} />}
          </View>
        );
      })}

      <PaleGreyButton width={"100%"}>cancel</PaleGreyButton>
      <Space />
    </View>
  );
};

export default PasswordRender;

const Line = ({ height }) => {
  return <View style={[styles.Line, { height }]} />;
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  containerItem: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  Line: {
    backgroundColor: COLORS.silverTwo,
  },
});
