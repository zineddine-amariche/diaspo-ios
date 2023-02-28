import React, { useCallback, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from "react-native";

import ImgBack from "../../../../../../Assets/Img/HomeBack.png";
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from "../../../../../../components/Buttons";
import SecondaryHeader from "../../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../../components/Space";
import * as _ from "../../../../../../components/utils";
import CreatedSuccess from "../../../../../../components/views/Layouts/AuthLayout/Model";
import { COLORS, SIZES } from "../../../../../../theme";
import HView from "../../../../../../components/views/HView/HView";
import thumbnailPath from "../../../../../../Assets/Img/ContactsUser.png";
import Rectangle from "../../../../../../components/views/Rectangle";
import Line from "../../../../../../components/views/line";
import { TouchableOpacity } from "react-native";
import UseCheckBoxElements from "../../../../../../components/checkBox/useCheckBoxElements";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmBeneficiaries } from "../../../../../../redux/Features/Tontine/ManageBenefeciare/confirmBeneficiaries/slice";
import {
  createParticipants,
  resetSuccesParticipants,
} from "../../../../../../redux/Features/Tontine/Participants/create/slice";
import { resetBeneficiaries } from "../../../../../../redux/Features/Tontine/Participants/getBeneficiaires/slice";
import { deleteSelectedList } from "../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare";
import { createNotification } from "../../../../../../redux/Features/Tontine/Participants/SendNotify/slice";
import { useIsFocused } from "@react-navigation/native";
import ModelConfirmCreateParticipants from "../components/Models/Model.ConfirmCreateParticipants";

const ListBéneféciare = ({ navigation, route }) => {
  const {
    GlobalBen,
    GlobalBen2,
    GlobalBen3,
    ind,
    ARR,
    projectId,
    type,
    routeData,
    title,
    showPopUp
  } = route.params;
  const { token } = useSelector((state) => ({ ...state.token }));

  const [success, setsuccess] = useState(false);
  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const NavToCnfPayer = () => {
    navigation.navigate("ConfirmedListBéneféciare", { PayerId: projectId });
    // navigation.navigate("ConfirmedListBéneféciare", {
    //   GlobalBen,
    //   GlobalBen2,
    //   GlobalBen3,
    //   ARR,
    //   ind,
    //   projectId
    // });
  };
  const { loadingBeneficiaries, result, isSuccess } = useSelector((state) => ({
    ...state.selecetdBeneficiaries,
  }));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({
    ...state.selecetdBeneficiaries,
  }));

  const {
    data,
    isError,
    status,
    isLoading,
    message,
    participants,
    nonAppUserParticipants,
    TypeOfParticipant,
  } = useSelector((state) => ({
    ...state.createParticipants,
  }));

  const {
    selectedconnectUser,
    selectedconnectUserContacts,
    selectedconnectNonUserApp,
    laoder,
  } = useSelector((state) => ({
    ...state.beneficaire,
  }));


  const [success2, setsuccess2] = useState(false);
  let object = {};

  let ids = participants?.map((el) => {
    return el.participantId;
  });

  const onDissmis2 = useCallback(() => {
    setsuccess2(false);
  }, []);
  const onSuccess2 = useCallback(() => {
    setsuccess2(true);
  }, []);

  const pressNo = () => {
    setsuccess2(false);
    dispatch(resetSuccesParticipants());
    navigation.navigate("ViewBenefeciareList", {
      projectId,
      routeData: "null",
      title: titree,
    });
  };


 


  let titree =
    TypeOfParticipant === "PAYER_AND_BENEFICIARY"
      ? "Participants List"
      : "Beneficiaries List";

  const pressYes = () => {
    dispatch(resetSuccesParticipants());
    navigation.navigate("BenefeciareListReorder", {
      projectId: projectId,
      title: "Set Beneficiary Order",
      type
    });
  };

  const deviceTokenFromConnectedUsers = selectedconnectUser?.map((i) => {
    return i?.device?.deviceToken
      ? i?.device?.deviceToken
      : i?.device[0]?.deviceToken;
  });
  const isFocused = useIsFocused();

  useEffect(() => {
    if (
      status === "success" &&
      isFocused &&
      (TypeOfParticipant === "BENEFICIARY" ||
        TypeOfParticipant === "PAYER_AND_BENEFICIARY" ||
        TypeOfParticipant === "TONTINE_ORDINARY_TONTINE")
    ) {
      console.log("------------- create BENEFICIARY Success 2  -------------- ");

      if (ids && ids.length > 0) {
        ids?.forEach((element) => {
          object = {
            registration_ids: deviceTokenFromConnectedUsers,
            notification: {
              body: `You has been invited to join “${routeData?.name}” as a beneficiary`,
              OrganizationId: "2",
              content_available: true,
              priority: "high",
              subtitle: "Dipaso Invitation",
              title: "Dipaso - Tontine Invitation ",
              participantsId: element,
              projectId,
            },
            data: {
              priority: "high",
              sound: "app_sound.wav",
              content_available: true,
              bodyText: `You has been invited to join “${routeData?.name}” as a beneficiary`,
              organization: "Dipaso",
              participantsId: element,
              projectId,
              timer: new Date(),
              for: "invitation",
              navigate: "InvitationTontine",
              forgroundView: "Notifications",
              title: "Dipaso - Tontine Invitation ",
            },
          };
        });
      }

      dispatch(createNotification(object));

      onDissmis2()
      navigation.navigate('ViewBenefeciareList', {
        projectId,
        routeData, // i get this value from : server
        title: titree,
      });

      setTimeout(() => {
        dispatch(resetBeneficiaries()), dispatch(deleteSelectedList());
      }, 2000);
    } else if (isError) {
      console.log("isError", isError);
      ToastAndroid.show(
        isError,
        ToastAndroid.SHORT
      );
      setTimeout(
        () => dispatch(resetBeneficiaries(), dispatch(deleteSelectedList())),
        2000
      );
    }
  }, [status, TypeOfParticipant]);

  const confirmCreaton=()=>{
    let ARR = [];
    GlobalBen.map((i) => {
      return ARR.push(i.userId);
    });
    GlobalBen3;

    let obj = {
      appUsers: ARR,
      noneAppUsers: GlobalBen3,
      projectId:projectId,
      token,
      type,
    };
      // console.log("obj", obj);
     dispatch(createParticipants(obj));
  }

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
            navigation.navigate("Béneféciare", { projectId, title });
          }}
          title={"Selected Beneficiaries"}
          sousTitre={`${ARR?.length} people selected`}
          Cancel="Return"
        />

        <ScrollView
          contentContainerStyle={{ width: SIZES.width }}
          showsVerticalScrollIndicator={false}
        >
          <Space space={15} />
          <View style={{ paddingHorizontal: 20 }}>
            <Rectangle width="100%" style={{ paddingVertical: 10 }}>
              <Content1 GlobalBen={GlobalBen} GlobalBen2={GlobalBen2} />
              <Content3 GlobalBen3={GlobalBen3} GlobalBen2={GlobalBen2} />
              <Content2 GlobalBen2={GlobalBen2} />
            </Rectangle>
            <Space />
          </View>
        </ScrollView>
        <Space space={120} />
      </>

      <View style={styles.containerButton}>
        <PrimaryButtonLinear
          loading={isLoading}
          disabled={true}
          onPress={() => {
            // let ARR = [];
            // GlobalBen.map((i) => {
            //   return ARR.push(i.userId);
            // });
            // GlobalBen3;

            // let obj = {
            //   appUsers: ARR,
            //   noneAppUsers: GlobalBen3,
            //   projectId,
            //   token,
            //   type,
            // };
            // // dispatch(confirmBeneficiaries(obj));
            // dispatch(createParticipants(obj));
            onSuccess2()

          }}
          width={"100%"}
        >
          confirm
        </PrimaryButtonLinear>
        <Space space={25} />
        <Line color={COLORS.black} />
      </View>
{/* 
      <CreatedSuccess Visible={success2} onDissmis={onDissmis2}>
        {BodyModelConfirmToReorder ? (
          <BodyModelConfirmToReorder
            onDissmis={onDissmis2}
            pressNo={pressNo}
            pressYes={pressYes}
          />
        ) : null}
      </CreatedSuccess> */}

      <ModelConfirmCreateParticipants
        success={success2}
        onDissmis={onDissmis2}
        pressNo={onDissmis2}
        pressYes={confirmCreaton}
      />
    </SafeAreaView>
  );
};
export default ListBéneféciare;

const Content1 = ({ GlobalBen, GlobalBen2 }) => {
  return GlobalBen?.map((i, index) => {
    return (
      <View key={index}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              // handleOnChange(index, item);
            }}
          >
            <View>
              <Image
                source={thumbnailPath}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
            <View style={{ width: "57%" }}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}
              >
                {i.firstName}
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {i.mobileNumber}
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen?.length - 1 && !GlobalBen2.length ? null : (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: COLORS.silverTwo,
              }}
            ></View>
          )}
        </>
      </View>
    );
  });
};
const Content2 = ({ GlobalBen3, GlobalBen2 }) => {
  return GlobalBen3?.map((i, index) => {
    return (
      <View key={index}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              // handleOnChange(index, item);
            }}
          >
            <View>
              <Image
                source={thumbnailPath}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
            <View style={{ width: "57%" }}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}
              >
                Pippa Rachel
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {i}
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen3?.length - 1 && !GlobalBen2.length ? null : (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: COLORS.silverTwo,
              }}
            ></View>
          )}
        </>
      </View>
    );
  });
};
const Content3 = ({ GlobalBen2 }) => {
  return GlobalBen2?.map((i, index) => {
    return (
      <View key={index}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              // handleOnChange(index, item);
            }}
          >
            <View style={{ width: "57%" }}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}
              >
                {i.displayName}
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {/* {i} */}
                {i?.phoneNumbers[0]?.number}
              </_.Txt>
              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                jonathan-joseph@diaspo.com
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen2?.length - 1 ? null : (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: COLORS.silverTwo,
              }}
            ></View>
          )}
        </>
      </View>
    );
  });
};

const BodyModelConfirmToReorder = ({ onDissmis, pressNo, pressYes }) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <_.Head
          //fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
        >
          Do you want to define the beneficary positions?!
        </_.Head>

        <HView spaceBetween>
          <PaleGreyButton
            onPress={() => {
              onDissmis();
              pressNo();
            }}
            width={"48%"}
          >
            no
          </PaleGreyButton>
          <PrimaryButtonLinear
            disabled={true}
            width={"48%"}
            onPress={() => {
              onDissmis();
              pressYes();
            }}
          >
            yes
          </PrimaryButtonLinear>
        </HView>
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
    // //fontFamily: "Roboto-Bold",
    flex: 1,
    paddingLeft: 2,
  },
  Container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
  },
});

{
  /* <CreatedSuccess Visible={success} onDissmis={onDissmis}>
        {BodyModel ? (
          <BodyModel onDissmis={onDissmis} NavToCnfPayer={NavToCnfPayer} />
        ) : null}
      </CreatedSuccess> */
}

{
  /* <CreatedSuccess Visible={success2} onDissmis={onDissmis2}>
        {BodyModelConfirmToReorder ? (
          <BodyModelConfirmToReorder
            onDissmis={onDissmis2}
            pressNo={pressNo}
            pressYes={pressYes}
          />
        ) : null}
      </CreatedSuccess> */
}
// const BodyModel = ({ onDissmis, NavToCnfPayer }) => {
//   return (
//     <>
//       <View style={styles.ModelContainer}>
//         <_.Head
//          fontFamily={"Poppins-Bold"}
//           style={{ padding: 20, textAlign: "center" }}
//         >
//           Do you want to use the list of payers as beneficaries?
//         </_.Head>

//         <HView spaceBetween>
//           <PaleGreyButton
//             onPress={() => {
//               onDissmis();
//               NavToCnfPayer();
//             }}
//             width={"48%"}
//           >
//             no
//           </PaleGreyButton>
//           <PrimaryButtonLinear
//             disabled={true}
//             onPress={onDissmis}
//             width={"48%"}
//           >
//             yes
//           </PrimaryButtonLinear>
//         </HView>
//       </View>
//     </>
//   );
// };

// const [checkedState, setCheckedState] = useState(
//   new Array(item?.length).fill(true)
// );

// let Reinitiliser = false;
// const [currentOptionSelected, setCurrentOptionSelected] = useState([]);
// const handleOnChange = (position, option) => {
//   const updatedCheckedState = item.map((item, index) =>
//     index === position ? !item : item
//   );
//   setCheckedState(updatedCheckedState);

//   let filter = currentOptionSelected.includes(option);
//   if (filter) {
//     let itemsCopy = [...currentOptionSelected];
//     var index = currentOptionSelected.indexOf(option);
//     itemsCopy.splice(index, 1); // to delete one item from the new array
//     setCurrentOptionSelected(itemsCopy);
//   } else {
//     setCurrentOptionSelected([...currentOptionSelected, option]);
//   }
// };

// const { globaleBeneficiariesSelected } = useSelector((state) => ({
//   ...state.tontines,
// }));

// console.log("globalePayerSelected", globalePayerSelected.length);

// useEffect(() => {
//   setCheckedState(new Array(item?.length).fill(true));
// }, [item]);

// Navigate to confirmed List payer

{
  /* <CircleCheckBox
                          onPress={() => {
                            handleOnChange(index, item);
                          }}
                          checked={check[index]}
                          index={index}
                        /> */
}
// console.log("GlobalBen", GlobalBen);

{
  /* <CardUser
                      item={i}
                      index={index}
                      length={ARR?.length}
                      handleOnChange={handleOnChange}
                      checkedState={checkedState}
                      check={checkedState}
                      ind={ind}
                    /> */
}
