import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../components/views/Rectangle-Home";
import banner from "../../../../../Assets/Img/banner.png";

const Events = () => {
  return (
    <Rectangle title={"Events & Campaigns"} style={{paddingVertical:10}}>
      <View style={styles.Box}>
        <Image source={banner} />
      </View>
    </Rectangle>
  );
};

export default Events;

const styles = StyleSheet.create({
  Box: { alignSelf: "center", borderRadius: 8, marginBottom: 10 },
});
