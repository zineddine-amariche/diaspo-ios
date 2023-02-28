import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import HView from "../HView/HView";
import { COLORS } from "../../../theme";
import { Head, Txt } from "../../utils";
import Line from "../line";
import Space from "../../Space";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import notfi from "../../../Assets/Img/Notification/3img.png";

const ReactangleNotification = ({ data, title, navigation }) => {
  // console.log("Data ---- Inviations ", data);

  return (
    <View style={{ flex: 1 ,}}>
      {data?.length ? (
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Head style={{}}>{title}</Head>
        </View>
      ) : null}
      <Space />
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 6,
          width: "90%",
          alignSelf: "center",
        }}
      >
        {data?.map((item, index) => {
          return (
            <View key={index} style={{overflow:'hidden',}}>
              <RenderItem
                navigation={navigation}
                item={item}
                index={index}
                lenght={data.length - 1}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ReactangleNotification;

const RenderItem = ({ item, index, lenght, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(item.data.navigate , {
          data: item,
          isBackground: false,
        });
        // console.log("item.navigate", item.data.navigate);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          backgroundColor: COLORS.white,
        }}
      >
        <Image
          source={item.img ? item.img : notfi}
          style={{ marginHorizontal: 10 }}
        />
        <View>
          <Txt fontSize={14} color={COLORS.darkBlueGrey}>
            {item.data ? item.data.title : item.title}
          </Txt>
          <Txt numberOfLines={1} style={{width:"80%",paddingRight:4}} fontSize={12} color={COLORS.coolGrey}>
            {item?.data?.bodyText ? item.data.bodyText: item.message}
          </Txt>
          <Txt fontSize={11} color={COLORS.darkSkyBlue}>
            {item.time
              ? item.time
              : moment().startOf(item.data.timer).fromNow()}
          </Txt>
        </View>
      </View>
      {index === lenght ? null : (
        <Line
          height={2}
          style={{ backgroundColor: COLORS.paleGrey }}
          color={COLORS.silverTwo}
          width="90%"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
