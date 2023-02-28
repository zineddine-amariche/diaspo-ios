// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Scann = () => {
//   return (
//     <View>
//       <Text></Text>
//     </View>
//   )
// }

// export default Scann

// const styles = StyleSheet.create({})

"use strict";

import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { COLORS, SIZES } from "../../../theme";
import { View } from "react-native";
import imgMarker from "../../../Assets/Img/rectangle2.png";
import RowBack from "../../../Assets/Img/icon24ChevronLeftDefault.png";
import galery from "../../../Assets/Img/icon24Image.png";
import flash from "../../../Assets/Img/flashOff.png";

import { Image } from "react-native";
import { Txt } from "../../../components/utils";
import Space from "../../../components/Space";
import { useState } from "react";

const Scann = ({navigation}) => {
  const onSuccess = (e) => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    console.log("e.data", e.data);
  };
  const [Falsh, setFalsh] = useState(false);
  return (
    <QRCodeScanner
      onRead={onSuccess}
      // onPress={onSuccess}
      flashMode={Falsh ? RNCamera.Constants.FlashMode.torch :  RNCamera.Constants.FlashMode.off }
      topContent={
        <View style={styles.centerText}>
        <TouchableOpacity
        
        onPress={()=>{
          navigation.goBack()
        }}
        >
          
          <Image source={RowBack} />
        </TouchableOpacity>
          <View style={styles.title}>
            <Txt
            //  fontFamily={"Poppins-SemiBold"}
              color={COLORS.white}
              fontSize={20}
              lineHeight={30}
            >
              QR Code Scan
            </Txt>
          </View>
        </View>
      }
      bottomContent={
        <View
          style={{
            height: 48,
            width: "60%",
            backgroundColor: COLORS.lightBlueGrey30,
            position: "absolute",
            bottom: SIZES.height/10.4,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            borderRadius: 8,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity
            style={styles.buttonTouchable}
            // onPress={() => {
            //   if (RNCamera.Constants.FlashMode.on) {
            //     RNCamera.Constants.FlashMode.off;
            //   } else {
            //     RNCamera.Constants.FlashMode.on;
            //   }
            // }}
          >
            <Image source={galery} />
          </TouchableOpacity>
          <View
            style={{ width: 1, height: 32, backgroundColor: COLORS.white }}
          />
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={() => {


              console.log('RNCamera.Constants.FlashMode.on', RNCamera.Constants.FlashMode.on)
              console.log('Falsh', Falsh)
              if (!Falsh) {
                
                setFalsh(true)
              } else {
              
                setFalsh(false)

              }
            }}
          >
            <Image source={flash} />
          </TouchableOpacity>
        </View>
      }
      reactivateTimeout={1}
      containerStyle={{ width: "100%", backgroundColor: "#ccc" }}
      cameraStyle={{ height: "100%" }}
      cameraContainerStyle={{ backgroundColor: "transparent" }}
      topViewStyle={{ position: "absolute", top: SIZES.height/10.4, zIndex: 999 }}
      showMarker={true}
      customMarker={
        <View>
          <Image source={imgMarker} />
          <Space space={30} />

          <Txt
          //  fontFamily={"Poppins-SemiBold"}
            color={COLORS.white}
            style={{ textAlign: "center", width: 200, alignSelf: "center" }}
          >
            Hold the QR Code inside the frame a bove
          </Txt>
        </View>
      }
      reactivate={true}
    />
  );
};

export default Scann;

const styles = StyleSheet.create({
  centerText: {
    color: "#FFF",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    width: "60%",
    alignItems: "flex-end",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {},
});

AppRegistry.registerComponent("default", () => ScanScreen);
