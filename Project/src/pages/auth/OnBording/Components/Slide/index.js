import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS } from "../../../../../theme";
import { Txt } from "../../../../../components/utils";
const { width, height } = Dimensions.get("window");

export const SLIDER_HIGHT = height * 0.61;
const Slide = ({ item, scrollX, index, condition,navigation }) => {
  const transform = [
    // { translateY: (SLIDER_HIGHT ) / 2 },
    // { translateX: right ? width / 2 - 50 : -width / 2 + 60 },
    // { rotate: right ? "-60deg" : "60deg" },
  ];

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.4, 1.3, 0.4],
    extrapolate: "clamp",
  });
  return (
    <>
      <View style={[styles.container]}>
        {condition ? (
          <TouchableOpacity
            style={styles.skip}
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            <Txt color={COLORS.gray}> Skip</Txt>
          </TouchableOpacity>
        ) : null}
        <View style={[styles.containertitle, { transform }]}>
          <Animated.Image
            source={item.image}
            style={{
              width: 60,
              height: 39,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width: 0.9 * width,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 60,
    backgroundColor: COLORS.linBlue,
    borderRadius: 6,
    position: "relative",
  },
  containertitle: {
    height: 80,
    // backgroundColor:'red'
    // paddingLeft: 15,
  },
  title: {
    fontSize: 30,
    // fontFamily: "SFProTetx-Bold",
    color: COLORS.Vert0,
    lineHeight: 80,
  },
  skip: {
    position: "absolute",
    right: 20,
    top: -35,
  },
});
