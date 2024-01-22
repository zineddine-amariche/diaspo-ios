import { ImageBackground, Platform } from "react-native";
import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import ImgBack from "../../Assets/Img/HomeBack.png";
import Space from "../../components/Space";
import { COLORS, SIZES } from "../../theme";
import SecondaryHeader from "../../components/Headers/root/SecondaryHeader";
import { PrimaryButtonLinear } from "../Buttons";
import Line from "../views/line";

const PrimaryTemplate = ({ navigation, title, children, Next,onPress,disable,visible }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />
      <SecondaryHeader
        goBack={() => {
          navigation()
        }}
        title={title}
        Cancel="Return"
        // visible={visible}
      />

      <View style={styles.buttonsConatiner}>{children}</View>
      {Next && (
        <View style={styles.buttonsC}>
          <PrimaryButtonLinear
            disabled={disable}
            onPress={onPress}
          >
            {Next}
          </PrimaryButtonLinear>
          <Space space={25} />
          <Line color={COLORS.black}   />
        </View>
      )}

    </SafeAreaView>
  );
};

export default PrimaryTemplate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: "center",
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    borderBottomEndRadius: 15,
    overflow: "hidden",
    borderBottomStartRadius: 15,
    height: Platform.OS== 'ios'? 140: 110,
  },
  buttonsConatiner: {
    width: "100%",
    backgroundColor: COLORS.paleGrey,
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonsC: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 90,
    paddingTop: 15,
    flex: 1,
    position: "absolute",
    bottom: 0,
  },
});
