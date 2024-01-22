import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../components/views/Rectangle-Home";
import banner from "../../../../../Assets/Img/banner1.png";
import banner2 from "../../../../../Assets/Img/banner2.png";
import banner3 from "../../../../../Assets/Img/banner3.png";
import Swiper from "react-native-swiper";
import { COLORS } from "../../../../../theme";
import { Txt } from "../../../../../components/utils";
import Space from "../../../../../components/Space";
import { useTranslation } from "react-i18next";
const Events = () => {
  const { t, i18n } = useTranslation();
  return (
    <Rectangle title={t("Home.discount_box.title")} swiper sousTitre={" (coming soon)"}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        dot=<View
          style={{
            backgroundColor: "rgba(255,255,255,.2)",
            width: 12,
            height: 12,
            borderRadius: 20,
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
            borderColor: COLORS.blueGreen,
            borderWidth: 1,
            bottom:-30
          }}
        />
        activeDot=<View
          style={{
            backgroundColor: COLORS.blueGreen,
            width: 12,
            height: 12,
            borderRadius: 20,
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
            bottom:-30
          }}
        />
      >
        <View style={styles.slide1}>
          <Image source={banner} />
        </View>
        <View style={styles.slide2}>
          <Image source={banner2} />
        </View>
        <View style={styles.slide3}>
          <Image source={banner3} />
        </View>
      </Swiper>
    </Rectangle>
  );
};

export default Events;

const styles = StyleSheet.create({
  slide1: {
    justifyContent: "center",
    alignItems: "center",
    flex:1
  },
  slide2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  slide3: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  wrapper: {
    height: 220,
  },
});
// <Rectangle
//   title={"LAST DISCOUNTS"}
//   sousTitre={" (coming soon)"}
//   style={{ paddingVertical: 10 }}
// >
{
  /* <Image source={banner} />
   */
}
{
  /* </Rectangle> */
}
