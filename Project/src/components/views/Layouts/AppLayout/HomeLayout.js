import React from "react";
import ImgBack from "../../../../Assets/Img/HomeBack.png";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../../../theme";
const HomeLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />

      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />

      {children}
    </SafeAreaView>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.paleGrey,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
  
  },
});
