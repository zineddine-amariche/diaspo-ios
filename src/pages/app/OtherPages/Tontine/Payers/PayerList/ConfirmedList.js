import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";

import ImgBack from "../../../../../../Assets/Img/HomeBack.png";
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from "../../../../../../components/Buttons";
import SecondaryHeader from "../../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../../components/Space";
import { Head, Txt } from "../../../../../../components/utils";
import { COLORS, SIZES } from "../../../../../../theme";

import thumbnailPath from "../../../../../../Assets/Img/ContactsUser.png";
import Line from "../../../../../../components/views/line";

import Rectangle from "../../../../../../components/views/Rectangle";
import { TouchableOpacity } from "react-native";
import {
  deleteSelectedListPayers,
  resetPayers,
} from "../../../../../../redux/Features/Tontine/ManagePayers";
import { useDispatch, useSelector } from "react-redux";
import { getListPayers } from "../../../../../../redux/Features/Tontine/ManagePayers/getListOfPayers/slice";
import { useIsFocused } from "@react-navigation/native";
import BottomSheetReminder from "./BottomSheetReminder";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import {
  deleteSelectedList,
  resetBeneficaire,
} from "../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare";
import CreatedSuccess from "../../../../../../components/views/Layouts/AuthLayout/Model";
import HView from "../../../../../../components/views/HView/HView";
const durationMs = 350;

const ConfirmedList = ({ navigation, navigation: { goBack }, route }) => {
  // const { PayerId } = route.params;
  const bottomSheetModalRef2 = useRef(null);

  const { isSuccessList, loadingList, listPayers } = useSelector((state) => ({
    ...state.payersList,
  }));

  const dispatch = useDispatch();
  const { token } = useSelector((state) => ({ ...state.token }));
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (PayerId) {
  //     // console.log("enter");
  //     let obj = {
  //       payerId: PayerId,
  //       token,
  //     };
  //     dispatch(getListPayers(obj));
  //   }
  // }, [isFocused]);

  // useEffect(() => {
  //   dispatch(getPayers(PayerId));
  // }, [PayerId, isFocused]);

  const closeModalReminder = useCallback(() => {
    bottomSheetModalRef2.current.close();
  }, []);

  const handlePresentModalReminder = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);

  const [success, setsuccess] = useState(false);
  const [success2, setsuccess2] = useState(false);
  const [success3, setsuccess3] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
    // navToTontine();
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const navToTontine = () => {
    navigation.navigate("Tontine");

    setTimeout(
      () => dispatch(resetBeneficaire(), dispatch(deleteSelectedList())),
      durationMs
    );
  };

  const sendReminder = () => {
    closeModalReminder();
    onSuccess();
  };
  const startWithparticipants = () => {
    setsuccess2(true);
    closeModalReminder();
  };
  const cancelTontin = () => {
    setsuccess3(true);
    closeModalReminder();
  };

  return (
    <SafeAreaView style={styles.container}>
      {loadingList ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Txt>Loading ... </Txt>
        </View>
      ) : (
        <>
          <StatusBar translucent={true} backgroundColor={"transparent"} />
          <Image
            style={styles.ImageBackground}
            source={ImgBack}
            resizeMode="stretch"
          />

          <>
            <SecondaryHeader
              goBack={() => {
                navigation.navigate("Tontine");

                setTimeout(
                  () =>
                    dispatch(
                      resetPayers(),
                      dispatch(deleteSelectedListPayers())
                    ),
                  durationMs
                );
              }}
              title={"Payer List "}
              sousTitre={
                !listPayers?.data?.PayerList?.length
                  ? null
                  : `${listPayers?.data?.PayerList?.length} people `
              }
              Cancel="Return"
            />

            {!listPayers?.data?.PayerList?.length ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Txt textTransform={"none"}>Payers list is empty </Txt>
          
              </View>
            ) : (
              <ScrollView
                contentContainerStyle={{ width: SIZES.width }}
                showsVerticalScrollIndicator={false}
              >
                <Space space={15} />
                <View style={{ paddingHorizontal: 20 }}>
                  <Rectangle width="100%" style={{ paddingVertical: 10 }}>
                    {listPayers?.data?.PayerList?.map((i, index) => {
                      return (
                        <View key={index}>
                          <>
                            <TouchableOpacity
                              style={styles.Container}
                              onPress={() => {
                                console.log("click");
                                handlePresentModalReminder();
                              }}
                            >
                              <View>
                                <Image
                                  source={thumbnailPath}
                                  style={styles.Img}
                                  resizeMode="contain"
                                />
                              </View>
                              <View style={{ width: "55%" }}>
                                <Head
                                  fontSize={17}
                                  color={COLORS.darkBlueGrey}
                                  numberOfLines={1}
                                >
                                  {i?.payerDetails?.firstName}{" "}
                                  {i?.payerDetails?.lastName}
                                </Head>

                                <Txt fontSize={12} color={COLORS.coolGrey}>
                                  {i?.payerDetails?.mobileNumber}
                                </Txt>
                              </View>
                              <Awaiting status={i?.status} />
                            </TouchableOpacity>
                          </>
                        </View>
                      );
                    })}
                  </Rectangle>
                  <Space />
                </View>

              </ScrollView>
            )}
            <Line color={COLORS.black} />
            <Space space={8} />
          </>
        </>
      )}

      <BottomSheetReminder
        bottomSheetModalRef={bottomSheetModalRef2}
        close={closeModalReminder}
        Open={handlePresentModalReminder}
        navigation={navigation}
        sendReminder={sendReminder}
        startWithparticipants={startWithparticipants}
        cancelTontin={cancelTontin}
      />

      <CreatedSuccess Visible={success} onDissmis={onDissmis} padding={1}>
        {BodyModel1 ? (
          <BodyModel1 onDissmis={onDissmis} navToTontine={navToTontine} />
        ) : null}
      </CreatedSuccess>

      <CreatedSuccess
        Visible={success2}
        onDissmis={() => setsuccess2(false)}
        padding={1}
      >
        {BodyModel2 ? (
          <BodyModel2
            onDissmis={() => setsuccess2(false)}
            navToTontine={navToTontine}
          />
        ) : null}
      </CreatedSuccess>

      <CreatedSuccess
        Visible={success3}
        onDissmis={() => setsuccess3(false)}
        padding={1}
      >
        {BodyModel3 ? (
          <BodyModel3
            onDissmis={() => setsuccess3(false)}
            navToTontine={navToTontine}
          />
        ) : null}
      </CreatedSuccess>
    </SafeAreaView>
  );
};
export default ConfirmedList;

const BodyModel1 = ({ onDissmis, navToTontine }) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Space />

        <Head
        //  fontFamily={"Poppins-Bold"}
          style={{ paddingHorizontal: 20, textAlign: "center" }}
        >
          Send reminder ?
        </Head>
        <Space />

        <View style={{ paddingHorizontal: 20, textAlign: "center" }}>
          <Txt color={COLORS.slateGrey} fontSize={14}>
            The payers and beneficiaries will receive the reminder to repnse to
            you'r invitaion to join this tontine
          </Txt>
        </View>
        <Space />
        <HView spaceBetween>
          <PaleGreyButton
            onPress={() => {
              onDissmis();
              // validate number of payers
            }}
            width={"48%"}
          >
            Cancel
          </PaleGreyButton>
          <PrimaryButtonLinear
            disabled={true}
            onPress={() => {
              onDissmis();
              navToTontine();
            }}
            width={"48%"}
          >
            SEND
          </PrimaryButtonLinear>
        </HView>
      </View>
    </>
  );
};
const BodyModel2 = ({ onDissmis, navToTontine }) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Space />

        <Head
        //  fontFamily={"Poppins-Bold"}
          style={{ paddingHorizontal: 20, textAlign: "center" }}
        >
          Cancel this Tontine ?
        </Head>
        <Space />

        <View style={{ paddingHorizontal: 20, textAlign: "center" }}>
          <Txt fontSize={14} color={COLORS.slateGrey}>
            Are you sur to cancel this tontine
          </Txt>
        </View>
        <Space />
        <HView spaceBetween>
          <PaleGreyButton
            onPress={() => {
              onDissmis();
            }}
            width={"48%"}
          >
            NO
          </PaleGreyButton>
          <PrimaryButtonLinear
            disabled={true}
            onPress={() => {
              onDissmis();
              navToTontine();
            }}
            width={"48%"}
          >
            YES
          </PrimaryButtonLinear>
        </HView>
      </View>
    </>
  );
};
const BodyModel3 = ({ onDissmis, navToTontine }) => {
  return (
    <View style={styles.ModelContainer}>
      <Space />

      <Head
      //  fontFamily={"Poppins-Bold"}
        style={{ paddingHorizontal: 20, textAlign: "center" }}
      >
        Start with particial list
      </Head>
      <Space />

      <View style={{ paddingHorizontal: 20, textAlign: "center" }}>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          Please confir to start the tontine with the partial of accepted payers
          and beneficiaries, You will need to wait for these payers and
          beneficiaries to accept this change before starting the tontine anyway
        </Txt>
      </View>
      <Space />
      <HView spaceBetween>
        <PaleGreyButton
          onPress={() => {
            onDissmis();
          }}
          width={"48%"}
        >
          Cancel
        </PaleGreyButton>
        <PrimaryButtonLinear
          disabled={true}
          onPress={() => {
            onDissmis();
            navToTontine();
          }}
          width={"48%"}
        >
          CONFIRM
        </PrimaryButtonLinear>
      </HView>
    </View>
  );
};


const Awaiting = ({ status }) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.offWhite,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Txt fontSize={14} color={COLORS.yellow}>
        {status}
      </Txt>
    </View>
  );
};

const Accepted = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.veryLightPink,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 13,
        width: 90,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Txt fontSize={14} color={COLORS.coral}>
        Accepted
      </Txt>
    </View>
  );
};

const Denied = () => {
  return (
    <View
      style={{
        backgroundColor: COLORS.veryLightPink,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 13,
        width: 90,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Txt textTransform={"uppercase"} fontSize={14} color={COLORS.coral}>
        Denied
      </Txt>
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
    //fontFamily: "Roboto-Bold",
    flex: 1,
    paddingLeft: 2,
  },
  Container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 10,
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
    marginRight: 6,
  },
  ModelContainer: {
    padding: 10,
  },
});
