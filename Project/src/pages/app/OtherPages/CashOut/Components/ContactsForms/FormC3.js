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
    <>
      <View>
        <Txt>{ContactsPhone.length} saved non-app users</Txt>
      </View>
      <Space space={15} />

      <Rectangle width="100%" style={{paddingVertical:10}}>
        {ContactsPhone.length ? (
          ContactsPhone.map((item, index) => {
            return (
              <View key={index}>
                <CardUser
                  item={item}
                  index={index}
                  length={ContactsPhone.length}
                />
              </View>
            );
          })
        ) : (
          <Txt color={COLORS.black} style={{ padding: 40 }}>
            Pas de contacts
          </Txt>
        )}
      </Rectangle>
    </>
  );
};

export default FormC3;

const styles = StyleSheet.create({});
