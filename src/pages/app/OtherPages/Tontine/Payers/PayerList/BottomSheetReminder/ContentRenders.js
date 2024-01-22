import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../../components/utils";
import { COLORS } from "../../../../../../../theme";
import Space from "../../../../../../../components/Space";
import {
  PrimaryButton,
  WhiteButton,
} from "../../../../../../../components/Buttons";

const ContentRenders = ({ close, sendReminder }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
        }}
      >
        <ScrollView>
          <Space space={20} />
          <PrimaryButton
            marginVertical={5}
            onPress={() => {
              // navigation.navigate("Tontine");
              close();
              sendReminder();
            }}
          >
            SEND REMINDER
          </PrimaryButton>
        </ScrollView>
        <WhiteButton onPress={close}>cancel</WhiteButton>
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
