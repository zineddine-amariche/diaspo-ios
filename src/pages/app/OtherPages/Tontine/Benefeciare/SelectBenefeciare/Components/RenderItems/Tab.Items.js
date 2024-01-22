import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TabBar } from "react-native-tab-view";
import { Txt } from "../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../theme";

const TabItems = (props) => {
  const { navigationState } = props;

  return (
    <TabBar
      {...props}
      renderLabel={({ focused, route }) => {
        return (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {focused ? (
              <Image source={route.img} />
            ) : (
              <Image source={route.Imgdisable} />
            )}
            <View style={{ marginLeft: 10 }}>
              <Txt
                fontSize={14}
                style={{
                  color: focused ? COLORS.blueGreen : COLORS.silver,
                }}
                size={16}
                color={focused ? COLORS.blueGreen : COLORS.slateGrey}
              >
                {route.title}
              </Txt>
              <Txt
                fontSize={14}
                style={{
                  color: focused ? COLORS.blueGreen : COLORS.silver,
                  fontSize: 14,
                }}
                size={16}
                color={focused ? COLORS.blueGreen : COLORS.slateGrey}
              >
                {route.sous}
              </Txt>
            </View>
          </View>
        );
      }}
      indicatorStyle={[
        styles.indicatorStyle,
        { marginLeft: navigationState.index === 0 ? 15 : 0 },
      ]}
      style={styles.tabBar}
    />
  );
};

export default TabItems;

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
      },
      indicatorStyle: {
        backgroundColor: COLORS.blueGreen,
        height: 4.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignSelf: "center",
        bottom: -1,
      },
});
 
