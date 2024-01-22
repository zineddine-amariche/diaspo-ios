import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../theme";
import thumbnailPath from "../../../../../../../../Assets/Img/ContactsUser.png";
import CircleCheckBox from "../../../../../../../../components/checkBox/useCircleCheckBox";

const CardUser = ({
  item,
  index,
  length,
  user1,
  handleOnChange,
  checkedState,
  check,
  connected,
  ind,
  HandelChageGlobale,
}) => {
  // console.log("item.thumbnailPath", item);

  return (
    <>
      <TouchableOpacity
        style={styles.Container}
        onPress={() => {
          handleOnChange(index, item);
          HandelChageGlobale(index, item);
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
            {connected ? item : item.displayName}
          </Head>

          <Txt fontSize={12} color={COLORS.coolGrey}>
            {connected
              ? null
              : user1
              ? item?.phoneNumbers
              : item?.phoneNumbers[0]?.number}
          </Txt>
        </View>
        <CircleCheckBox
          onPress={() => {
            handleOnChange(index, item);
            HandelChageGlobale(index, item);
          }}
          checked={check[index]}
          index={index}
        />
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
