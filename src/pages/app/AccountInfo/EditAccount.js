import React, { useCallback, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
} from "react-native";

import ImgBack from "../../../Assets/Img/HomeBack.png";
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from "../../../components/Buttons";
import SecondaryHeader from "../../../components/Headers/root/SecondaryHeader";
import Space from "../../../components/Space";

import { COLORS, SIZES } from "../../../theme";

import { Formik } from "formik";

import Line from "../../../components/views/line";
import Form from "./Edit/Forms";
// import BottomSheetSelect from "./BottomSheetSelect";

const EditAccount = ({ navigation }) => {
  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const goBack = () => {
    navigation.navigate('AccountInfo');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />
      <SecondaryHeader
        goBack={goBack}
        title={"Edit personal info"}
        Cancel="Return"
      />

      <>
        <ScrollView
          contentContainerStyle={{ width: SIZES.width }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              margin: 20,
              borderRadius: 8,
            }}
          >
            <Form />
          </View>
          <Space space={60} />
        </ScrollView>

        {false ? (
          <View style={styles.containerButton}>
            <PrimaryButtonLinear
              width={"100%"}
              onPress={() => {
                handleSubmit();
              }}
              // loading={isSubmitting}
            >
              Next
            </PrimaryButtonLinear>
            <Space space={25} />
            <Line color={COLORS.black} />
          </View>
        ) : null}
      </>
    </SafeAreaView>
  );
};

export default EditAccount;

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
  topinuptxt: {
    padding: 20,
  },
  containerButton: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 110,
    paddingTop: 15,
  },
});
