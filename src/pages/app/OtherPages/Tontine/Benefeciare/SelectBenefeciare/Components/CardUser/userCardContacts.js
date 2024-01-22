import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../theme";
import thumbnailPath from "../../../../../../../../Assets/Img/ContactsUser.png";
import CircleCheckBox from "../../../../../../../../components/checkBox/useCircleCheckBox";
import UseCheckBoxElements from "../../../../../../../../components/checkBox/useCheckBoxElements";

const UserCardContacts = ({
  item,
  index,
  length,
  user1,
  check,
  connected,
  HandelChangeCheck,
  getSelectedVal,
  id,
}) => {
  return (
    <>
      <TouchableOpacity
        style={styles.Container}
        onPress={() => {

          HandelChangeCheck(id);
          // getSelectedVal();
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
            {item?.displayName}
          </Head>

          <Txt fontSize={12} color={COLORS.coolGrey}>
            {item?.phoneNumbers[0]?.number}
          </Txt>
        </View>
        <UseCheckBoxElements index={index} isCheck={check} />
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

export default UserCardContacts;

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
