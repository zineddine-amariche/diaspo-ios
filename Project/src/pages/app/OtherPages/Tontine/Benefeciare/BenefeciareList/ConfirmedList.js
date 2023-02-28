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

import SecondaryHeader from "../../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../../components/Space";
import { Head, Txt } from "../../../../../../components/utils";
import { COLORS, SIZES } from "../../../../../../theme";

import thumbnailPath from "../../../../../../Assets/Img/ContactsUser.png";

import Rectangle from "../../../../../../components/views/Rectangle";

import Line from "../../../../../../components/views/line";
import { TouchableOpacity } from "react-native";
import { PrimaryButtonLinear } from "../../../../../../components/Buttons";
import {
  deleteSelectedList,
  resetBeneficaire,
} from "../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { getBeneficiaries } from "../../../../../../redux/Features/Tontine/Participants/getBeneficiaires/slice";
const durationMs = 350;

const ConfirmedListBéneféciare = ({
  navigation,
  navigation: { goBack },
  route,
}) => {
  const { GlobalBen, GlobalBen2, GlobalBen3, ind, ARR } = route.params;
  const dispatch = useDispatch();
  const { PayerId, } = route.params;

  const { isSuccessList, loadingList, listBeneficiaries } = useSelector(
    (state) => ({
      ...state.BeneficiariesList,
    })
  );

  const { token } = useSelector((state) => ({ ...state.token }));
  const NavTobenefOrder = () => {
    navigation.navigate("BenefeciareListReorder", {
      GlobalBen,
      GlobalBen2,
      GlobalBen3,
      ARR,
      ind,
    });
  };
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   if (PayerId) {
  //     console.log("enter");
  //     let obj = {
  //       payerId: PayerId,
  //       token,
  //     };
  //     dispatch(getListBeneficiaries(obj));
  //   }
  // }, [isFocused,PayerId]);
  // console.log('listBeneficiaries', listBeneficiaries?.data?.Beneficiaries)
  const object = {
    projectId,
    token
  }
  useEffect(() => {
    dispatch(getBeneficiaries(object));
  }, [PayerId]);

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
              Cancel="Return"
              goBack={() => {
                navigation.navigate("Tontine");
                //
                setTimeout(
                  () =>
                    dispatch(
                      resetBeneficaire(),
                      dispatch(deleteSelectedList())
                    ),
                  durationMs
                );
              }}
              title={"Beneficiaries List"}
              sousTitre={
                !listBeneficiaries?.data?.Beneficiaries?.length
                  ? null
                  : `${listBeneficiaries?.data?.Beneficiaries?.length} people selected`
              }
            />
            {!listBeneficiaries?.data?.Beneficiaries?.length ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Txt textTransform={"none"}>Beneficiaries list is empty </Txt>
              </View>
            ) : (
              <ScrollView
                contentContainerStyle={{ width: SIZES.width }}
                showsVerticalScrollIndicator={false}
              >
                <Space space={15} />
                <View style={{ paddingHorizontal: 20 }}>
                  <Rectangle width="100%" style={{ paddingVertical: 10 }}>
                    {listBeneficiaries?.data?.Beneficiaries?.map((i, index) => {
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
                              <View style={{ width: "55%" }}>
                                <Head
                                  fontSize={17}
                                  color={COLORS.darkBlueGrey}
                                  numberOfLines={1}
                                >
                                  {i?.beneficiaryDetails?.firstName}{" "}
                                  {i?.beneficiaryDetails?.lastName}
                                </Head>

                                <Txt fontSize={12} color={COLORS.coolGrey}>
                                  {i?.beneficiaryDetails?.mobileNumber}
                                </Txt>
                              </View>

                              {/* <UseCheckBoxElements index={index} isCheck={true} /> */}
                              {/* {index == 1 ? (
                              <View
                                style={{
                                  backgroundColor: COLORS.iceBlueTwo,
                                  paddingHorizontal: 15,
                                  paddingVertical: 5,
                                  borderRadius: 13,
                                  width: 90,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Txt fontSize={14} color={COLORS.darkSkyBlue}>
                                  Awaiting
                                </Txt>
                              </View>
                            ) : index !== 3 ? (
                              <View
                                style={{
                                  backgroundColor: COLORS.lightSage,
                                  paddingHorizontal: 15,
                                  paddingVertical: 5,
                                  borderRadius: 13,
                                  width: 90,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Txt fontSize={14} color={COLORS.greenishTeal}>
                                  Accepted
                                </Txt>
                              </View>
                            ) : (
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
                                  Denied
                                </Txt>
                              </View>
                            )} */}

                              <Awaiting
                                // status={i?.status}
                                status={"status"}
                              />
                            </TouchableOpacity>
                            {/* {index === GlobalBen?.length - 1 &&
                          !GlobalBen2.length ? null : (
                            <View
                              style={{
                                height: 1,
                                width: "100%",
                                backgroundColor: COLORS.silverTwo,
                              }}
                            ></View>
                          )} */}
                          </>
                        </View>
                      );
                    })}
                  </Rectangle>
                  <Space />
                </View>
              </ScrollView>
            )}

            <Space space={110} />
          </>
          {listBeneficiaries?.data?.Beneficiaries?.length && (
            <View style={styles.containerButton}>
              <PrimaryButtonLinear
                disabled={true}
                onPress={() => {
                  NavTobenefOrder();
                }}
                width={"100%"}
              >
                Reorder Beneficiaries
              </PrimaryButtonLinear>
              <Space space={25} />
              <Line color={COLORS.black} />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};
export default ConfirmedListBéneféciare;

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
});

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

// useEffect(() => {
//   setCheckedState(new Array(item?.length).fill(true));
// }, [item]);

// const [success, setsuccess] = useState(false);

// const onDissmis = useCallback(() => {
//   setsuccess(false);
// }, []);
// const onSuccess = useCallback(() => {
//   setsuccess(true);
// }, []);

// {GlobalBen3?.map((i, index) => {
//   return (
//     <View key={index}>
//       <>
//         <TouchableOpacity
//           style={styles.Container}
//           onPress={() => {
//             // console.log('index' , index)
//             // handleOnChange(index, item);
//           }}
//         >
//           <View>
//             <Image
//               source={thumbnailPath}
//               style={styles.Img}
//               resizeMode="contain"
//             />
//           </View>
//           <View style={{ width: "55%" }}>
//             <Head
//               fontSize={17}
//               color={COLORS.darkBlueGrey}
//               numberOfLines={1}
//             >
//               Pippa Rachel
//             </Head>

//             <Txt fontSize={12} color={COLORS.coolGrey}>
//               {i}
//             </Txt>
//           </View>

//           {/* <UseCheckBoxElements index={index} isCheck={true} /> */}
//           {index == 1 ? (
//             <View
//               style={{
//                 backgroundColor: COLORS.iceBlueTwo,
//                 paddingHorizontal: 15,
//                 paddingVertical: 5,
//                 borderRadius: 13,
//                 width: 90,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Txt fontSize={14} color={COLORS.darkSkyBlue}>
//                 Awaiting
//               </Txt>
//             </View>
//           ) : index !== 3 ? (
//             <View
//               style={{
//                 backgroundColor: COLORS.lightSage,
//                 paddingHorizontal: 15,
//                 paddingVertical: 5,
//                 borderRadius: 13,
//                 width: 90,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Txt fontSize={14} color={COLORS.greenishTeal}>
//                 Accepted
//               </Txt>
//             </View>
//           ) : (
//             <View
//               style={{
//                 backgroundColor: COLORS.veryLightPink,
//                 paddingHorizontal: 15,
//                 paddingVertical: 5,
//                 borderRadius: 13,
//                 width: 90,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Txt fontSize={14} color={COLORS.coral}>
//                 Denied
//               </Txt>
//             </View>
//           )}
//         </TouchableOpacity>
//         {index === GlobalBen3?.length - 1 &&
//         !GlobalBen2.length ? null : (
//           <View
//             style={{
//               height: 1,
//               width: "100%",
//               backgroundColor: COLORS.silverTwo,
//             }}
//           ></View>
//         )}
//       </>
//     </View>
//   );
// })}

// {GlobalBen2?.map((i, index) => {
//   return (
//     <View key={index}>
//       <>
//         <TouchableOpacity
//           style={styles.Container}
//           onPress={() => {
//             // console.log('index' , index)
//             // handleOnChange(index, item);
//           }}
//         >
//           {/* <View>
//             <Image
//               source={thumbnailPath}
//               style={styles.Img}
//               resizeMode="contain"
//             />
//           </View> */}
//           <View style={{ width: "57%" }}>
//             <Head
//               fontSize={17}
//               color={COLORS.darkBlueGrey}
//               numberOfLines={1}
//             >
//               {i.displayName}
//             </Head>

//             <Txt fontSize={12} color={COLORS.coolGrey}>
//               {/* {i} */}
//               {i?.phoneNumbers[0]?.number}
//             </Txt>
//             <Txt fontSize={12} color={COLORS.coolGrey}>
//               jonathan-joseph@diaspo.com
//             </Txt>
//           </View>

//           {/* <UseCheckBoxElements index={index} isCheck={true} /> */}
//           {index == 1 ? (
//             <View
//               style={{
//                 backgroundColor: COLORS.iceBlueTwo,
//                 paddingHorizontal: 15,
//                 paddingVertical: 5,
//                 borderRadius: 13,
//                 width: 90,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Txt fontSize={14} color={COLORS.darkSkyBlue}>
//                 Awaiting
//               </Txt>
//             </View>
//           ) : index !== 3 ? (
//             <View
//               style={{
//                 backgroundColor: COLORS.lightSage,
//                 paddingHorizontal: 15,
//                 paddingVertical: 5,
//                 borderRadius: 13,
//                 width: 90,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Txt fontSize={14} color={COLORS.greenishTeal}>
//                 Accepted
//               </Txt>
//             </View>
//           ) : (
//             <View
//               style={{
//                 backgroundColor: COLORS.veryLightPink,
//                 paddingHorizontal: 15,
//                 paddingVertical: 5,
//                 borderRadius: 13,
//                 width: 90,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <Txt fontSize={14} color={COLORS.coral}>
//                 Denied
//               </Txt>
//             </View>
//           )}
//         </TouchableOpacity>
//         {index === GlobalBen2?.length - 1 ? null : (
//           <View
//             style={{
//               height: 1,
//               width: "100%",
//               backgroundColor: COLORS.silverTwo,
//             }}
//           ></View>
//         )}
//       </>
//     </View>
//   );
// })}
