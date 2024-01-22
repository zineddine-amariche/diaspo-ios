import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { ImageBackground } from "react-native";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import SecondaryHeader from "../../../components/Headers/root/SecondaryHeader";
import Space from "../../../components/Space";
import CodeQR from "../../../Assets/Img/QrCode/QrCode.png";
import { COLORS, SIZES } from "../../../theme";
import ImgBack from "../../../Assets/Img/HomeBack.png";
import Logo from "../../../Assets/Img/QrCode/Logo.png";

import { Head, Txt } from "../../../components/utils";
import HView from "../../../components/views/HView/HView";
import { PrimaryButtonLinear } from "../../../components/Buttons";
import Line from "../../../components/views/line";

const MyCode = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />

      <SecondaryHeader
        goBack={() => {
          navigation.goBack();
        }}
        title={"My QR Code"}
        Cancel="Return"
      />
      <Space space={20} />

      <ScrollView contentContainerStyle={{   width: SIZES.width }}>
        <Space space={20} />
        <View
          style={{
            backgroundColor: COLORS.white,
            width: "90%",
            alignSelf: "center",
            borderRadius: 8,
            padding: 15,
            alignItems: "center",
          }}
        >
          <Space space={20} />
          <Image source={CodeQR} style={{ width: 170, height: 170 }} />
          <Space space={20} />

          <Head color={COLORS.darkBlueGrey}>Admin User</Head>

            <Space space={20} />
          <HView>
            <PrimaryButtonLinear disabled={true} width="90%" >
          Share
        </PrimaryButtonLinear>
          </HView>
        </View>
        <Space space={20} />
        <View style={{ alignItems: "center" }}>
          <Txt color={COLORS.coolGrey}>
            scan this code to pay{" "}
            <Txt color={COLORS.BlackModal}> Admin User</Txt>
          </Txt>
        </View>
      <Space space={160} />
      </ScrollView>

    </SafeAreaView>
  );
};

export default MyCode;

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
    height: 110,
  },
  buttonsConatiner: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 110,
    paddingTop: 15,
  },
});

// let ActionSheets = useRef();

// const showActionSheet = () => {
//   ActionSheets.current.show();
// };

// let ARR = [];

// countries.map((I) => {
//   ARR.push(I.countryName);
// });
// ARR.push("CANCEL");

// const styless = {
//   titleBox: {
//     background: "pink",
//   },
//   titleText: {
//     fontSize: 16,
//     color: "#000",
//   },
// };
// const [Region, setRegion] = useState("");

// const handlePress = (buttonIndex) => {
//   setRegion({
//     selected: buttonIndex,
//     Region: ARR[buttonIndex],
//   });
// };

{
  /* <TouchableHighlight onPress={showActionSheet}>
        <Txt>   { Region? Region?.Region :   "Discount"}</Txt>
      </TouchableHighlight>
      <ActionSheet
        ref={ActionSheets}
        title={
          <Text style={{ color: "#000", fontSize: 18, fontWeight: "700" }}>
     Select your country
          </Text>
        }
        options={ARR}
        cancelButtonIndex={ARR.length - 1}
        destructiveButtonIndex={ARR.length - 1}
        // onPress={(index) => {
        //  console.log(index)
        // }}
        useNativeDriver={true}
        styles={styless}
        tintColor={"#000"}
        selectedValue={Region}
        value={Region}
        onPress={handlePress}
      /> */
}
