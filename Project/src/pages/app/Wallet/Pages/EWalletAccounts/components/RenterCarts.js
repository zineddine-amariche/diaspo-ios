import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Rectangle from "../../../../../../components/views/Rectangle";
import { Txt } from "../../../../../../components/utils";
import HView from "../../../../../../components/views/HView/HView";
import imaPoint from "../../../../../../Assets/Img/icon24More.png";
import { COLORS } from "../../../../../../theme";
import Space from "../../../../../../components/Space";
const RenterCarts = ({ item, onPress, connected }) => {
  return (
    <Rectangle
      elevation={0.2}
      title={"Wallet Connection"}
      swiper
      style={{
        paddingVertical: 10,
        width: "90%",
        marginTop: 20,
        paddingHorizontal: 10,
      }}
      radius={24}
    >
    
        <>
          <HView spaceBetween>
            <Image source={item.source} />
            <TouchableOpacity
              onPress={onPress}
              style={{ position: "absolute", top: 10, right: 10 }}
            >
              <Image source={imaPoint} />
            </TouchableOpacity>
          </HView>
          <View style={styles.points}>
            <Txt fontSize={12} color={COLORS.coolGrey}>
              Phone Number
            </Txt>

            <HView spaceBetween width={"100%"}>
              <Txt lineHeight={30} color={COLORS.darkBlueGrey} fontSize={17}>
                {item.nameNumber}
              </Txt>
              <View style={styles.button}>
                <Txt color={COLORS.greenishTeal}>Connected</Txt>
              </View>
            </HView>
          </View>
        </>
    
    </Rectangle>
  );
};

export default RenterCarts;

const styles = StyleSheet.create({
  points: {
    marginTop: 10,
    paddingLeft: 20,
  },
  button: {
    backgroundColor: COLORS.lightSage,
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
  },
});
