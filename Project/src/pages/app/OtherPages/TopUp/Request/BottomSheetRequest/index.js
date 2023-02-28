import React, { useCallback, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";

import ImgBack from "../../../../../../Assets/Img/HomeBack.png";
import { COLORS, SIZES } from "../../../../../../theme";
import SecondaryHeader from "../../../../../../components/Headers/root/SecondaryHeader";

import Rectangle from "../../../../../../components/views/Rectangle";
import Space from "../../../../../../components/Space";
import Bottom1 from "./BottomSheetAccount";
import Bottom4 from "./BottomSheetPassword";
import Bottom2 from "./BottomSheetReceiversPhoneEmail";
import Bottom3 from "./BottomSheetReceiversFullName";
import BottomSheetSelect from "./BottomSheetSelect";
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from "../../../../../../components/Buttons";
import { useEffect } from "react";
import Line from "../../../../../../components/views/line";
import CreatedSuccess from "../../../../../../components/views/Layouts/AuthLayout/Model";
import { Head, Txt } from "../../../../../../components/utils";
import illusphone from "../../../../../../Assets/Img/illusphone.png";
import { Formik } from "formik";
import MainAccount from "../../TopUp/components/MainAccount";
import Form0 from "../Components/Forms/Form0";
import Form1 from "../Components/Forms/Form1";
import { useTransfers } from "../Hooks";
import { useSelector } from "react-redux";
import BottomSheetCashinMode from "./BottomSheetCashinMode";

const BottomSheetRequest = ({ goBack, navigation }) => {
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const bottomSheetModalRef3 = useRef(null);
  const bottomSheetModalRef4 = useRef(null);
  const bottomSheetModalRef5 = useRef(null);
  const bottomSheetModalRef6 = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const [isOpenAccount, setIsOpenAccount] = useState(false);
  const [success, setsuccess] = useState(false);
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

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    // openDrawer();
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

  const close6 = useCallback(() => {
    bottomSheetModalRef6.current?.close();
    openDrawer();
  }, []);

  // MAIN ACOUNT
  const [selected, setSelected] = useState(0);
  const onSelect = (item) => {
    setSelected(item);
  };
  const contacts = useSelector((state) => ({ ...state.contacts }));

  const {
    validationSchema1,
    State1,
    Transfers,
    validationSchema,
    State0,
  } = useTransfers();
  let schema = selected === 0 ? validationSchema : validationSchema1;
  let state = selected === 0 ? State0 : State1;

  // console.log('state' ,'selected',selected, state)
  const handlePresentModalSelect = useCallback(() => {
    bottomSheetModalRef5.current?.present();
    // openDrawer();
  }, []);
  const closeSelect = useCallback(() => {
    bottomSheetModalRef5.current?.close();
    // openDrawer();
  }, []);
  const [Change, setChange] = useState();
  const [price, setPrice] = useState();

  const ChangeAccount = (Item) => {
    setChange(Item.name);
    setPrice(Item.balance);
    bottomSheetModalRef.current?.close();
  };



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />
      <SecondaryHeader Cancel="Return" goBack={goBack} title={"Request"} />

      <Formik
        initialValues={state}
        validationSchema={schema}
        onSubmit={(values, formikAction) => {
          // handlePresentModalPress();
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
          resetForm,
          setErrors,
        }) => {
          useEffect(() => {
            setErrors(null);
            resetForm();
          }, [selected]);

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
                  onPress={() => {
                    handlePresentModalPress();
                    // handlePresentModalPress4()
                  }}
                  Change={Change}
                  price={price}
                />
                <Space space={15} />
                {
                  <Rectangle
                    
                    width="90%"
                    style={{ paddingTop: 20,backgroundColor:COLORS.white,padding:20 }}
                  >
                    {selected === 0 ? (
                      <Form0
                        handlePresentModalPress3={handlePresentModalPress3}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handlePresentModalPress2={handlePresentModalPress2}
                        setFieldValue={setFieldValue}
                        closeSelect={closeSelect}
                        handlePresentModalSelect={handlePresentModalSelect}
                      />
                    ) : (
                      <Form1
                        handlePresentModalPress3={handlePresentModalPress3}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        setFieldValue={setFieldValue}
                        handlePresentModalSelect={handlePresentModalSelect}
                      />
                    )}
                  </Rectangle>
                  
                }
          <Space space={20}/>

              </ScrollView>

              <Bottom1
                bottomSheetModalRef={bottomSheetModalRef}
                closeDrawer={closeDrawer}
                closeAccount={closeAccount}
                ChangeAccount={ChangeAccount}
              />
              <Bottom2
                bottomSheetModalRef={bottomSheetModalRef2}
                closeDrawer={closeDrawer}
                // ContactsPhone={ContactsPhone}
                ContactsPhone={contacts.contacts}
              />
              <Bottom3
                bottomSheetModalRef={bottomSheetModalRef3}
                closeDrawer={closeDrawer}
                // ContactsPhone={ContactsPhone}
                ContactsPhone={contacts.contacts}
              />
              <Bottom4
                bottomSheetModalRef={bottomSheetModalRef4}
                closeDrawer={closeDrawer}
                onSuccess={onSuccess}
              />

              <BottomSheetSelect
                bottomSheetModalRef={bottomSheetModalRef5}
                onPress={handlePresentModalSelect}
                closeSelect={closeSelect}
                setFieldValue={(val) => {
                  setFieldValue("bankName", val);
                }}
              />

              <BottomSheetCashinMode
                bottomSheetModalRef={bottomSheetModalRef6}
                onPress={handlePresentModalSelect}
                closeSelect={close6}
                setFieldValue={(val) => {
                  setFieldValue("bankName", val);
                }}
                navigation={navigation}
                sendRequest={() => {
                  Transfers(values);
                }}
              />
              {isOpen ||isOpenAccount ? null : (
                <View style={styles.buttonsConatiner}>
                  <PrimaryButtonLinear
                    onPress={handleSubmit}
                    disabled={errors.length !== 0}
                  >
                  {  true ? 'SEND MONEY' :'SEND A NOTIFICATION'}
                  </PrimaryButtonLinear>
                  <Space />
                  <PrimaryButtonLinear
                    // onPress={handleSubmit}
                    disabled={errors.length !== 0}
                  >
                   { true ? 'RECEIVE MONEY' :'SCAN A DIASPO USER'}
                  </PrimaryButtonLinear>
                  <Space space={20} />
                </View>
              )}

              <CreatedSuccess Visible={success} onDissmis={onDissmis} top={90}>
                {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
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
         fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
        >
          Request sent successfully
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
            {" "}
            Request for 12,000 euro
          </Txt>{" "}
          has been sent successfully
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
    paddingTop: 15,
  },
});

export default BottomSheetRequest;

//   Forms Transfer
// const Forms = [
//   <Form0 handlePresentModalPress2={handlePresentModalPress2} />,
//   <Form1 handlePresentModalPress3={handlePresentModalPress3} />,
// ];

// const [ContactsPhone, setContactsPhone] = useState([]);

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
//       console.log("undefined");
//     });
//   }
//   if (conts === "authorized") {
//     // console.log("authorized");
//     Contacts.getAll().then((contacts) => {
//       // console.log(contacts);
//       setContactsPhone(contacts);
//     });
//   }
//   if (conts === "denied") {
//     console.log("denied");
//   }
// };

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
