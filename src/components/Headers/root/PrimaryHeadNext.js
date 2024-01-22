import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import notification from "../../../Assets/Img/icon24BellDefault.png";
import search from "../../../Assets/Img/icon24SearchDefault.png";
import next from "../../../Assets/Img/icon24ChevronRightDefault(2).png";
import prev from "../../../Assets/Img/icon24ChevronLeftDefault3.png";
import HView from "../../views/HView/HView";
import { COLORS } from "../../../theme";
import { Head, Txt } from "../../utils";
import Space from "../../Space";
const PrimaryHeadNext = ({ onPress, Analysis ,title,Navigate,soustitre,soustitreReturn}) => {
  return (
    <View style={styles.header}>
      <HView>
      <TouchableOpacity 
        onPress={onPress}
          >
          <HView>
            <Image source={prev} style={{}} />
            <Txt color={COLORS.white} fontSize={17} style={{ marginBottom: 4 }}>
              {soustitreReturn}
            </Txt>
          </HView>
        </TouchableOpacity>
      </HView>

        <Head color={COLORS.white} fontSize={24}>
          {title}
        </Head>
      {Analysis ? (
        <TouchableOpacity 
        onPress={Navigate}
          >
          <HView>
            <Txt color={COLORS.white} fontSize={17} style={{ marginBottom: 4 }}>
              {soustitre}
            </Txt>
            <Image source={next} style={{}} />
          </HView>
        </TouchableOpacity>
      ) : (
        <HView>
          <Image source={search} style={{ marginRight: 10 }} />
          <Image source={notification} />
        </HView>
      )}
    </View>
  );
};

export default PrimaryHeadNext;

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 10,
  },
  button: {
    alignItems: "center",
    height: 30,
    justifyContent: "space-evenly",
    paddingRight: 15,
  },
});
