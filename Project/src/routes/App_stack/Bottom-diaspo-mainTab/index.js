import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../../pages/app/Home";
import Wallet from "../../../pages/app/Wallet";
import Analysis from "../../../pages/app/Analysis";
import { Txt } from "../../../components/utils";
import HomeImg from "../../../Assets/Img/icon24HomeActive.png";
import icon24WalletDefault from "../../../Assets/Img/icon24WalletDefault.png";
import icon24PulseDefault from "../../../Assets/Img/icon24PulseDefault.png";
import icon24FormDefault from "../../../Assets/Img/icon24FormDefault.png";
import { COLORS } from "../../../theme";
import Discount from "../../../pages/app/Discount";
// const TabArr = [
//   {
//     route: "Home",
//     label: "Home",
//     type: Icons.Ionicons,
//     activeIcon: "home",
//     inActiveIcon: "home-outline",
//     component: Home,
//     Icon: Search,
//     Notification: false,
//   },

//   {
//     route: "Wallet",
//     label: "Wallet",
//     type: Icons.Ionicons,
//     activeIcon: "wallet",
//     inActiveIcon: "wallet-outline",
//     component: Wallet,
//     Icon: Search,
//     Notification: false,
//   },

//   {
//     route: "Scann",
//     label: "Scann",
//     type: Icons.MaterialCommunityIcons,
//     activeIcon: "qrcode-scan",
//     inActiveIcon: "qrcode-scan",
//     component: Scann,
//     Icon: Search,
//     // Notification: Carts?.length ? true : false,
//     Notification: false,
//   },

//   {
//     route: "Puzzle",
//     label: "Puzzle",
//     type: Icons.MaterialCommunityIcons,
//     activeIcon: "puzzle",
//     inActiveIcon: "puzzle-outline",
//     component: Puzzle,
//     Icon: Search,
//     Notification: false,
//   },
//   {
//     route: "Analysis",
//     label: "Analysis",
//     type: Icons.Ionicons,
//     activeIcon: "analytics",
//     inActiveIcon: "analytics-outline",
//     component: Analysis,
//     Icon: Search,
//     Notification: false,
//   },
// ];
const Tab = createBottomTabNavigator();

const CustomMidlTab = ({ children, onPress }) => {
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.blueGreen,
      }}
    >
      {children}
    </View>
  </TouchableOpacity>;
};

const DiaspoBottomTab = () => {
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
          position: "absolute",
          zIndex: -1,
        },
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          //   tabBarIconStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={HomeImg}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.blueGreen : COLORS.linBlue,
                }}
              />
              <Txt
                Bold={"400"}
                fontSize={14}
                color={focused ? COLORS.blueGreen : COLORS.linBlue}
              >
                Home
              </Txt>
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={"Wallet"}
        component={Wallet}
        options={{
          //   tabBarIconStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={icon24WalletDefault}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.blueGreen : COLORS.linBlue,
                }}
              />
              <Txt
                Bold={"400"}
                fontSize={14}
                color={focused ? COLORS.blueGreen : COLORS.linBlue}
              >
                Wallet
              </Txt>
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      {/* <Tab.Screen
        name={"Scann"}
        component={Scann}
        options={{
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={[ COLORS.lightNavy,COLORS.dirtyBlue]}
              style={{
                paddingVertical:18, 
                paddingHorizontal:20, 
                // top:30,
                borderRadius:14,
                elevation:4,
                position:"absolute",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  borderRadius: 16,
                }}
              >
                <Image
                  source={payIcon}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? COLORS.linBlue : COLORS.linBlue,
                  }}
                />
              </View>
            </LinearGradient>
          ),
          tabBarShowLabel: false,

          //   tabBarButton: (props) => <CustomMidlTab {...props} />,
        }}
      /> */}
      <Tab.Screen
        name={"Discount"}
        component={Discount}
        options={{
          //   tabBarIconStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={icon24FormDefault}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.blueGreen : COLORS.linBlue,
                }}
              />
              <Txt
                Bold={"400"}
                fontSize={14}
                color={focused ? COLORS.blueGreen : COLORS.linBlue}
              >
                Discount

              </Txt>
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name={"Analysis"}
        component={Analysis}
        options={{
          //   tabBarIconStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={icon24PulseDefault}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.blueGreen : COLORS.linBlue,
                }}
              />
              <Txt
                Bold={"400"}
                fontSize={14}
                color={focused ? COLORS.blueGreen : COLORS.linBlue}
              >
                Analysis
              </Txt>
            </View>
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default DiaspoBottomTab;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.darkBlueGrey,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
