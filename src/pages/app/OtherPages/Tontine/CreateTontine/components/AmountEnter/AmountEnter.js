import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ViewT1 from "../../../../../../components/views/CardViewType1";
import Space from "../../../../../../components/Space";
import { Txt } from "../../../../../../components/utils";
import { COLORS } from "../../../../../../theme";
import Form from "./Forms";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const AmountEnter = () => {
  return (
    <>
      <Space space={30} />
      <ViewT1>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          You are topping up your main wallet account in euro using
          <Txt color={COLORS.darkBlueGrey}>
            {" "}
            Credit Card No. **** **** **** 3651.
          </Txt>
        </Txt>
        <Space space={20} />
        <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
          <Form />
        </KeyboardAwareScrollView>
      </ViewT1>
    </>
  );
};

export default AmountEnter;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
