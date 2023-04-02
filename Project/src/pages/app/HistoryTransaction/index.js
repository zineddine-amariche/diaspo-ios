import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import Line from "../../../components/views/line";

import ImgBack from "../../../Assets/Img/HomeBack.png";
import {
  PaleGreyButton,
} from "../../../components/Buttons";
import SecondaryHeader from "../../../components/Headers/root/SecondaryHeader";
import Space from "../../../components/Space";
import { Head, Txt } from "../../../components/utils";
import { COLORS, SIZES } from "../../../theme";
import illusphone from "../../../Assets/Img/illusphone.png";
import { useSelector } from "react-redux";
import CardUserHistory from "./components/CardUser";
import RectangleTransactionHistory from "../../../components/views/Rectangle-TransactionHistory";

const HistoryTransaction = ({ navigation, navigation: { goBack } }) => {
  const { contacts } = useSelector((state) => ({
    ...state.contacts,
  }));


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SecondaryHeader
        goBack={() => {
          navigation.goBack()
        }}
        title={"Transaction History"}
      />
      <ScrollView
        contentContainerStyle={{ width: SIZES.width }}
        showsVerticalScrollIndicator={false}
      >

      <RectangleTransactionHistory />
        <View style={{ paddingHorizontal: 20 }}>
          {/* <Rectangle width="100%" style={{ paddingVertical: 10 }}> */}
            {contacts.map((i, index) => {
              return (
                <View key={index}>
                  <CardUserHistory item={i} index={index} />
                </View>
              );
            })}
          {/* </Rectangle> */}
          <Space />
        </View>
      </ScrollView>
      <Space space={10} />
      {/* <Line  color={COLORS.black}/> */}
      {/* <Space space={4} /> */}

    </SafeAreaView>
  );
};
export default HistoryTransaction;

const BodyModel = ({ onDissmis }) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusphone} style={{ width: "100%" }} />

        <Head
          //fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
        >
          Transfered successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: "center",
            // //fontFamily: "Poppins-SemiBold",
          }}
        >
          <Txt Bold={"700"} color={COLORS.black} fontSize={17}>
            12,000 euro
          </Txt>{" "}
          has been transfered successfully to
          <Txt Bold={"700"} color={COLORS.black} fontSize={17}>
            {" "}
            Faith Felicity (+44 7538 110953).
          </Txt>
          You can check in your account
          <Txt Bold={"400"} color={COLORS.orangeYellow} fontSize={17}>
            {" "}
            transaction histopy.
          </Txt>
          .
        </Txt>

        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
      </View>
    </>
  );
};
const BodyModelErr = ({ onDissmis }) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusphone} style={{ width: "100%" }} />

        <Head
          //fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
        >
          Transfered successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: "center",
            // //fontFamily: "Poppins-SemiBold",
          }}
        >
          <Txt Bold={"700"} color={COLORS.black} fontSize={17}>
            12,000 euro
          </Txt>{" "}
          has been transfered successfully to
          <Txt Bold={"700"} color={COLORS.black} fontSize={17}>
            {" "}
            Faith Felicity (+44 7538 110953).
          </Txt>
          You can check in your account
          <Txt Bold={"400"} color={COLORS.orangeYellow} fontSize={17}>
            {" "}
            transaction histopy.
          </Txt>
          .
        </Txt>

        <PaleGreyButton onPress={onDissmisError}>close</PaleGreyButton>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: "center",
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    height: 170,
  },
  topinuptxt: {
    padding: 20,
  },
  containerButton: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 110,
    paddingTop: 15,
    position: "absolute",
    bottom: 0,
  },
  BoxInfoTextYellow: {
    justifyContent: "center",
  },
  textInfo: {
    marginLeft: 8,
  },
  Input: {
    color: COLORS.darkBlueGrey,
    fontSize: 20,
    // //fontFamily: "Roboto-Bold",
    flex: 1,
    paddingLeft: 2,
  },
});

// const [success, setsuccess] = useState(false);

// const onDissmis = useCallback(() => {
//   setsuccess(false);
// }, []);
// const onSuccess = useCallback(() => {
//   setsuccess(true);
// }, []);

// const handlePresentModalPress = useCallback(() => {
//   bottomSheetModalRef.current?.present();
// }, []);
