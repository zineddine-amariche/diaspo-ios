import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { COLORS } from "../../../../../theme";
import HView from "../../../../../components/views/HView/HView";
import { Txt } from "../../../../../components/utils";
import SimpleView from "../../../../../components/views/Card-Simple-Radius-8";
import Space from "../../../../../components/Space";
import { Image } from "react-native";

import downRow from "../../../../../Assets/Img/icon16ChevronBottomDefault.png";
import { TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { UIManager } from "react-native";
import { useState } from "react";
import { LayoutAnimation, Easing } from "react-native";
import { Animated } from "react-native";
import { useRef } from "react";
import { useEffect } from "react";
// import { Easing } from "react-native-reanimated";

const data = [
  {
    transferd: "Melicia Diya ",
    date: "29 Jan 2020",
    type: "Food & Drink",
    price: 1.222,
    url: require("../../../../../Assets/Img/TAG1.png"),
  },
  {
    transferd: "Fatima Cleaning Service",
    date: "29 Jan 2020",
    type: "Food & Drink",
    price: 1.222,
    url: require("../../../../../Assets/Img/TAG2.png"),
  },
  {
    transferd: "Beatriz Charles",
    date: "29 Jan 2020",
    type: null,
    price: 1.222,
    url: null,
  },
  {
    transferd: " Beatriz Charles",
    date: "29 Jan 2020",
    type: "Food & Drink",
    price: 1.222,
    url: require("../../../../../Assets/Img/TAG3.png"),
  },
];
const Plans = ({ status , title }) => {
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const pourcentage = Math.floor(Math.random() * (90 - 40 + 1) + 40) / 100;
  const progress = pourcentage * 240;
  const barWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: progress,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  let colStateTxt = status === 'On track' ? COLORS.greenishTeal : status === 'Over expense' ?  COLORS.coral : COLORS.orangeYellow
  let coloBack = status === 'On track' ? COLORS.greenishTeal : status === 'Over expense' ?  COLORS.coral : COLORS.orangeYellow  
  let BckTransCOl = status === 'On track' ? COLORS.lightSage : status === 'Over expense' ?  COLORS.veryLightPink : COLORS.pale  
  return (
    <SimpleView width={"99%"}>
      <View style={{paddingHorizontal:20}}>
          <View style={[styles.dateBox]}>
            <Txt fontSize={17} Bold="700" color={COLORS.darkBlueGrey}>
              {title}
            </Txt>
            <View style={[styles.circleState,{backgroundColor:BckTransCOl}]}>
              <Txt color={colStateTxt}>{status}</Txt>
            </View>
          </View>
          <Space space={20} />

        <View style={[styles.statusBarContainer,{backgroundColor:BckTransCOl}]}>
          <Animated.View
            style={{
              height: 8,
              marginLeft:4,
              backgroundColor: coloBack,
              width: barWidth,
              borderRadius:8
            }}
          ></Animated.View>
        </View>

        <View style={styles.boxPrices}>
          <TouchableOpacity onPress={toggleOpen}>
            <HView style={{ alignItems: "center" }}>
              <Txt color={COLORS.darkBlueGrey} fontSize={14}>
                £1,020{" "}
                <Txt color={COLORS.slateGrey} fontSize={12}>
                  / £3,700{" "}
                </Txt>{" "}
              </Txt>
            </HView>
          </TouchableOpacity>
          <Txt color={colStateTxt}>27,2%</Txt>
        </View>
      </View>
    </SimpleView>
  );
};

export default Plans;

const styles = StyleSheet.create({
  dateBox: {
    borderRadius: 4,
    flexDirection: "row",
    width:'100%', 
    justifyContent:'space-between',
     alignItems:'center'
  },
  Hview: {
    paddingHorizontal: 20,
  },
  boxPrices: {
    flexDirection:"row",
    justifyContent:'space-between',
    marginTop:20,
  },
  renderItem: {
    backgroundColor: COLORS.paleGreyTwo,
    marginVertical: 5,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 4,
  },
  hidden: {
    display: "none",
  },
  list: {
    display: "flex",
  },
  circleState: {
    backgroundColor: COLORS.lightSage,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 13,
  },
  statusBarContainer: {
    width: 300,
    alignSelf: "center",
    height: 16,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: COLORS.lightSage,
  },
});
