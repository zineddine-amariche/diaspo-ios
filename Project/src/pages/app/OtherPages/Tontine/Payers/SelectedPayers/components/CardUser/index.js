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
  ind
}) => {
  // console.log("item.thumbnailPath", item);
// console.log('item?.phoneNumbers', item?.phoneNumbers[0]?.number)
// console.log('ind', ind)
  return (
    <>
      <TouchableOpacity
        style={styles.Container}
        onPress={() => {
          // console.log('index' , index)
          handleOnChange(index, item);
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
            {item.displayName ? item.displayName:item }
          </Head>

          <Txt fontSize={12} color={COLORS.coolGrey}>
            {item.displayName ?   item?.phoneNumbers[0]?.number :null  }
          </Txt>
        </View>
        <CircleCheckBox
          onPress={() => {
            handleOnChange(index, item);
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
