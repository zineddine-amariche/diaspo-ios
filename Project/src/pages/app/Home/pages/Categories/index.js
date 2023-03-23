import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ImageBackground } from "react-native";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import SecondaryHeader from "../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../components/Space";
import { COLORS, SIZES } from "../../../../../theme";
import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import imgRow from "../../../../../Assets/Img/categories/defaultIMG.png";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { Txt } from "../../../../../components/utils";
import ReturnHeader from "../../../../../components/Headers/root/ReturnHeader";

const Data = [
  {
    title: "Entertainment",
    description: "23 discounts & vouchers",
    url: require("../../../../../Assets/Img/categories/creditCards.png"),
    to:'Entertainment'
  },
  {
    title: "Food & Beverage",
    description: "31 discounts & vouchers",
    url: require("../../../../../Assets/Img/categories/bankAccountsIMG.png"),
    to:false
  
  },
  {
    title: "Health & Fitness",
    description: "17 discounts & vouchers",
    url: require("../../../../../Assets/Img/categories/icon24ElectricBike.png"),
    to:false

  },
  {
    title: "Transportation",
    description: "11 discounts & vouchers",
    url: require("../../../../../Assets/Img/categories/transport.png"),
    to:false

  },
  {
    title: "Shopping",
    description: "53 discounts & vouchers",
    url: require("../../../../../Assets/Img/categories/market.png"),
    to:false

  },
  {
    title: "Gaming",
    description: "16 discounts & vouchers",
    url: require("../../../../../Assets/Img/categories/icon24Gamepad.png"),
    to:false

  },
  {
    title: "Hotel",
    description: "12 discounts & vouchers",
    url: require("../../../../../Assets/Img/categories/hotel.png"),
    to:false

  },

  {
    title: "Others",
    description: "09 discounts & vouchers",
    url: require("../../../../../Assets/Img/categories/icon24Sticker.png"),
    to:false

  },
];

const Categories = ({ navigation }) => {
  return (
    // <SafeAreaView style={styles.container}>
    //   <StatusBar translucent={true} backgroundColor={"transparent"} />
    //   <ImageBackground style={styles.ImageBackground} source={ImgBack} />

    //   <SecondaryHeader
    //     goBack={() => {
    //       navigation.goBack();
    //     }}
    //     title={"Categories"}
    //     Cancel="Return"
    //   />


<ReturnHeader
         title={"Categories"}
      goBack={() => {
        navigation.goBack();
      }}>
      <Space space={10} />
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        <Space />
        <View style={styles.categories}>
          {Data.map((i, index) => {
            return (
              <View key={index}>
                <RenderItem item={i} index={index} navigation={navigation}/>
              </View>
            );
          })}
        </View>
        <Space space={120} />
      </ScrollView>
    </ReturnHeader>
  );
};

export default Categories;

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
  categories: {
    flex: 1,
    width: SIZES.width - 30,
  },
  Item: {
    height: 80,
    marginVertical: 5,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    justifyContent: "space-between",
  },
  Left: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const RenderItem = ({ item ,navigation}) => {
  return (
    <TouchableOpacity style={styles.Item} 
      onPress={()=>{
        if(item.to){
          navigation.navigate(item.to)
        }else{
          return
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
        <Image source={imgRow} />
      </View>
    </TouchableOpacity>
  );
};
