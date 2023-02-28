import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import notification from "../../../Assets/Img/icon24BellDefault.png";
import search from "../../../Assets/Img/icon24SearchDefault.png";
import next from "../../../Assets/Img/icon24ChevronRightDefault(2).png";
import HView from "../../views/HView/HView";
import { COLORS } from "../../../theme";
import { Head, Txt } from "../../utils";
import { useSelector } from "react-redux";

const PrimaryHead = ({
  openDrawer,
  Analysis,
  title,
  Navigate,
  soustitre,
  navigation,
}) => {
  return (
    <View style={styles.header}>
      <HView style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={openDrawer}>
          <View
            style={{ height: 4, width: 25, backgroundColor: COLORS.white }}
          ></View>
          <View
            style={{ height: 4, width: 25, backgroundColor: COLORS.white }}
          ></View>
        </TouchableOpacity>

        <Head color={COLORS.white} fontSize={24}>
          {title}
        </Head>
      </HView>
      {Analysis ? (
        <TouchableOpacity onPress={Navigate}>
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
          <TouchableOpacity
            onPress={() => {
              navigation();
            }}
          >
            <View style={{ position: "relative" }}>
              <Image source={notification} />
              <Notif />
            </View>
          </TouchableOpacity>
        </HView>
      )}
    </View>
  );
};

export default PrimaryHead;

const Notif = () => {
  const { invitations } = useSelector((state) => ({
    ...state.storeNotifications,
  }));

  // console.log("invitations", invitations);

  return invitations.length == 0 ? null : (
    <View
      style={{
        position: "absolute",
        backgroundColor: COLORS.coral,
        borderRadius: 10,
        alignItems: "center",
        height: 15,
        width: 15,
        justifyContent: "center",
        top: 10,
        left: -4,
      }}
    >
      <Text style={{ color: COLORS.white, fontSize: 10, fontWeight: "700" }}>
        {invitations.length}

      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    paddingLeft: 25,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    alignItems: "center",
    height: 30,
    justifyContent: "space-evenly",
    paddingRight: 15,
  },
});
