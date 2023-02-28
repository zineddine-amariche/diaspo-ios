import React from "react";
import ImgBack from "../../../../Assets/Img/HomeBack.png";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../../../theme";
const ScreensLayout = ({ children , opacity }) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground
        style={[styles.ImageBackground,{opacity}]}
        source={ImgBack}
      />
      
      {children}
    </View>
  );
};

export default ScreensLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    top: -107,
    width:SIZES.width,
    height:264,
    position:"absolute"
  },
});
