import React, { Component, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Switch,
} from "react-native";
import { StatusBar } from "react-native";
import ImgBack from "../../../../Assets/Img/HomeBack.png";
import { COLORS, SIZES } from "../../../../theme";
import { Txt } from "../../../../components/utils";
import SecondaryHeader from "../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../components/Space";
import Rectangle from "../../../../components/views/Rectangle";
import { TouchableOpacity } from "react-native";
import HView from "../../../../components/views/HView/HView";
import iconGo from "../../../../Assets/Img/iconeGo.png";
import iconInfo from "../../../../Assets/Img/icon24Info.png";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default Settings = ({ navigation }) => {

  const { t, i18n } = useTranslation( );


  const [scrollEnabled, setscrollEnabled] = useState(true);
  const [isEnabled, setisEnabled] = useState(false);
  const [location, setlocation] = useState(false);
  const { Language } = useSelector((state) => state.Languages);

  const toggleSwitch = (value) => {
    setisEnabled(value);
  };

  const toggleSwitch2 = (value) => {
    setlocation(value);
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
          navigation.navigate("DiaspoBottomTab");
        }}
        title={t("Settings.button1")}
        Cancel={t("Languages.title_back")}
      />
      <>
        <Space space={30} />

        <ScrollView
          // ref={(scrollView) => (this.scrollView = scrollView)}
          scrollEnabled={()=>setscrollEnabled(true)}
          style={styles.container}
        >
          <Rectangle
            width="90%"
            style={{ paddingHorizontal: 15, marginBottom: 5 }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                onPress={() => navigation.navigate("Languages")}
              >
                <View>
                  <Txt fontSize={14} color={COLORS.coolGrey}>
                    {" "}
                   {t("Settings.button1")}
                  </Txt>
                </View>
                <HView width={"100%"} spaceBetween>
                  <Txt fontSize={18} color={COLORS.darkBlueGrey} fontWeight>
                    {Language}
                  </Txt>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Languages")}
                  >
                    <Image
                      source={iconGo}
                      style={styles.Img}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </HView>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 2,
                width: "100%",
                backgroundColor: COLORS.silverTwo,
              }}
            ></View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View>
                  <Txt fontSize={14} color={COLORS.coolGrey}>
                    Notification
                  </Txt>
                </View>
                <HView width={"100%"} spaceBetween>
                  <Txt
                    fontSize={18}
                    color={COLORS.darkBlueGrey}
                    style={{ paddingRight: 20 }}
                  >
                    {isEnabled ? "On" : "Off"}
                  </Txt>

                  <Switch
                    trackColor={{
                      false: COLORS.silverTwo,
                      true: COLORS.green,
                    }}
                    thumbColor={"white"}
                    style={{
                      transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
                    }}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </HView>
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: 2,
                width: "100%",
                backgroundColor: COLORS.silverTwo,
              }}
            ></View>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                paddingVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View style={{width:'70%'}}>
                  <Txt fontSize={14} color={COLORS.coolGrey}>
                    {t("Settings.button3")}
                  </Txt>
                </View>
                <HView width={"100%"} spaceBetween>
                  <Txt
                    fontSize={18}
                    color={COLORS.darkBlueGrey}
                    style={{ paddingRight: 15 }}
                  >
                    {location ? "On" : "Off"}
                  </Txt>

                  <Switch
                    trackColor={{
                      false: COLORS.silverTwo,
                      true: COLORS.green,
                    }}
                    thumbColor={"white"}
                    style={{
                      transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
                    }}
                    onValueChange={toggleSwitch2}
                    value={location}
                  />
                </HView>
              </TouchableOpacity>
            </View>

            <View
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                // backgroundColor:'#ccc',
                width: "100%",
              }}
            >
              <Image
                source={iconInfo}
                style={styles.Img2}
                resizeMode="contain"
              />
              <Txt>
                <Txt
                  fontSize={14}
                  color={COLORS.darkBlueGrey}
                  style={{ fontWeight: "bold" }}
                >
                  Note:
                </Txt>
                <Txt fontSize={14} color={COLORS.gray}>
                  {t("Settings.info")}
                </Txt>
              </Txt>
            </View>
            {/* {"\n"}  */}
            <View
              style={{
                height: 20,
                width: "100%",
              }}
            ></View>
          </Rectangle>
        </ScrollView>
        <Space space={120} />
      </>
    </SafeAreaView>
  );
};

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
    marginRight: 5,
  },
});
