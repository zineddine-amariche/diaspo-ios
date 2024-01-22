import React, { useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import Tab from "./Tab";
import User from "./Icons/User";
import Adresss from "./Icons/Adresse";
import Search from "./Icons/Search";
import Shop from "./Icons/Shop";
import { ICON_SIZE, PADDING, SEGMENT } from "./Icons/Constants";
import { Value } from "react-native-reanimated";


const tabs = [
  { icon: <Search /> },
  { icon: <Adresss /> },
  { icon: <Shop /> },
  { icon: <User /> },
];
const styles = StyleSheet.create({
  container: {
    backgroundColor:"#FFF",

  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",

  },
  tab: {
    width: SEGMENT,
    height: ICON_SIZE + PADDING * 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const [active, setActive] = useState(0);
  // const active = new Value(0)
  return ( 
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map(({ icon }, index) => (
          <View key={index} style={styles.tab}>
            <Tab onPress={() => setActive(index)} {...{ active, index }}>
              {icon}
            </Tab>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};
