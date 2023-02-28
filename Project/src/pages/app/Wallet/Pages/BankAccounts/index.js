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
import { PaleGreyButton, PrimaryButtonLinear } from "../../../../../components/Buttons";
import NoteWallet from "../../../../../components/views/Note/NoteWallet";
import RenterCarts from "./components/RenterCarts";
import BottomSheetRemove from "./BottomSheetRemove";
import CreatedSuccess from "../../../../../components/views/Layouts/AuthLayout/Model";
import { Head, Txt } from "../../../../../components/utils";
import HView from "../../../../../components/views/HView/HView";

const data = [
  {
    nameNumber: "2873640923809",
    source: require("../../../../../Assets/Img/carteBank1.png"),
  },
  {
    nameNumber: "2873640923809",
    source: require("../../../../../Assets/Img/carteBank2.png"),
  },
  {
    nameNumber: "2873640923809",
    source: require("../../../../../Assets/Img/carteBank3.png"),
  },
  {
    nameNumber: "2873640923809",
    source: require("../../../../../Assets/Img/carteBank4.png"),
  },
];
const BankAccounts = ({ navigation }) => {
  const bottomSheetModalRef2 = useRef(null);
  const handlePresentModalRemove = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const closeBottomUp2 = useCallback(() => {
    bottomSheetModalRef2.current.close();
  }, []);



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
          title={"Bank Accounts"}
          sousTitre={`5 accounts connected`}
          Cancel="Return"
        />

        <ScrollView
          contentContainerStyle={{ width: SIZES.width, alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <Space space={10} />

          {data.map((item, index) => {
            return (
              <View key={index} style={{ height: 220, width: "100%" }}>
                <RenterCarts item={item} onPress={handlePresentModalRemove} />
              </View>
            );
          })}

          {/* <Image source={cart1} /> */}
          <Space space={20} />
          <PrimaryButtonLinear
            width={"90%"}
            style={{ marginVertical: 10 }}
            disabled={true}
            textTransform="uppercase"

            onPress={()=>{
              navigation.navigate('CreateAccount')
            }}
          >
            Connect a new card
          </PrimaryButtonLinear>

          <NoteWallet />
          <Space space={20} />
        </ScrollView>
      </>
      {/* Remove Card */}
      <BottomSheetRemove
        bottomSheetModalRef={bottomSheetModalRef2}
        onPress={handlePresentModalRemove}
        closeBottomUp2={closeBottomUp2}
        navigation={navigation}
        ShowPopup={onSuccess}

      />

      <CreatedSuccess Visible={success} onDissmis={onDissmis}>
        {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
      </CreatedSuccess>
    </SafeAreaView>
  );
};
export default BankAccounts;

const BodyModel = ({ onDissmis }) => {
  return (
    <View style={styles.ModelContainer}>
      {/* <Image source={illusphone} style={{ width: "100%" }} /> */}

      <Head
      //  fontFamily={"Poppins-Bold"}
        style={{ padding: 20, textAlign: "center" }}
      >
        Are you sure to remove this card?
      </Head>
      <Txt
        color={COLORS.slateGrey}
        style={{
          paddingHorizontal: 10,
          textAlign: "center",
          //fontFamily: "Poppins-SemiBold",
        }}
        fontSize={14}
      >
        You won’t be able to use it for Diaspo service anymore.
      </Txt>
      <Space space={20} />
      <HView width={"100"} spaceBetween>
        <PaleGreyButton width={"48%"} onPress={onDissmis}>
          cancel
        </PaleGreyButton>
        <PrimaryButtonLinear width={"48%"} disabled onPress={onDissmis}>
          remove
        </PrimaryButtonLinear>
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
});
