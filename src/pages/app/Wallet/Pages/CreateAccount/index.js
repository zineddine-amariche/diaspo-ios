import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  View,
} from "react-native";

import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import { PaleGreyButton } from "../../../../../components/Buttons";
import SecondaryHeader from "../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../components/Space";
import { Head, Txt } from "../../../../../components/utils";
import Note from "../../../../../components/views/Note";
import NoteBank from "../../../../../components/views/Note/NoteBank";
import { COLORS, SIZES } from "../../../../../theme";
import RenderItem from "./components/RenderItem";
import illusphone from "../../../../../Assets/Img/illusWallet.png";
import { useCallback } from "react";
import { useState } from "react";
import CreatedSuccess from "../../../../../components/views/Layouts/AuthLayout/Model";

const CreateAccount = ({ navigation }) => {
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
          title={"Choose Bank"}
          Cancel="Return"
        />

        <ScrollView
          contentContainerStyle={{ width: SIZES.width, alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <RenderItem navigation={navigation} onSuccess={onSuccess} />
        </ScrollView>

        <NoteBank />
      </>

      <CreatedSuccess Visible={success} onDissmis={onDissmis}>
        {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
      </CreatedSuccess>
    </SafeAreaView>
  );
};
export default CreateAccount;

const BodyModel = ({ onDissmis }) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusphone} style={{ width: "100%" }} />

        <Head
        //  fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
        >
          Transfered successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: "center",
            //fontFamily: "Poppins-SemiBold",
          }}
        >
          You now can use your bank account for our services. This notification
          will be closed automatically.
        </Txt>
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
    height: 100,
  },
});
