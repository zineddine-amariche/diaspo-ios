import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Icons } from "../../../components/icons/Icons";
import Home from "../../../pages/app/Home";
import Wallet from "../../../pages/app/Wallet";
import Puzzle from "../../../pages/app/Discount";
import Analysis from "../../../pages/app/Analysis";
import { COLORS } from "../../../theme";
import Search from "../../../components/TabBarre/Icons/Search";

const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Ionicons,
    activeIcon: "home",
    inActiveIcon: "home-outline",
    component: Home,
    Icon: Search,
    Notification: false,
  },

  {
    route: "Wallet",
    label: "Wallet",
    type: Icons.Ionicons,
    activeIcon: "wallet",
    inActiveIcon: "wallet-outline",
    component: Wallet,
    Icon: Search,
    Notification: false,
  },

  {
    route: "Puzzle",
    label: "Puzzle",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "puzzle",
    inActiveIcon: "puzzle-outline",
    component: Puzzle,
    Icon: Search,
    Notification: false,
  },
  {
    route: "Analysis",
    label: "Analysis",
    type: Icons.Ionicons,
    activeIcon: "analytics",
    inActiveIcon: "analytics-outline",
    component: Analysis,
    Icon: Search,
    Notification: false,
  },
];
const Tab = createBottomTabNavigator();

const animate1 = {
  0: { scale: 0.5, translateY: 3 },
  0.92: { translateY: -14 },
  1: { scale: 1.2, translateY: -14 },
};

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const scanRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      });
    }

    // if (item.label === "Scann") {
    //   viewRef.current.animate({
    //     0: { scale: 1.8, rotate: "0deg" },
    //     1: { scale: 1.8, rotate: "360deg" },
    //   });

    //   scanRef.current.animate({
    //     0: { scale: 0.5, translateY: 3 },
    //     0.92: { translateY: -14 },
    //     1: { scale: 1.2, translateY: -14 },
    //   })
    // }
  }, [focused]);
};

export default function AnimTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          bottom: 0,
          right: 0,
          left: 0,
          borderTopLeftRadius: 1,
          borderTopRightRadius: 1,
          paddingBottom: 15,
        },
      }}
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NbrItem: {
    position: "absolute",
    zIndex: 100,
    top: 5,
    backgroundColor: COLORS.Rouge,
    height: 20,
    width: 20,
    right: 55,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
