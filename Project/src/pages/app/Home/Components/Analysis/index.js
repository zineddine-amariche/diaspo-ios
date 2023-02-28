import { StyleSheet, Text, View } from "react-native";
import Rectangle from "../../../../../components/views/Rectangle-Home";
import * as React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { COLORS } from "../../../../../theme";
import HView from "../../../../../components/views/HView/HView";
import IncomeExpenses from "../../../../../components/views/InComeExpenseView";
import Route1 from "./components/Routes/Route-1";
import Route3 from "./components/Routes/Route-3";
import Route2 from "./components/Routes/Route-2";

const renderScene = SceneMap({
  first: Route1,
  second: Route2,
  third: Route3,
});

const Analysis = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Last 7 days" },
    { key: "second", title: "This Month" },
    { key: "third", title: "Last 6 Months" },
  ]);

  return (
    <Rectangle title={"Analysis"} swiper={true} style={{paddingVertical:10}}>
    <View style={{height:260}}>

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
      <HView spaceBetween style={{ padding: 20 }}>
        <IncomeExpenses
          lable={"Income"}
          price={"1,625.50"}
          color={true}
          currency={"euro"}
        />
        <View style={styles.lineVertical} />
        <IncomeExpenses
          lable={"Expenses"}
          price={"1,625.50"}
          color={false}
          currency={"euro"}
        />
      </HView>
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
});

