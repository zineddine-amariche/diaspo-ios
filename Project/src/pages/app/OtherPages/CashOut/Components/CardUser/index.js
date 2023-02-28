import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../components/utils";
import { COLORS } from "../../../../../../theme";

const CardUser = ({ item, index, length,user1 }) => {
  // console.log('item?.phoneNumbers[0].number', JSON.stringify(item?.phoneNumbers[0]?.number))
  return (
    <>
      <View style={styles.Container}>
        <View>
          <Image source={item.thumbnailPath} style={styles.Img} resizeMode="contain" />
        </View>
        <View>
          <Head fontSize={17} color={COLORS.darkBlueGrey}>
            {item.displayName}
          </Head>
          <Txt fontSize={12} color={COLORS.coolGrey}>
            {user1 ?item?.phoneNumbers: item?.phoneNumbers[0]?.number}
          </Txt>
        </View>
      </View>
      {index === length -1 ? null : (
        <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: COLORS.silverTwo,
          }}
        ></View>
      )}
    </>
  );
};

export default CardUser;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 20,
   
      


  },
  Img: {
    marginRight: 20,
    borderRadius: 5,
    height:40,
    width:40
  },
});
