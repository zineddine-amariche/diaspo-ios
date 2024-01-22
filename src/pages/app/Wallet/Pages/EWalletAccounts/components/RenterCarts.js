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
    <View
      elevation={0.2}
      title={"Wallet Connection"}
      swiper
      style={{
        marginTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        borderRadius:24,
        paddingVertical:20,

      }}
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
    
    </View>
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
