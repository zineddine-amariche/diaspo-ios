import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

// import Icon, { Icons } from "../../Components/Icons/Icons";
import LinearGradient from "react-native-linear-gradient";
import Home from "../../../pages/app/";
import Wallet from "../../../pages/app/Wallet";
import Discount from "../../../pages/app/Discount";
import Analysis from "../../../pages/app/Analysis";
import Icon, { Icons } from "../../../components/icons/Icons";
import { COLORS, SIZES } from "../../../theme";
import Space from "../../../components/Space";
import Scann from "../../../pages/app/Scann";
const TabArr = [
  {
    route: "Home",
    label: "Home",
    type: Icons.Ionicons,
    activeIcon: "home-sharp",
    inActiveIcon: "home-outline",
    component: Home,
    //   Icon: Search,
    Notification: false,
    gradient: false,
  },

  {
    route: "Wallet",
    label: "Wallet",
    type: Icons.Ionicons,
    activeIcon: "wallet",
    inActiveIcon: "wallet-outline",
    component: Wallet,
    //   Icon: Search,
    Notification: false,
    gradient: false,
  },
  {
    route: "Scann",
    label: "Scann",
    type: Icons.MaterialCommunityIcons,
    activeIcon: "qrcode-scan",
    inActiveIcon: "qrcode-scan",
    component: Scann,
    //   Icon: Search,
    Notification: false,
    gradient: true,
  },
  {
    route: "Discount",
    label: "Discount",
    type: Icons.Ionicons,
    activeIcon: "apps-sharp",
    inActiveIcon: "apps-outline",
    component: Discount,
    //   Icon: Search,
    Notification: false,
    gradient: false,
  },
  {
    route: "Analysis",
    label: "Analysis",
    type: Icons.Ionicons,
    activeIcon: "stats-chart",
    inActiveIcon: "stats-chart-outline",
    component: Analysis,
    //   Icon: Search,
    Notification: false,
    gradient: false,
  },
];
const Tab = createBottomTabNavigator();

const TabButton = (props) => {

  // console.log('props', props)
  const { item, onPress, accessibilityState } = props;
  // const focused = accessibilityState.selected;
  const focused = true
  const viewRef = useRef(null);

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
  }, [focused]);

  return (
<View style={{height:120, backgroundColor:"#ccc", width:'100%'}}>

    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        backgroundColor:'#eee',
      }}
    >


        <Animatable.View ref={viewRef} duration={1000} >
          {true ? (
            <LinearGradient
              colors={[COLORS.blueGreen, COLORS.blueGreen]}
              start={{ x: focused ? 0 : 1, y: 0 }}
              end={{ x: focused ? 1 : 0, y: 0 }}
              style={styles.middleIcon}
            >
              <Icon
                // name={"qrcode-scan"}
                // type={"MaterialCommunityIcons"}
                // color={"white"}

                size={20}
                // type={item.type}
                type={Icons.Ionicons}
                // name={focused ? item.activeIcon : item.inActiveIcon}
                name={"home"}
                color={focused ? COLORS.blueGreen : COLORS.slateGrey}
              />
            </LinearGradient>
          ) : (
            <View style={styles.icon}>
              {/* <AppIcon name={icon} type={type} size={size} color={color} /> */}

              <Icon
                type={Icons.Ionicons}
                name={"home"}

                // type={item.type}
                // name={focused ? item.activeIcon : item.inActiveIcon}
                color={focused ? COLORS.blueGreen : COLORS.slateGrey}
              />
            </View>
          )}
        </Animatable.View>
      {/* <Txt color={focused ? COLORS.blueGreen : COLORS.slateGrey} fontSize={13}>
        {item.label}
      </Txt> */}
      <Space space={3} />
    </TouchableOpacity>
</View>
  );
};

export default function AnimTab1() {
  //   const FixCarts = useSelector((state) => state.FixCarts);
  //   const { Carts } = FixCarts;

  //   useEffect(() => {
  //     if (Carts.length == 0) {
  //       AsyncStorage.removeItem("Cart", null);
  //     } else {
  //       AsyncStorage.setItem("Cart", JSON.stringify(Carts));
  //     }
  //   }, [Carts]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          bottom: 0,
          right: 0,
          left: 0,
          borderTopLeftRadius: 1,
          borderTopRightRadius: 1,
          zIndex: -1,
          backgroundColor:'#7798',
          height:60,
        },
      }}
      tabBar={(props) => <TabButton {...props} />}

    >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              // options={{
              //   tabBarShowLabel: false,
              //   tabBarButton: (props) => (
              //     <TabButton {...props} item={item} Carts={false} />
              //   ),
              // }}
            />
          );
        })}

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

  container: {
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#e77",
    paddingTop: -20,
  },
  middleIcon: {
    bottom: 18,
    width: 70,
    height: 70,
    borderRadius: 70,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
