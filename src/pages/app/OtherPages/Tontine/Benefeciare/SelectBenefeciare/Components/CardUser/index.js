import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../theme";
import thumbnailPath from "../../../../../../../../Assets/Img/ContactsUser.png";
import CircleCheckBox from "../../../../../../../../components/checkBox/useCircleCheckBox";
import UseCheckBoxElements from "../../../../../../../../components/checkBox/useCheckBoxElements";

const CardUser = ({
  item,
  index,
  length,
  user1,
  check,
  connected,
  HandelChangeCheck,
  getSelectedVal,
}) => {
  // console.log('check', check)
  return (
    <>
      <TouchableOpacity
        style={styles.Container}
        onPress={() => {
          // console.log(item.id)
          HandelChangeCheck(item.id);
          getSelectedVal();
        }}
      >
        <View>
          <Image
            source={thumbnailPath}
            style={styles.Img}
            resizeMode="contain"
          />
        </View>
        <View style={{ width: "57%" }}>
          <Head fontSize={17} color={COLORS.darkBlueGrey} numberOfLines={1}>
            {item.key}
          </Head>

          <Txt fontSize={12} color={COLORS.coolGrey}>
            {connected
              ? null
              : user1
              ? item?.key.phoneNumbers
              : item?.key.phoneNumbers[0]?.number}
          </Txt>
        </View>
        <UseCheckBoxElements index={index} isCheck={check}  />
      </TouchableOpacity>
      {index === length - 1 ? null : (
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
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
  },
});
