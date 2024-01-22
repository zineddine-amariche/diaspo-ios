import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../theme";
import thumbnailPath from "../../../../../../../../Assets/Img/icon24Edit.png";
import icon24TrashBin from "../../../../../../../../Assets/Img/icon24TrashBin.png";
import CircleCheckBox from "../../../../../../../../components/checkBox/useCircleCheckBox";
import HView from "../../../../../../../../components/views/HView/HView";
import UseCheckBoxElements from "../../../../../../../../components/checkBox/useCheckBoxElements";

const CardUserNonApp = ({
  item,
  index,
  length,
  user1,
  handleOnChange,
  checkedState,
  check,
  onPress,
  connected,
  onSuccess,
  onEdit,
  HandelChageGlobale,
}) => {
  // console.log("item.thumbnailPath", item);

  return (
    <>
      <View style={styles.Container}>
        <HView spaceBetween>
          <TouchableOpacity onPress={onEdit}>
            <Image
              source={thumbnailPath}
              style={styles.Img}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSuccess}>
            <Image
              source={icon24TrashBin}
              // style={styles.Img}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </HView>
        <TouchableOpacity
          onPress={() => {
            // console.log("index", index);
            handleOnChange(index, item);
            HandelChageGlobale(index, item);
          }}
        >
          <HView spaceBetween>
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
            {/* <CircleCheckBox
              onPress={() => {
                // handleOnChange(index, item);
                // HandelChageGlobale(index,item)
              }}
              checked={check[index]}
              index={index}
            /> */}

            <UseCheckBoxElements index={index} isCheck={item.checked} />
          </HView>
        </TouchableOpacity>
      </View>
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

export default CardUserNonApp;

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
    marginRight: 20,
  },
});
