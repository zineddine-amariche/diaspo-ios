import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Txt } from "../../../../../../components/utils";
import Space from "../../../../../../components/Space";
import Rectangle from "../../../../../../components/views/Rectangle";
import CardUser from "../CardUser";
import { COLORS } from "../../../../../../theme";
const dataUserConected = [
  {
    id: 0,
    displayName: "Donna Dorothy",
    phoneNumbers: "+76 7863 203293",
    price: "32,589.50",
    thumbnailPath: require("../../../../../../Assets/Img/chrome_9lobitwRZR.png"),
  },
  {
    id: 1,
    displayName: "Faith Felicity",
    phoneNumbers: "+44 7538 110953",
    price: "12,089.50",
    thumbnailPath: require("../../../../../../Assets/Img/chrome_9lobitwRZR.png"),
  },
  {
    id: 2,
    displayName: "Heather Irene",
    phoneNumbers: "+73 4630 202091",
    price: "32,099.50",
    thumbnailPath: require("../../../../../../Assets/Img/chrome_9lobitwRZR.png"),
  },
];
const FormC1 = () => {
  return (
    <View style={{ backgroundColor: COLORS.white , flex:1 }}>
        <Txt>47 Connected users</Txt>
      <Space space={15} />
      <Rectangle width="100%" style={{paddingVertical:10}}>
        {dataUserConected.map((item, index) => {
          return (
            <View key={index}>
              <CardUser
                item={item}
                index={index}
                length={dataUserConected.length}
                user1={true}
              />
            </View>
          );
        })}
      </Rectangle>
    </View>
  );
};

export default FormC1;

const styles = StyleSheet.create({});
