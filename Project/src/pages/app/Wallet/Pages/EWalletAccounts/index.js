import React, { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  View,
} from "react-native";

import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import SecondaryHeader from "../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../components/Space";
import { COLORS, SIZES } from "../../../../../theme";
import Note from "../../../../../components/views/Note";
import RenterCarts from "./components/RenterCarts";
import RenterConnectCarte from "./components/RenterConnectCarte";
import BottomSheetRemove from "./BottomSheetRemove";
import RenderDisconnectCarts from "./components/RenderDisconnectCarts";
import { Head, Txt } from "../../../../../components/utils";
import HView from "../../../../../components/views/HView/HView";
import {
  BlackButton,
  PaleGreyButton,
  PrimaryButtonLinear,
} from "../../../../../components/Buttons";
import BlackSuccess from "../../../../../components/views/Layouts/AuthLayout/Model/BlackSuccess";
import Line from "../../../../../components/views/line";

const data = [
  {
    nameNumber: "+44 7538 110953",
    source: require("../../../../../Assets/Img/Ewallet.png"),
  },
];

const EWalletAccounts = ({ navigation }) => {
  const bottomSheetModalRef2 = useRef(null);
  const handlePresentModalRemove = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const closeBottomUp2 = useCallback(() => {
    bottomSheetModalRef2.current.close();
  }, []);
  const [connected, setConnected] = useState(false);

  const connect = () => {
    setConnected(true);
  };

  const disConnect = () => {
    setConnected(false);
  };

  const [success, setsuccess] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />

      <>
        <SecondaryHeader
          goBack={() => {
            navigation.goBack();
          }}
          title={"E-Wallets"}
          sousTitre={`2 account connected`}
          Cancel="Return"
        />

        <ScrollView
          contentContainerStyle={{ width: SIZES.width, alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <Space space={10} />

          {connected ? (
            data.map((item, index) => {
              return <View key={index} style={{ height: 190, width: "100%" }}>
                <RenterCarts item={item} onPress={handlePresentModalRemove} />
              </View>;
            })
          ) : (
            <RenderDisconnectCarts connect={connect} />
          )}

          <RenterConnectCarte onPress={onSuccess} />
        </ScrollView>
      </>
      <View style={styles.walletPos}>
        <Note />
      </View>

      <BlackSuccess Visible={success} onDissmis={onDissmis}>
        {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
      </BlackSuccess>

      <BottomSheetRemove
        bottomSheetModalRef={bottomSheetModalRef2}
        onPress={handlePresentModalRemove}
        closeBottomUp2={closeBottomUp2}
        navigation={navigation}
        disConnect={disConnect}
      />
    </SafeAreaView>
  );
};
export default EWalletAccounts;

const BodyModel = ({ onDissmis }) => {
  return (
    <View style={styles.ModelContainer}>
      {/* <Image source={illusphone} style={{ width: "100%" }} /> */}

      <Head
      //  fontFamily={"Poppins-Bold"}
        style={{ padding: 20, textAlign: "center" }}
        color={COLORS.white}
      >
        “Diaspo” wants to open “WeChat Pay”
      </Head>

      <Line height={1} color={COLORS.darkModal} width={"100%"} />

      <HView width={"100"} style={{}}>
        <BlackButton
          color={COLORS.BlueTxt}
          width={"50%"}
          disabled
          onPress={onDissmis}
          line
        >
          cancel
        </BlackButton>
        <BlackButton
          color={COLORS.BlueTxt}
          width={"50%"}
          disabled
          onPress={onDissmis}
        >
          Open
        </BlackButton>
      </HView>
    </View>
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
    height: 130,
  },
  walletPos: {
    position: "absolute",
    bottom: 10,
  },
  ModelContainer: {
    backgroundColor: "transparent"
  },
});
