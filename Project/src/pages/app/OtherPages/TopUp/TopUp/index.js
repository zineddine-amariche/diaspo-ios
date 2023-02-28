import React, { useCallback, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from "../../../../../components/Buttons";
import SecondaryHeader from "../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../components/Space";
import { Head, Txt } from "../../../../../components/utils";
import CreatedSuccess from "../../../../../components/views/Layouts/AuthLayout/Model";
import { COLORS, SIZES } from "../../../../../theme";
import Bottom4 from "./BottomSheetPassword";
import BankAcccounts from "./components/Bank Acounts";
import CreditDebit from "./components/Card debit";
import PrepaidCard from "./components/PrepaidCard";
import ViewT1 from "../../../../../components/views/CardViewType1";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Formik } from "formik";
import { useAmount } from "./Hooks";
import PrimaryInput from "../../../../../components/Input";

import illusphone from "../../../../../Assets/Img/illusphone.png";
import illusErr from "../../../../../Assets/Img/illusErr.png";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import Line from "../../../../../components/views/line";
import BottomSheetSelect from "./BottomSheetSelect";

const TopUp = ({ navigation, navigation: { goBack }, route }) => {
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef3 = useRef(null);

  const { data } = route.params;
  // console.log("data", data);
  const [success, setsuccess] = useState(false);
  const [error, setError] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const onDissmisError = useCallback(() => {
    setError(false);
  }, []);
  const onError = useCallback(() => {
    setError(true);
  }, []);

  const data1 = [
    {
      id: 0,
      label: "Main Account",
      value: "Main Account",
      price: "**** **** **** 3651",
      currency: "11 / 2020",
      url: require("../../../../../Assets/Img/cardLogo2-removebg-preview.png"),
    },
    {
      id: 1,
      label: "2nd FX",
      value: "2nd FX",
      price: "**** **** **** 9251",
      currency: "09 / 2021",
      url: require("../../../../../Assets/Img/apple-pay-icon-28-removebg-preview.png"),
    },
  ];
  const data3 = [
    {
      id: 0,
      label: "Main Account",
      value: "Main Account",
      price: "**** **** **** 3651",
      currency: "11 / 2020",
      url: require("../../../../../Assets/Img/cardLogo2-removebg-preview.png"),
    },
    {
      id: 1,
      label: "2nd FX",
      value: "2nd FX",
      price: "**** **** **** 9251",
      currency: "09 / 2021",
      url: require("../../../../../Assets/Img/apple-pay-icon-28-removebg-preview.png"),
    },
    {
      id: 3,
      label: "2nd FX",
      value: "2nd FX",
      price: "**** **** **** 9251",
      currency: "09 / 2021",
      url: require("../../../../../Assets/Img/ALIPAye.png"),
    },
  ];
  const data2 = [
    {
      id: 0,
      label: "Main Account",
      value: "Main Account",
      price: "OCBC BANK",
      currency: "8732 6920 8237 7201",
      url: require("../../../../../Assets/Img/cardLogo3.png"),
    },
    {
      id: 1,
      label: "2nd FX",
      value: "2nd FX",
      price: "standard chartered",
      currency: "8723 6923 7491",
      url: require("../../../../../Assets/Img/card-logo-copy-3.png"),
    },
    {
      id: 2,
      label: "2nd FX",
      value: "2nd FX",
      price: "eastwest bank",
      currency: "762 351 928 182",
      url: require("../../../../../Assets/Img/cardLogo.png"),
    },

    {
      id: 4,
      label: "2nd FX",
      value: "2nd FX",
      price: "posb bank",
      currency: "0276 3817 2698",
      url: require("../../../../../Assets/Img/card-logo-copy-3.png"),
    },
  ];

  const [SelectMethod, setSelectMethod] = useState(null);
  const { state, schema, onSubmit } = useAmount();

  const onSelect = (item) => {
    setSelectMethod(item);
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomUp3 = useCallback(() => {
    bottomSheetModalRef3.current.close();
  }, []);

  const handlePresentModalSelect = useCallback(() => {
    bottomSheetModalRef3.current?.present();
  }, []);

  const DeleteSelectMethod = () => {
    setSelectMethod(null);
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setSelectMethod(null);
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />
      <SecondaryHeader
        goBack={goBack}
        title={"Top up method"}
        Cancel="Return"
      />
      <Formik
        initialValues={state}
        validationSchema={schema}
        onSubmit={(values, formikAction) => {
          // console.log("values", values);
          formikAction.setSubmitting(false);
          formikAction.resetForm();
          // Login();
          onSubmit(values);
          handlePresentModalPress();
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
          isSubmitting,
        }) => {
          const { amount } = values;
          return (
            <>
              <ScrollView
                contentContainerStyle={{ width: SIZES.width }}
                showsVerticalScrollIndicator={false}
              >
                {SelectMethod ? (
                  <>
                    <Space space={30} />
                    <View style={{padding:20}}>

                    <ViewT1>
                      <Txt color={COLORS.slateGrey} fontSize={14}>
                        You are topping up your {data?.label} account in euro
                        using
                        <Txt color={COLORS.darkBlueGrey}>
                          {" "}
                          Credit Card No. {SelectMethod?.price}.
                        </Txt>
                      </Txt>
                      <Space space={20} />
                      <KeyboardAwareScrollView
                        extraHeight={160}
                        enabledOnAndroid
                      >
                        <PrimaryInput
                          name={amount}
                          Label={"Top up amount"}
                          placeholder="14.760"
                          style={styles.Input}
                          errors={errors.amount}
                          touched={touched.amount}
                          value={amount}
                          onBlur={handleBlur("amount")}
                          onChangeText={handleChange("amount")}
                          amount="euro"
                          keyboardType="numeric"
                        />
                        <Space space={20} />
                      </KeyboardAwareScrollView>
                    </ViewT1>
                    </View>
                  </>
                ) : (
                  <View style={{padding:20}}>
                    <View style={styles.topinuptxt}>
                      <Txt
                        lineHeight={20}
                        color={COLORS.slateGrey}
                        fontSize={14}
                      >
                        You are topping up your {data.label} account in euro.
                        Choose a top up moethod below:
                      </Txt>
                    </View>

                    <CreditDebit
                      title={"Credit / Debit Cards"}
                      data={data1}
                      onSelect={onSelect}
                      SelectMethod={SelectMethod}
                    />
                    <Space space={20} />
                    <BankAcccounts title={"Bank Accounts"} data={data2} />
                    <Space space={20} />

                    <CreditDebit
                      title={"Wallets"}
                      data={data3}
                      onSelect={onSelect}
                      SelectMethod={SelectMethod}
                    />
                    <Space space={20} />

                    <PrepaidCard
                      onPress={handlePresentModalSelect}
                      title={"Prepaid Card"}
                    />

                    <Space space={120} />
                  </View>
                )}
              </ScrollView>

              {SelectMethod ? (
                <View style={styles.containerButton}>
                  <PrimaryButtonLinear
                    width={"100%"}
                    onPress={() => {
                      handleSubmit();
                    }}
                    // loading={isSubmitting}
                  >
                    Next
                  </PrimaryButtonLinear>
                  <Space space={25} />
                  <Line color={COLORS.black} />
                </View>
              ) : null}
            </>
          );
        }}
      </Formik>
      <Bottom4
        bottomSheetModalRef={bottomSheetModalRef}
        onSuccess={onSuccess}
        onError={onError}
        DeleteSelectMethod={DeleteSelectMethod}
      />

      <BottomSheetSelect
        bottomSheetModalRef={bottomSheetModalRef3}
        onPress={handlePresentModalSelect}
        closeBottomUp2={closeBottomUp3}
      />

      <CreatedSuccess Visible={success} onDissmis={onDissmis} top={90}>
        {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
      </CreatedSuccess>

      <CreatedSuccess Visible={error} onDissmis={onDissmisError} top={90}>
        {BodyModel ? <BodyModelErr onDissmis={onDissmisError} /> : null}
      </CreatedSuccess>
    </SafeAreaView>
  );
};
export default TopUp;

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
        <Image source={illusErr} style={{ width: "100%" }} />

        <Head
        //  fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
          color={COLORS.coral}
        >
          Topped up unsuccessfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: "center",
            //fontFamily: "Poppins-SemiBold",
          }}
        >
          Sorry, something went wrong. Please try agian.
        </Txt>

        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
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
    borderBottomEndRadius: 15,
    overflow: "hidden",
    borderBottomStartRadius: 15,
    height: 110,
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
  },
});
