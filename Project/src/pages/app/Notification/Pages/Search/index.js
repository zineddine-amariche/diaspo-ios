import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { ImageBackground } from "react-native";
import { COLORS, SIZES } from "../../../../../theme";
import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import Space from "../../../../../components/Space";
import SearchNotification from "../../../../../components/Headers/root/SearchNotification";
import ImgSearch from '../../../../../Assets/Img/Notification/group24.png';
import { Image } from "react-native";
import { Txt } from "../../../../../components/utils";

const SearchNotifications = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />

      <SearchNotification
        goBack={() => {
          navigation.navigate('Notifications');
        }}
        title={"Notifications"}
        Cancel="Return"
        Notifications
      />
      <Space space={40} />
        <ScrollView contentContainerStyle={{  }}>
          <View style={{marginTop:20,   alignItems:'center',padding:20}}>
            <Image source={ImgSearch} /> 
            <Space space={40} />
            <Txt fontSize={17} color={COLORS.darkBlueGrey}>Search for notifications</Txt>
            <Space />
            <Txt fontSize={14}  color={COLORS.slateGrey} >Find notifications, promotions, updates</Txt>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default SearchNotifications;

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
});
