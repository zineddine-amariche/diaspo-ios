import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../theme";
import thumbnailPath from "../../../../../../../../Assets/Img/ContactsUser.png";

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
        <View style={{ width: "50%", marginRight: 10 }}>
          <Head fontSize={17} color={COLORS.darkBlueGrey} numberOfLines={1}>
            {item.displayName ? item.displayName : item}
          </Head>

          <Txt fontSize={12} color={COLORS.coolGrey}>
            {item.displayName ? item?.phoneNumbers[0]?.number : null}
          </Txt>
        </View>

        {index == 1 ? (
          <View
            style={{
              backgroundColor: COLORS.iceBlueTwo,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 13,
              width: 90,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Txt fontSize={14} color={COLORS.darkSkyBlue}>
            Awaiting
            </Txt>
          </View>
        ) : index !== 3 ? (
          <View
            style={{
              backgroundColor: COLORS.lightSage,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 13,
              width: 90,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Txt fontSize={14} color={COLORS.greenishTeal}>
              Accepted
            </Txt>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: COLORS.veryLightPink,
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 13,
              width: 90,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Txt fontSize={14} color={COLORS.coral}>
              Denied
            </Txt>
          </View>
        )}
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
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
    marginRight: 10,
  },
});
