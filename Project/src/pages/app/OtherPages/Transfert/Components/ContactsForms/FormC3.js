import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Txt } from "../../../../../../components/utils";
import Rectangle from "../../../../../../components/views/Rectangle";
import Space from "../../../../../../components/Space";
import CardUser from "../CardUser";
import { COLORS } from "../../../../../../theme";
const openedPercent = 100;
const FormC3 = ({ ContactsPhone, openedPercentage }) => {
  const heightValue = openedPercentage * openedPercent;

  return (
    <View style={{ flex: 1 }}>
      {ContactsPhone?.length ? (
        <View>
          <Txt>{ContactsPhone.length} saved non-app users</Txt>
        </View>
      ) : null}
      <Space space={15} />

      {ContactsPhone?.length ? (
        <Rectangle width="100%" style={{ paddingVertical: 10 }}>
          {ContactsPhone.map((item, index) => {
            return (
              <View key={index}>
                <CardUser
                  item={item}
                  index={index}
                  length={ContactsPhone.length}
                />
              </View>
            );
          })}
        </Rectangle>
      ) : (
        <View style={{ alignItems: "center"  }}>
          <Space space={40} />
          <Txt color={COLORS.coolGrey} fontSize={20} style={{ padding: 40 }}>
            no contacts .
          </Txt>
        </View>
      )}
    </View>
  );
};

export default FormC3;

const styles = StyleSheet.create({});
