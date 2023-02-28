import React from "react";
import ImgBack from "../../../../Assets/Img/AnalysisLayout.png";
// import ImgBack from "../../../../Assets/Img/HomeBack.png";

import {
  Image,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { COLORS, SIZES } from "../../../../theme";
const AnalysisLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />

      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default AnalysisLayout;

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
