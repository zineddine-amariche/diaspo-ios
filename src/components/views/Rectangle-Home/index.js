import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../../../theme";
import HView from "../HView/HView";
import { Txt } from "../../utils";
import icon24ChevronRightDefault from "../../../Assets/Img/icon24ChevronRightDefault.png";
import DropDownModel from "../../select/DropDown-Model";
import Space from "../../Space";
const data = [
  {
    id: 0,
    label: "euro",
    value: "euro",
  },
  {
    id: 1,
    label: "EUR",
    value: "EUR",
  },
  {
    id: 2,
    label: "DZ",
    value: "DZ",
  },
];
const Rectangle = ({ children, title, Modal, index, sousTitre, swiper,onPress }) => {
  const [selected, setSelected] = useState(null);

  const onSelect = (item) => {
    setSelected(item);
  };
  return (
    <View style={[styles.RecentTransaction, {}]}>
      <HView spaceBetween style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        <Txt
          color={COLORS.blueGreen}
          fontSize={17}
          // fontFamily="Poppins-Bold"
          style={{ paddingBottom: -5 }}
        >
          {title}
          <Txt fontSize={12}>{sousTitre}</Txt>
        </Txt>
        <View style={{ zIndex: 100 }}>
          {title === "Analysis" ||
          Modal ||
          title === "Overview" ||
          title === "4 Active Plans" ||
          title === "4 Active Plans" ? (
            <View width="100%" style={{ marginTop: -6, width: "100%" }}>
              <DropDownModel
                data={data}
                label={"Currency :"}
                value={selected}
                onSelect={onSelect}
                placeholder={"euro"}
              />
            </View>
          ) : (
            <TouchableOpacity onPress={onPress}>
              <HView>
                <Txt
                  color={COLORS.orangeYellow}
                  style={{ marginRight: 2, marginBottom: 5 }}
                  fontSize={12}
                >
                  View all
                </Txt>
                <Image
                  source={icon24ChevronRightDefault}
                  style={{ marginTop: -2 }}
                />
              </HView>
            </TouchableOpacity>
          )}
        </View>
      </HView>
      <>{children}</>
      {swiper ? (
        <Space space={20} />
      ) : (
        <HView
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            width: "30%",
            alignSelf: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={index === 0 ? styles.circles2 : styles.circles}></View>
          <View style={index === 1 ? styles.circles2 : styles.circles}></View>
          <View style={index === 2 ? styles.circles2 : styles.circles}></View>
        </HView>
      )}
    </View>
  );
};

export default Rectangle;

const styles = StyleSheet.create({
  RecentTransaction: {
    backgroundColor: COLORS.white,
    width: "93%",
    alignSelf: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: 5,
    zIndex: -1,
    overflow: "hidden",
  },
  carouselIndicator: {
    height: 15,
    width: 15,
    borderColor: COLORS.blueGreen,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  carouselIndicatornotActive: {
    height: 15,
    width: 15,
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: COLORS.greyblue,
  },
  circles: {
    height: 18,
    width: 18,
    backgroundColor: "#FFF",
    borderRadius: 200,
    borderWidth: 2,
    borderColor: COLORS.greyblue,
    marginHorizontal: 5,
  },
  circles2: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.greyblue,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: COLORS.white,
    marginHorizontal: 5,
  },
});
