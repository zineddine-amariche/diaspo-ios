import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { ImageBackground } from "react-native";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import SecondaryHeader from "../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../components/Space";
import { COLORS, SIZES } from "../../../../../theme";
import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import { Txt } from "../../../../../components/utils";

import background from "../../../../../Assets/Img/Entrainment/backgroundImgIMG.png";
import SearchHeader from "../../../../../components/Headers/root/SearchHeader";

const Data = [
  {
    title: "Hello Fresh in the town",
    description: "Get $60 discount and $3 cashback",
    url: require("../../../../../Assets/Img/Entrainment/1IMG.png"),
    day: "35",
  },
  {
    title: "Bloom & Wild: 30% off",
    description: "30% discount for new customers",
    url: require("../../../../../Assets/Img/Entrainment/2IMG.png"),
    day: "325",
  },
  {
    title: "CME: Follow your passion",
    description: "The fisrt, fifth and tenth box for free",
    url: require("../../../../../Assets/Img/Entrainment/3IMG.png"),
    day: "15",
  },
  {
    title: "Get Your Guide",
    description: "Get $60 discount and $3 cashback",
    url: require("../../../../../Assets/Img/Entrainment/4IMG.png"),
    day: "5",
  },
  {
    title: "Go Green Organic",
    description: "Get 10% discount on your next booking",
    url: require("../../../../../Assets/Img/Entrainment/5IMG.png"),
    day: "105",
  },
  {
    title: "Cám: Summer Time",
    description: "Summer season sale event in the year",
    url: require("../../../../../Assets/Img/Entrainment/6IMG.png"),
    day: "55",
  },
  {
    title: "Get Your Guide",
    description: "Get $60 discount and $3 cashback",
    url: require("../../../../../Assets/Img/Entrainment/4IMG.png"),
    day: "5",
  },
  {
    title: "Go Green Organic",
    description: "Get 10% discount on your next booking",
    url: require("../../../../../Assets/Img/Entrainment/5IMG.png"),
    day: "105",
  },
  {
    title: "Cám: Summer Time",
    description: "Summer season sale event in the year",
    url: require("../../../../../Assets/Img/Entrainment/6IMG.png"),
    day: "55",
  },
];

const Entertainment = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />

      <SearchHeader
        goBack={() => {
          navigation.goBack();
        }}
        title={"Entertainment"}
        Cancel="Return"
      />
      <Space space={10} />
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        <Space />
        <View style={{ marginHorizontal: 20 }}>
          <Txt>23 discounts & vouchers</Txt>
          <Space />
        </View>
        <View style={styles.categories}>
          {Data.map((i, index) => {
            return (
              <View key={index}>
                <RenderItem item={i} index={index} navigation={navigation} />
              </View>
            );
          })}
        </View>
        <Space space={20} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Entertainment;

const RenderItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 90,
        marginBottom: 5,
      }}
      onPress={() => {
        navigation.navigate("DetailsEntertainment", { item });
      }}
    >
      <ImageBackground style={styles.itemback} source={background}>
        <View style={styles.Left}>
          <Image
            source={item.url}
            style={{ marginLeft: 30, marginRight: 10 }}
          />
          <View>
            <Txt numberOfLines={1} style={{ width: "85%" }}>
              {item.title}
            </Txt>
            <Space space={3} />
            <Txt style={styles.box} color={COLORS.coolGrey} fontSize={12}>
              {item.description}
            </Txt>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            right: 25,
            width: 45,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Txt fontSize={24} lineHeight={29} color={COLORS.white}>
            {item.day}
          </Txt>
        </View>
        <View style={{ position: "absolute", right: 20, bottom: 16 }}>
          <Txt fontSize={12} color={COLORS.white}>
            days left
          </Txt>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

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

