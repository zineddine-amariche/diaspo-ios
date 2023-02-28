import { View, Text, StyleSheet, Dimensions, Animated, Alert, Linking } from "react-native";
import React, { useRef } from "react";
import Slide from "./Components/Slide";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../../../theme";
import DataSlider from "./Components/slides";
import { PrimaryButton } from "../../../components/Buttons";
import Line from "../../../components/views/line";
import Space from "../../../components/Space";

import Contacts from "react-native-contacts";
import { useDispatch, useSelector } from "react-redux";
import { GetSatetContacts } from "../../../redux/Features/Tontine/ManagePayers/Contacts";


const { width, height } = Dimensions.get("window");
const BORDER_RADUIS = 75;

const SwiperBoard = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const refSlides = useRef(null);

  const Bgs = [COLORS.Vert0, COLORS.Vert0, COLORS.Vert0];
  const Bgs2 = [COLORS.Vert1, COLORS.Vert1, COLORS.Vert1];


  const dispatch = useDispatch();

  const contacts = useSelector((state) => ({ ...state.contacts }));

  Contacts.checkPermission().then((res) => {
    if (res === "authorized" && contacts.length !== 0) {
      getContacts();
    } else if (res === "denied") {
      Alert.alert("Dipaso", "You have to give permission to get contacts ", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Allow", onPress: () => Linking.openSettings() },
      ]);
    }
  });

  const getContacts = async () => {
    try {
      Contacts.getAll().then((res) => {
        if (!contacts.contacts) {
          dispatch(GetSatetContacts(res));
        }
        res.map((item) => {
          return item;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };


  const Indicator = ({ scrollX }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginVertical: 10,
          marginTop: 20,
        }}
      >
        {DataSlider.map((data, i) => {
          const backgroundColor = scrollX.interpolate({
            inputRange: Bgs2.map((_, i) => i * width),
            outputRange: Bgs2.map((bg) => bg),
          });
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`indicator-${i}`}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                opacity,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 2,
                margin: 7,
                transform: [
                  {
                    scale,
                  },
                ],
              }}
            ></Animated.View>
          );
        })}
      </View>
    );
  };
  const IndicatorTitle = ({ scrollX }) => {
    return (
      <View
        style={{
          alignSelf: "center",
        }}
      >
        {DataSlider.map((data, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [0, 1, 0],
            extrapolate: "clamp",
          });
          const translateY = scrollX.interpolate({
            inputRange: inputRange,
            outputRange: [-250, 0, 500],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={`indicator-${i}`}
              style={{
                position: "absolute",
                opacity,
                alignSelf: "center",
                width: width * 0.9,
                transform: [
                  {
                    scale,
                  },
                  {
                    translateY,
                  },
                ],
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: COLORS.Vert1,
                  fontSize: 22,
                  fontWeight: "700",
                }}
              >
                {data.title}
              </Text>
              <View
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: COLORS.slateGrey,
                    fontSize: 14,
                    padding: 6,
                    lineHeight: 20,
                    paddingHorizontal: 30,
                  }}
                >
                  {data.description}
                </Text>
              </View>
              <Space space={20} />

              <PrimaryButton
                condition={DataSlider.length === i + 1 ? false : true}
                onPress={() => {
                  if (DataSlider.length === i + 1) {
                    navigation.navigate("login");
                  } else {
                    refSlides.current.scrollTo({
                      x: width * (i + 1),
                      animated: true,
                    });
                  }
                }}
              >
                {DataSlider.length - 1 === i ? "GET STARTED" : "Next"}
              </PrimaryButton>
            </Animated.View>
          );
        })}
      </View>
    );
  };

  const ColorBack = scrollX.interpolate({
    inputRange: Bgs.map((_, i) => i * width),
    outputRange: Bgs.map((bg) => bg),
  });


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor: ColorBack }]}>
        <Animated.ScrollView
          ref={refSlides}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {DataSlider.map((item, i) => {
            return (
              <Slide
                item={item}
                index={i}
                scrollX={scrollX}
                navigation={navigation}
                key={i}
                condition={DataSlider.length === i + 1 ? false : true}
              />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>

      <View style={[styles.footer, {}]}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: ColorBack,
          }}
        />
        <Indicator scrollX={scrollX} />
        <View style={[styles.footerContent]}>
          <IndicatorTitle scrollX={scrollX} />
        </View>
      </View>
      {/* <View style={styles.line}>
        <Line color={COLORS.lightNavy} />
      </View> */}
    </View>
  );
};

export default SwiperBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: 0.51 * height,
    paddingTop: 20,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    backgroundColor: COLORS.gray,
  },

  line: {
    position: "absolute",
    bottom: 10,
  },
});
