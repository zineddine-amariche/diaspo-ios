import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import illusErr from "../../../../../Assets/Img/illusErr.png";

import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import { COLORS, SIZES } from "../../../../../theme";
import SecondaryHeader from "../../../../../components/Headers/root/SecondaryHeader";
import MainAccount from "../Components/MainAccount";
import Rectangle from "../../../../../components/views/Rectangle";
import Form0 from "../Components/Forms/Form0";
import Space from "../../../../../components/Space";
import Bottom1 from "./BottomSheetAccount";
 
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from "../../../../../components/Buttons";
import { useEffect } from "react";
import Contacts from "react-native-contacts";
import CreatedSuccess from "../../../../../components/views/Layouts/AuthLayout/Model";
import { Head, Txt } from "../../../../../components/utils";
import illusphone from "../../../../../Assets/Img/illusphone.png";
import { Formik } from "formik";
import { useTransfers } from "../Hooks";
import Note from "../../../../../components/views/Note";
const BottomSheetTransfert = ({ goBack, navigation }) => {
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const bottomSheetModalRef3 = useRef(null);
  const bottomSheetModalRef4 = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [success, setsuccess] = useState(false);
  const [error, setError] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);
  const OpenAccount = useCallback(() => {
    setIsOpenAccount(true);
  }, []);
  const closeAccount = useCallback(() => {
    setIsOpenAccount(false);
  }, []);
  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const onDissmisError = useCallback(() => {
    setError(false);
  }, []);
  const onError = useCallback(() => {
    setError(true);
  }, []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    openDrawer();
    OpenAccount();
  }, []);

  const handlePresentModalPress2 = useCallback(() => {
    bottomSheetModalRef2.current?.present();
    openDrawer();
  }, []);

  const handlePresentModalPress3 = useCallback(() => {
    bottomSheetModalRef3.current?.present();
    openDrawer();
  }, []);

  const handlePresentModalPress4 = useCallback(() => {
    bottomSheetModalRef4.current?.present();
    // openDrawer();
  }, []);

  // MAIN ACOUNT
  const [selected, setSelected] = useState(0);
  const onSelect = (item) => {
    setSelected(item);
  };

  const [ContactsPhone, setContactsPhone] = useState([]);

  const Req = async () => {
    // console.log('req activated')
    let req = await Contacts.requestPermission();
    // console.log("Req", req);
    return req;
  };
  const getContacts = async () => {
    let conts = await Contacts.checkPermission();

    if (conts === "undefined") {
      Contacts.requestPermission().then((permission) => {
        console.log("undefineds");
      });
    }
    if (conts === "authorized") {
      // console.log("authorized");
      Contacts.getAll().then((contacts) => {
        //  console.log(contacts);
        setContactsPhone(contacts);
      });
    }
    if (conts === "denied") {
      console.log("denied");
    }
  };

  // useEffect(() => {
  //   // !!first get permession then get contacts
  //   if (ContactsPhone.length === 0) {
  //     Req();

  //     if (Req) {
  //       getContacts();
  //     } else {
  //       console.log("no permession");
  //     }
  //   }
  // }, []);

  const { validationSchema1, State1, Transfers } = useTransfers();
  const { validationSchema, State0 } = useTransfers();
  let schema = selected === 0 ? validationSchema : validationSchema1;
  let state = selected === 0 ? State0 : State1;

  const [Change, setChange] = useState();
  const [price, setPrice] = useState();

  const ChangeAccount = (Item) => {
    setChange(Item.label);
    setPrice(Item.price);
    // closeBottomUp3()

    bottomSheetModalRef.current?.close();
  };

  const [checked, setchecked] = useState(null);
  const [NavigationCashOut, setNavigationCashOut] = useState(null);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SecondaryHeader Cancel="Return" goBack={goBack} title={"Cash Out"} />

      <Formik
        initialValues={State0}
        validationSchema={validationSchema}
        onSubmit={(values, formikAction) => {
          // console.log("values", values);
          // formikAction.setSubmitting(false);
          // formikAction.resetForm();
          Transfers(values);
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
          setFieldValue,
          isValid,
        }) => {
          {
          console.log('errors' , errors)
          }
          return (
            <>
              <ScrollView
                contentContainerStyle={{ width: SIZES.width }}
                showsVerticalScrollIndicator={false}
              >
                <MainAccount
                  onSelect={onSelect}
                  selected={selected}
                  Visible={isOpenAccount}
                  onPress={handlePresentModalPress}
                  Change={Change}
                  price={price}
                />
                <Space space={15} />
                {
                  <Rectangle
                    width="90%"
                    style={{ paddingVertical: 10, backgroundColor: "#fff" }}
                  >
                    {/* {selected === 0 ? ( */}
                      <Form0
                        handlePresentModalPress3={handlePresentModalPress3}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        navigation={navigation}
                        setchecked={setchecked}
                        checked={checked}
                        setNavigationCashOut={setNavigationCashOut}
                      />
                    {/* ) : (
                      <Form1
                        handlePresentModalPress3={handlePresentModalPress2}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        navigation={navigation}
                      />
                    )} */}
                  </Rectangle>
                }
                <Space space={15} />

                <Note />
                <Space space={20}></Space>
              </ScrollView>
              <Bottom1
                bottomSheetModalRef={bottomSheetModalRef}
                closeDrawer={closeDrawer}
                closeAccount={closeAccount}
                ChangeAccount={ChangeAccount}
              />
              {/* <Bottom2
                bottomSheetModalRef={bottomSheetModalRef2}
                closeDrawer={closeDrawer}
                ContactsPhone={ContactsPhone}
              />
              <Bottom3
                bottomSheetModalRef={bottomSheetModalRef3}
                closeDrawer={closeDrawer}
                ContactsPhone={ContactsPhone}
              />
              <Bottom4
                bottomSheetModalRef={bottomSheetModalRef4}
                closeDrawer={closeDrawer}
                onSuccess={onSuccess}
                onError={onError}
              /> */}

              {isOpen ? null : (
                <View style={styles.buttonsConatiner}>
                  <PrimaryButtonLinear
                    disabled={NavigationCashOut && !errors.amount}
                    onPress={()=>{
                      navigation.navigate(NavigationCashOut)
                    }}

                  >
                    VALIDATE
                  </PrimaryButtonLinear>
                </View>
              )}

              <CreatedSuccess Visible={success} onDissmis={onDissmis} top={90}>
                {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
              </CreatedSuccess>

              <CreatedSuccess
                Visible={error}
                onDissmis={onDissmisError}
                top={90}
              >
                {BodyModel ? <BodyModelErr onDissmis={onDissmisError} /> : null}
              </CreatedSuccess>
            </>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

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
          has been cashed out successfully from
          <Txt Bold={"700"} color={COLORS.black} fontSize={17}>
            Main Account{" "}
          </Txt>
          via{" "}
          <Txt Bold={"400"} color={COLORS.black} fontSize={17}>
            Post Bank Merchant{" "}
          </Txt>
          You can check in your account
          <Txt Bold={"400"} color={COLORS.orangeYellow} fontSize={17}>
            {" "}
            transaction histopy.
          </Txt>
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
          //fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
          color={COLORS.coral}
        >
          Cashed out unsuccessfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: "center",
            // //fontFamily: "Poppins-SemiBold",
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
    top: -107,
    width: SIZES.width,
    height: 264,
    position: "absolute",
  },
  buttonsConatiner: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    padding: 15,
  },
});

export default BottomSheetTransfert;
