import { Image, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import { ScrollView } from "react-native";
import PrimaryHead from "../../../components/Headers/root/PrimaryHead";
import Analysis2 from "./Components/Analysis";
import Space from "../../../components/Space";
import BottomSheetTopUpAccount from "./Components/BottomSheetTopUpAccount";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalysisLayout from "../../../components/views/Layouts/AppLayout/AnalysisLayout";
import { COLORS, SIZES } from "../../../theme";
import ImgBack from "../../../Assets/Img/AnalysisLayout.png";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { View } from "react-native";
import DateTransactions from "./Components/DateTransactions";


const Analysis = ({ navigation }) => {
  const bottomSheetModalRef = useRef(null);
  const dispatch = useDispatch();
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const contacts = useSelector((state) => ({ ...state.contacts }));
  // contacts
const Navigate =()=>{
  navigation.navigate('Planning')
}
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />

      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <View style={{ flex: 1 , }}>
        <Space space={20} />
        <PrimaryHead
          Analysis
          title={"Report"}
          openDrawer={() => navigation.toggleDrawer()}
          Navigate={Navigate}
          soustitre="Planning"
        />

        <ScrollView contentContainerStyle={{}}>
          <Analysis2 />
          <Space space={10} />
          <DateTransactions onOpen={handlePresentModalPress} />
          <Space space={10} />
          <DateTransactions onOpen={handlePresentModalPress} />
          <Space space={10} />
          <DateTransactions onOpen={handlePresentModalPress} />
          <Space space={100} />
        </ScrollView>

        <BottomSheetTopUpAccount
          bottomSheetModalRef={bottomSheetModalRef}
          onPress={handlePresentModalPress}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default Analysis;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.paleGrey,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
  },
});

{
  /* <MainTypes navigation={navigation} onPress={handlePresentModalPress} /> */
}

{
  /* 
        <Recent />
        <Events /> */
}
// const Req = async () => {
//   // console.log('req activated')
//   let req = await Contacts.requestPermission();
//   // console.log("Req", req);
//   return req;
// };
// const getContacts = async () => {
//   let conts = await Contacts.checkPermission();

//   if (conts === "undefined") {
//     Contacts.requestPermission().then((permission) => {
//       console.log("undefineds");
//     });
//   }
//   if (conts === "authorized") {
//     // console.log("authorized");
//     Contacts.getAll().then((contacts) => {
//       console.log(contacts);
//       // setContactsPhone(contacts);
//       dispatch(GetSatetContacts(contacts))
//     });
//   }
//   if (conts === "denied") {
//     setDenied(true)
//     console.log("denied");
//     await Contacts.checkPermission()
//     Contacts.requestPermission().then((permission) => {
//       console.log("undefineds");
//     });
//   }
// };
// console.log("contacts", contacts);

// useEffect( async() => {

//   // !!first get permession then get contacts
//   if (ContactsPhone?.length === 0) {
//     Req();

//     if (Req) {
//       getContacts();
//     } else {
//       console.log("no permession");
//     }
//   }
// }, [Denied]);
