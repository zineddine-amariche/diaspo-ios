import { ScrollView, StyleSheet, Text, View } from "react-native";
import Rectangle from "../../../../../components/views/Rectangle-Home";
import * as React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLORS } from "../../../../../theme";

import Route1 from "./components/Routes/Route-1";
import Route3 from "./components/Routes/Route-3";
import Route2 from "./components/Routes/Route-2";

// const renderScene = SceneMap({
//   first: Route1,
//   second: Route2,
//   third: Route3,
//   fourth: Route4,
// });

const Analysis = ({ handlePresentModalPress }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Weekly" },
    { key: "second", title: "Monthly" },
    { key: "third", title: "Yearly" },
    { key: "fourth", title: "Others" },
  ]);
  let height = 8*200

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <Route1 handlePresentModalPress={handlePresentModalPress} />;
      case "second":
        return <Route1 />;
      case "third":
        return <Route1 />;
      case "fourth":
        return <Route1 />;
    }
  };

  return (
    <Rectangle
      title="4 Active Plans"
      style={{}}
      index={index}
      elevation={false}
      swiper={true}
    >
        <View style={{ height }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={(index) => setIndex(index)}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
            removeClippedSubviews={false}
            swipeEnabled
            swipeVelocityImpact={0.2}
            gestureHandlerProps={{
              activeOffsetX: [-30, 30], // To solve swipe problems on Android
            }}
          />
        </View>
    </Rectangle>
  );
};

export default Analysis;

const renderTabBar = (props) => {
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
            <Text
              style={{
                color: focused ? COLORS.blueGreen : COLORS.silver,
                fontWeight: "700",
                textAlign: "center",
                width: "100%",
                fontSize: 12,
              }}
              size={16}
              color={focused ? COLORS.blueGreen : COLORS.slateGrey}
            >
              {route.title}
            </Text>
          </View>
        );
      }}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBar}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFF",
    borderColor: COLORS.black,
    width: "100%",
    marginVertical: 10,
  },

  lineVertical: {
    height: 45,
    width: 1,
    backgroundColor: COLORS.lightBlueGrey,
  },
  BoxContainerInfo: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 20,
  },
  etat: {
    width: 3,
    height: 20,
    marginHorizontal: 10,
  },
  txtContainer: {
    alignItems: "flex-end",
  },
  txtContainer2: {
    alignItems: "flex-start",
  },
  Left: {
    marginTop: 14,
    alignItems: "flex-end",
  },
  right: {
    marginTop: 14,
  },
  center: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  tabBar: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.black,
    width: "100%",
  },
  indicatorStyle: {
    backgroundColor: COLORS.blueGreen,
    padding: 2.5,
    marginBottom: -2,
    borderRadius: 20,
  },
  lineVertical: {
    height: 45,
    width: 1,
    backgroundColor: COLORS.lightBlueGrey,
  },
  Tabs: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.paleGrey,
  },
  RecentTransaction: {
    backgroundColor: COLORS.white,
    width: "94%",
    alignSelf: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 5,
    flex: 1,
  },
  circles: {
    height: 18,
    width: 18,
    backgroundColor: "#FFF",
    borderRadius: 200,
    borderWidth: 3,
    borderColor: COLORS.blueGreen,
    marginHorizontal: 5,
  },
  circles2: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.blueGreen,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: COLORS.white,
    marginHorizontal: 5,
  },
});
