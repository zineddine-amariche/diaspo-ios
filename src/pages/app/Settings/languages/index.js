import React, { Component, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "react-native";
import ImgBack from "../../../../Assets/Img/HomeBack.png";
import { COLORS, SIZES } from "../../../../theme";
import { Txt } from "../../../../components/utils";
import SecondaryHeader from "../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../components/Space";
import Rectangle from "../../../../components/views/Rectangle";
import { TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguages } from "../../../../redux/Features/Language/Slice";

const lang = [
  { shortForm: "en", longForm: "English" },
  { shortForm: "esp", longForm: "Espagnol" },
  { shortForm: "fr", longForm: "Francais" },
  { shortForm: "deu", longForm: "Deutch" },
  { shortForm: "ita", longForm: "Italino" },
  { shortForm: "por", longForm: "Portugal" },
  { shortForm: "bra", longForm: "Brasil" },
  { shortForm: "ned", longForm: "Nederlands" },
  { shortForm: "dan", longForm: "Dansk" },
  { shortForm: "pol", longForm: "Polski" },
  { shortForm: "sou", longForm: "Soumi" },
];

const Language = ({ navigation }) => {
  const [scrollEnabled, setscrollEnabled] = useState(true);
  const [isEnabled, setisEnabled] = useState(false);
  const [location, setlocation] = useState(false);
  const [checked, setchecked] = useState("English");

  const ChangeCheck = (value) => {
    setchecked(value);
  };

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation( );

  const [currentLanguage, setLanguage] = useState("en");
  const { Language } = useSelector((state) => state.code);
  const changeLanguage = (value, v2) => {
    i18n
      .changeLanguage(value)
      .then(() => dispatch(changeLanguages(v2)))
      .catch((err) => console.log("err " ,err));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.paleGrey, flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SecondaryHeader
        goBack={() => {
          navigation.navigate("Settings");
        }}
        title={t("Languages.title")}
        Cancel={t("Languages.title_back")}
      />
      <>
        <Space space={20} />

        <ScrollView
          // ref={(scrollView) => (this.scrollView = scrollView)}
          scrollEnabled={scrollEnabled}
          style={styles.container}
        >
          <View
            style={{
              width: "90%",
              backgroundColor: "#FFF",
              alignSelf: "center",
            }}
          >
            <Rectangle width="100%" style={{ height: "100%" }}>
              {lang.map((item, index) => {
                return (
                  <View style={{ width: "100%" }} key={index}>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        paddingVertical: 20,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                        onPress={() => {
                          ChangeCheck(item.longForm);
                          // console.log('shortForm', item.shortForm)
                          changeLanguage(item.shortForm, item.longForm);
                        }}
                      >
                        <View>
                          <Txt fontSize={17} color={COLORS.darkBlueGrey}>
                            {item.longForm}
                          </Txt>
                        </View>
                        <RadioButton
                          value={item.longForm}
                          status={
                            checked === item.longForm ? "checked" : "unchecked"
                          }
                          onPress={() => {
                            ChangeCheck(item.longForm);
                            changeLanguage(item.shortForm, item.longForm);
                          }}
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        height: 2,
                        width: "100%",
                        backgroundColor: COLORS.silverTwo,
                      }}
                    ></View>
                  </View>
                );
              })}
            </Rectangle>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
  },

  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    height: 110,
  },
  Img: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
  Img2: {
    height: 20,
    width: 20,
    marginLeft: 10,
    marginRight: 5,
  },
});
