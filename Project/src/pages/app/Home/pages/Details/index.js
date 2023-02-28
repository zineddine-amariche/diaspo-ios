import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { ImageBackground } from "react-native";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import Space from "../../../../../components/Space";
import { COLORS, SIZES } from "../../../../../theme";
import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import { Head, Txt } from "../../../../../components/utils";

import codeQR from "../../../../../Assets/Img/Entrainment/bitmapIMG.png";
import icon24Copy from "../../../../../Assets/Img/Entrainment/icon24Copy.png";
import ImageOrange from "../../../../../Assets/Img/Entrainment/chrome_OcnOS3KMBG.png";
import SecondaryHeader from "../../../../../components/Headers/root/SecondaryHeader";
import { PrimaryButtonLinear } from "../../../../../components/Buttons";
import Line from "../../../../../components/views/line";

 

const DetailsEntertainment = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />

      <SecondaryHeader
        goBack={() => {
          navigation.goBack();
        }}
        title={item.title}
        Cancel="Return"
      />
      <View
        style={{
          height: 150,
          elevation: 3,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.white,
          width: "90%",
          borderRadius: 8,
          paddingHorizontal:30
        }}
      >
        <Txt color={COLORS.orangeYellow} fontSize={14}>
          Entertainment
        </Txt>
        <Space />
        <Txt
          style={{ textAlign: "center" }}
          fontSize={24}
          color={COLORS.blueGreen}
          lineHeight={30}
        >
          30% discount for new customers
        </Txt>

        <View
          style={{
            position: "absolute",
            bottom: -15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={ImageOrange}></Image>
          <Txt
            color={COLORS.white}
            fontSize={14}
            style={{ position: "absolute" }}
          >
            164 days left
          </Txt>
        </View>
      </View>
      <Space space={20} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Space space={20} />
        <Head color={COLORS.darkBlueGrey}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium
        </Head>
        <Space />
        <Txt fontSize={12} color={COLORS.darkSkyBlue}>
          Ut enim ad minima veniam
        </Txt>
        <Space space={20} />
        <View style={{ width: "100%" }}>
          <Txt fontSize={14} color={COLORS.slateGrey}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </Txt>
          <Space space={20} />

          <Txt fontSize={14} color={COLORS.slateGrey}>
            Accusantium doloremque laudantium.
          </Txt>
        </View>
        <Space space={20} />
{/* first exemple !do note delete this */}
        {/* <View
          style={{
            height: 80,
            backgroundColor: COLORS.white,
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Txt color={COLORS.darkBlueGrey} fontSize={14}>
              Promo Code:
            </Txt>
            <Space />
            <Txt color={COLORS.orangeYellow} fontSize={17}>
              HELLOFRESH-INTHETOW
            </Txt>
          </View>
          <TouchableOpacity>
            <Image source={icon24Copy} />
          </TouchableOpacity>
        </View> */}

        <Space space={20} />

        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 20,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Txt>Scan the code below:</Txt>
          <Space space={20} />
          <Image source={codeQR} />
        </View>

        <Space space={120} />
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          backgroundColor: COLORS.white,
          bottom: 0,
          width: "100%",
          height: 90,
        }}
      >
        <Space space={10} />
        <PrimaryButtonLinear
          width={"90%"}
          onPress={() => {
            // handleSubmit();
          }}
          disabled={true}
        >
          Go to Hello Fresh now!
        </PrimaryButtonLinear>
        <Space space={10} />

        <Line height={3} color={COLORS.blueGreen} />
        <Space space={5} />
      </View>
    </SafeAreaView>
  );
};

export default DetailsEntertainment;

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
    height: 152,
  },
  categories: {
    width: SIZES.width,
  },

  itemback: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  Left: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: "80%",
    lineHeight: 15,
  },
});

{
  /* <TouchableOpacity
        style={styles.Item}
        onPress={() => {
          if (item.to) {
            navigation.navigate(item.to);
          } else {
            return;
          }
        }}
      >
        <View style={styles.Left}>
          <Image source={item.url} style={{ marginRight: 10 }} />
          <View style={styles.box}>
            <Txt>{item.title}</Txt>
            <Txt color={COLORS.coolGrey} fontSize={12}>
              {item.description}
            </Txt>
          </View>
        </View>
        <View>
          <Txt>{item.day}</Txt>
        </View>
      </TouchableOpacity> */
}
