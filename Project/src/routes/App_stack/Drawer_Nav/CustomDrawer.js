import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Drawer,
} from "react-native-paper";

import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import icon24X from "../../../Assets/Img/icon24X.png";
import icon2 from "../../../Assets/Img/FSQFmXo0Ul.png";
import icon3 from "../../../Assets/Img/icon24ChevronRightDefault(2).png";
import { Head, Txt } from "../../../components/utils";
import { COLORS } from "../../../theme";
import Space from "../../../components/Space";
import LinearGradient from "react-native-linear-gradient";
import HView from "../../../components/views/HView/HView";
import Line from "../../../components/views/line";
import { PaleGreyButton, PrimaryButton } from "../../../components/Buttons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Logout } from "../../../redux/Features/authentification/Login/Slice";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";

export function DrawerContent(props) {
  const navigation = useNavigation();

 


  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage?.data?.navigate,{data:remoteMessage, isBackground:true});
    });
    return unsubscribe
  }, []);



 

  const { t, i18n } = useTranslation ( );

  const t1  = t("Settings.button1")
  const t2  = t("AboutDiaspora.button1")
  const t3  = t("TermsConditions.button1")
  const t4  = t("PrivaciPolicy.button1")
  const t5  = t("ContactUs.button1")
  const B1  = t("Settings.button2")
  const B2  = t("Settings.titleDrawer")


  const Menue = [
    {
      name: t1,
      url: require("../../../Assets/Img/icon5.png"),
      path: "Settings",
    },
    {
      name: t2,
      url: require("../../../Assets/Img/icon4.png"),
      path: "AboutDiaspora",
    },
    {
      name: t3,
      url: require("../../../Assets/Img/icon3.png"),
      path: "TermsConditions",
    },
    {
      name: t4,
      url: require("../../../Assets/Img/icon2.png"),
      path: "PrivaciPolicy",
    },
    {
      name: t5,
      url: require("../../../Assets/Img/icon1.png"),
      path: "ContactUs",
    },
  ];


  const [isEnabled, setIsEnabled] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const clearAsyncStorage = async () => {
    dispatch(Logout());
    AsyncStorage.clear();
  };


  const {informationsUser} = useSelector(state => state.userInformations);

//  console.log('informationsUser', informationsUser)

  return (
    <SafeAreaView style={{ flex: 1,  }}>
      <LinearGradient
        style={styles.bottomSheetContainer}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[COLORS.dirtyBlue, COLORS.lightNavy]}
      ></LinearGradient>
      <Space space={30} />
        <Space space={30} />
        <HView>
          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
            style={{paddingLeft:15}}
          >
            <Image source={icon24X} style={styles.close} />
          </TouchableOpacity>
          <Txt color={COLORS.white} fontSize={20} >
            {B2}
          </Txt>
        </HView>
        <Space space={10} />
      <DrawerContentScrollView  >

        <View style={{paddingLeft:15}}>

        <Drawer.Section>
        <View {...props} contentContainerStyle={{backgroundColor:'#ccc'}}>
          <View style={styles.drawerContent}>
            <TouchableOpacity style={styles.userInfoSection}
            
              onPress={()=>{
                props.navigation.navigate('AccountInfo')
              }}
            >
              <HView>
                <Avatar.Image source={icon2} size={66} />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <View>
                    <Head color={COLORS.white} fontSize={20}>
                    {informationsUser?.data?.walletAccountUser?.firstName}{" "}
                    {informationsUser?.data?.walletAccountUser?.lastName}

                    </Head>
                    <Txt fontSize={14} color={COLORS.white}>
                      {informationsUser?.data?.walletAccountUser?.email}
                    </Txt>
                    <Space space={5} />
                    <Txt fontSize={14} color={COLORS.white}>
                    {informationsUser?.data?.walletAccountUser?.mobileNumber}
                    </Txt>
                  </View>
                </View>
                <Image source={icon3} style={{ marginLeft: 7 }} />
              </HView>
            </TouchableOpacity>
            <Space space={20} />

            <Drawer.Section style={styles.drawerSection}>
                  {Menue.map((item, index) => {
                    return (
                      <View key={index}>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate(item.path);
                          }}
                        >
                          <HView
                            label="Commande du jour "
                            style={styles.drawerItem}
                          >
                            <View style={styles.BoxIcon}>
                              <Image source={item.url} />
                            </View>
                            <Txt color={COLORS.white}>{item.name}</Txt>
                          </HView>
                        </TouchableOpacity>
                        {Menue.length === index + 1 ? null : (
                          <Line
                            height={1}
                            color={COLORS.greyblue}
                            width={"77%"}
                          />
                        )}
                      </View>
                    );
                  })}
            </Drawer.Section>
            </View>
        </View>
        </Drawer.Section>

        <Drawer.Section>
          <PaleGreyButton onPress={clearAsyncStorage} width={"93%"}>
           {B1}
          </PaleGreyButton>
          <Space />
          <View style={{ alignSelf: "center" }}>
            <Txt color={COLORS.white} style={{ marginRight: 20 }}>
              © Diaspo
            </Txt>
          </View>
          <Space />
        </Drawer.Section>
        </View>

      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: "100%",
    height: "100%",
    // zIndex: 999,
    // elevation: 999,
    opacity: 0.9,
  },
  close: {
    marginRight: 10,
  },
  drawerSection: {
    marginRight: 16,
   
  },
  drawerItem: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  BoxIcon: {
    backgroundColor: COLORS.greyblue,
    padding: 14,
    borderRadius: 7,
    marginRight: 20,
  },
});

{
  /* <View style={{ alignSelf: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#000",
                fontSize: 16,
                color: "#000",
              }}
            >
              Contactez nous :
            </Text>
            <TouchableOpacity>
              <View style={{ marginLeft: 10, fontWeight: "bold", fontSize: 17 }}>
                <Text
                  style={{
                    color: "#087",
                    fontSize: 16,
                    fontWeight: "bold",
                    textDecorationStyle: "solid",
                    textDecorationLine: "underline",
                  }}
                >
                  0491404040
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */
}
{
  /* <Drawer.Section name="Preferences">
          <View style={styles.preferences}>
            <Text style={styles.titleH1}>Fermer Le Restaurant</Text>
            <Switch
              trackColor={{ false: "#ccc", true: "#000" }}
              thumbColor={isEnabled ? "#087" : "#000"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                toggleOff();
                props.navigation.navigate("Commandes");
              }}
              value={isEnabled}
            />
          </View>
        </Drawer.Section> */
}

{
  /* <DrawerItem
  icon={({ color, size }) => (
      <Icon
          name="watch-later"
          color={color}
          size={size}
      />
  )}
  label="Horaire D'ouvertures"
  onPress={() => { props.navigation.navigate('HoraireScreen') }}
  /> */
}
{
  /* <DrawerItem
  icon={({ color, size }) => (
      <Icon
          name="calendar-today"
          color={color}
          size={size}
      />
  )}
  label="Fermetures Exceptionelles"
  onPress={() => { props.navigation.navigate('FermetureScreen') }}
  /> */
}

{
  /* <DrawerItem
                              icon={({ color, size }) => (
                                  <Icon
                                      name="help"
                                      color={color}
                                      size={size}
                                  />
                              )}
                              label="Aide"
                              onPress={() => { props.navigation.navigate('SupportScreen') }}
                          /> */
}

{
  /* <DrawerItem
                icon={({ color, size }) => <Image source={terminer} />}
                labelStyle={{ color: "#000" }}
                label="Commande terminer"
                style={{ color: "#fff" }}
                onPress={() => {
                  props.navigation.navigate("CommandesTerminer");
                }}
              /> */
}

{
  /* <DrawerItem
                icon={({ color, size }) => <Image source={params} />}
                label="Paramètres"
                onPress={() => {
                  props.navigation.navigate("Parametre");
                }}
              /> */
}

{
  /* <DrawerItem
                icon={({ color, size }) => <Image source={aide} />}
                label="Besoin d’aide ? "
                onPress={() => {
                  props.navigation.navigate("Parametre");
                }}
              /> */
}
