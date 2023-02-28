import { Alert, FlatList, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { COLORS } from "../../../../../../../../theme";
import { Head, Txt } from "../../../../../../../../components/utils";
import Rectangle from "../../../../../../../../components/views/Rectangle";
import Space from "../../../../../../../../components/Space";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetTontine } from "../../../../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice";
import { resetNonAppUserConnected } from "../../../../../../../../redux/Features/Tontine/ManagePayers/NonAppUsers/slice";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import thumbnailPath from "../../../../../../../../Assets/Img/ContactsUser.png";
import UseCheckBoxElements from "../../../../../../../../components/checkBox/useCheckBoxElements";
import { useIsFocused } from "@react-navigation/native";
import { Logout } from "../../../../../../../../redux/Features/authentification/Login/Slice";
import { ActivityIndicator } from "react-native-paper";
import {
  ActiveLoader,
  disableSelectedList,
  resetBeneficaire,
  updateUserConnected,
} from "../../../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare";
import {
  resetUserConnected,
  connected,
} from "../../../../../../../../redux/Features/Tontine/ManagePayers/ConectedUsers/slice";
import SimpleSpiner from "../../../../../../../../components/spiner/SimpleSpiner";

const durationMs = 350;

const Form0 = ({ TabIndex, setGlobalBen }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => ({ ...state.token }));

  const { connectedUsers, loading, message } = useSelector((state) => ({
    ...state.userApp,
  }));

  // console.log('connectedUsers', connectedUsers)
  const { deleteList } = useSelector((state) => ({
    ...state.beneficaire,
  }));

  const { contacts } = useSelector((state) => ({
    ...state.contacts,
  }));
  const [Data, setdata] = useState([]);

  let nbr = 7;
  const [next, setNext] = useState(nbr);
  const [Loading, setLoading] = useState(false);

  let dataV = Data?.slice(0, next);

  const renderLoader = () => {
    return Loading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="small" color={COLORS.blueGreen} />
      </View>
    ) : null;
  };

  const handleMoreImage = () => {
    setNext(next + 7);
  };

  const loadMore = ({ distanceFromEnd }) => {
    if (next < Data.length) {
      setLoading(true);
      handleMoreImage();
    }
  };
  useEffect(() => {
    if (next === Data.length || next > Data.length) {
      setLoading(false);
    }
  }, [next]);

  useEffect(() => {
    if (next === Data.length) {
      setLoading(false);
    }
  }, [next]);

  // !select check
  const HandelChangeCheck = (item) => {
    let data = [...Data];
    let index = data.findIndex((x) => x.id === item);
    data[index].checked = data[index].checked === false ? true : false;
    setdata(data);
  };
  //  !select Value Connected Beneficaire
  const getSelectedVal = (item) => {
    var keys = Data.map((t) => t.key);
    var checks = Data.map((t) => t.checked);
    let Selected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        Selected.push(keys[i]);
      }
    }
    dispatch(ActiveLoader());
    setTimeout(() => {
      dispatch(updateUserConnected(Selected));
      setGlobalBen(Selected);
    }, 500);
  };

  const clearAsyncStorage = async () => {
    dispatch(resetUserConnected());
    dispatch(resetNonAppUserConnected());
    dispatch(Logout());
    AsyncStorage.clear();
    dispatch(resetTontine());
  };

  const renderItem = ({ item, index }) => {
    return (
      <RenderItemes
        item={item}
        index={index}
        HandelChangeCheck={HandelChangeCheck}
        getSelectedVal={getSelectedVal}
      />
    );
  };

  useEffect(() => {
    let arr = [];
    contacts?.map((item) => {
      arr.push(item?.phoneNumbers[0]?.number);
    });
    dispatch(connected({ mobileNumbers: arr, token }));
  }, []);

  useEffect(() => {
    let temp = connectedUsers;
    let formatdata = [];
    for (let i = 0; i < temp?.length; i++) {
      formatdata.push({
        id: i,
        key: temp[i],
        checked: false,
      });
    }
    setdata(formatdata);
    if (deleteList) {
      setGlobalBen([]);
      setTimeout(() => dispatch(resetBeneficaire()), durationMs);
      let formatdata = [];
      for (let i = 0; i < temp?.length; i++) {
        formatdata.push({
          id: i,
          key: temp[i],
          checked: false,
        });
      }
      setdata(formatdata);
      dispatch(disableSelectedList());
    }
  }, [connectedUsers, deleteList]);
  useEffect(() => {
    if (message && TabIndex === 0) {
      Alert.alert(
        message?.status,
        message?.statusDescription
          ? message?.statusDescription
          : "Error getting information",
        [
          {
            text: "Cancel",
            onPress: () => {
              if (
                message?.statusDescription == "Expired token" ||
                message?.statusDescription == "Wrong number of segments"
              ) {
                clearAsyncStorage();
              } else {
                dispatch(resetUserConnected());
                dispatch(resetNonAppUserConnected());
              }
            },

            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              if (
                message?.statusDescription == "Expired token" ||
                message?.statusDescription == "Wrong number of segments"
              ) {
                clearAsyncStorage();
              } else {
                // dispatch(resetTontine());
                dispatch(resetUserConnected());
                dispatch(resetNonAppUserConnected());
              }
            },
          },
        ]
      );
    }
  }, [message]);

  const memoizedValue = useMemo(() => renderItem, [Data]);

  return (
    <>
      {loading ? (
        <SimpleSpiner />
      ) : (
        <>
          {dataV?.length  ? (
            <View style={styles.flatContainer}>
              <UserConected Data={Data} />
              <FlatList
                data={dataV}
                renderItem={memoizedValue}
                keyExtractor={(item, index) => index}
                ListFooterComponent={renderLoader}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  backgroundColor: "#FFF",
                  marginBottom: 20,
                }}
              />
              <Space space={20} />
            </View>
          ) : (
            <NoUSerData />
          )}
        </>
      )}
    </>
  );
};

export default Form0;

const UserConected = ({ Data }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      {Data.length ? <Txt>{Data?.length} connected users</Txt> : null}
    </View>
  );
};

const NoUSerData = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Txt color={COLORS.coral}>There are no connected users .</Txt>
    </View>
  );
};

const RenderItemes = ({
  HandelChangeCheck,
  getSelectedVal,
  item,
  index,
  Data,
}) => {
  const { informationsUser } = useSelector((state) => ({
    ...state.userInformations,
  }));
  let phoneNumber = informationsUser?.data.walletAccountUser?.mobileNumber;
  return (
    <View key={item.id}>
      <>
        <TouchableOpacity
          style={styles.Container}
          onPress={() => {
            HandelChangeCheck(item.id, item);
            getSelectedVal(item);
          }}
          disabled={phoneNumber !== item?.key.mobileNumber ? false : true}
        >
          <View>
            <Image
              source={thumbnailPath}
              style={styles.Img}
              resizeMode="contain"
            />
          </View>
          <View style={{ width: "57%" }}>
            <Head
              fontSize={17}
              color={
                phoneNumber !== item?.key.mobileNumber
                  ? COLORS.darkBlueGrey
                  : "#CCC"
              }
              numberOfLines={1}
            >
              {item?.key.firstName}
            </Head>

            <Txt
              fontSize={12}
              color={
                phoneNumber !== item?.key.mobileNumber
                  ? COLORS.coolGrey
                  : "#CCC"
              }
            >
              {item?.key.mobileNumber}
            </Txt>
          </View>
          {phoneNumber !== item?.key.mobileNumber ? (
            <UseCheckBoxElements index={index} isCheck={item.checked} />
          ) : (
            <View style={{ width: 40 }}>
              <Txt color={"#CCC"}>me</Txt>
            </View>
          )}
        </TouchableOpacity>
        {index === Data?.length - 1 ? null : (
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
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatContainer: {
    backgroundColor: COLORS.paleGrey,
    padding: 20,
    flex: 1,
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});

{
  /* <ScrollView
              contentContainerStyle={{
                justifyContent: "center",
                width: "100%",
              }}
            > */
}
{
  /* </ScrollView> */
}

// const { check1 } = useSelector((state) => ({
//   ...state.tontines,
// }));
// const {
//   selectedConectedContacts,
//   selectedFromContacts,
//   globalePayerSelected,
//   globaleBeneficiariesSelected,
// } = useSelector((state) => ({
//   ...state.tontines,
// }));
// const [checkedState, setCheckedState] = useState(
//   new Array(contacts?.length).fill(false)
// );
// const [currentOptionSelected, setCurrentOptionSelected] = useState([]);

// const handleOnChange = (position, option) => {
//   const updatedCheckedState = checkedState.map((item, index) =>
//     index === position ? !item : item
//   );
//   setCheckedState(updatedCheckedState);
//   // dispatch(updateCheckConnectedUser(updatedCheckedState)); // garder checked contacts after change value
//   let filter = GlobalBen.includes(option);
//   if (filter) {
//     let itemsCopy = [...GlobalBen];
//     var index = GlobalBen.indexOf(option);
//     itemsCopy.splice(index, 1); // to delete one item from the new array
//     setCurrentOptionSelected(itemsCopy);
//     // dispatch(selcetConnectContacts(itemsCopy));
//     // dispatch(updateGlobaleBeneficiariesSelected(itemsCopy));
//     setGlobalBen(itemsCopy);

//     // dispatch(
//     //   updateGlobalePayerSelected([
//     //     ...globalePayerSelected,
//     //     ...selectedConectedContacts
//     //   ])
//     // );
//     // console.log('itemsCopy', itemsCopy)
//   } else {
//     // setCurrentOptionSelected([...currentOptionSelected, option]);
//     // dispatch(updateGlobaleBeneficiariesSelected([...globaleBeneficiariesSelected, option]));
//     setGlobalBen([...GlobalBen, option]);

//     // dispatch(selcetConnectContacts([...currentOptionSelected, option]));
//     // console.log('[...currentOptionSelected, option]', [...currentOptionSelected, option])
//   }
// };
// const HandelChageGlobale = (position, option) => {
//   const updatedCheckedState = checkedState.map((item, index) =>
//     index === position ? !item : item
//   );
//   setCheckedState(updatedCheckedState);
//   let filterGlobaleContacts = globaleBeneficiariesSelected.includes(option);
//   if (filterGlobaleContacts) {
//     let itemsCopy = [...globaleBeneficiariesSelected];
//     var index = globaleBeneficiariesSelected.indexOf(option);
//     itemsCopy.splice(index, 1); // to delete one item from the new array of Globale Contacts
//     dispatch(updateGlobaleBeneficiariesSelected(itemsCopy));
//   } else {
//     dispatch(
//       updateGlobaleBeneficiariesSelected([
//         ...globaleBeneficiariesSelected,
//         option,
//       ])
//     );
//   }
// };

{
  /* <CardUser
                              item={item}
                              index={index}
                              length={Data?.length}
                              check={item.checked}
                              connected
                              HandelChangeCheck={HandelChangeCheck}
                              getSelectedVal={getSelectedVal}
                            /> */
}

{
  /* {item.checked ? (
                                  <Image
                                    source={require("../../../../../../../../Assets/Img/verified.png")}
                                  />
                                ) : (
                                  <Image
                                    source={require("../../../../../../../../Assets/Img/notverified.png")}
                                  />
                                )} */
}

// dispatch(updateGlobaleBene([...GlobalBen,Values]));

// let filterGlobaleContacts = globaleBeneficiariesSelected?.includes(Selected);
// console.log('filterGlobaleContacts', filterGlobaleContacts)
// if (filterGlobaleContacts) {
//   let itemsCopy = [...globaleBeneficiariesSelected];
//   var index = globaleBeneficiariesSelected.indexOf(Selected);
//   itemsCopy.splice(index, 1); // to delete one item from the new array of Globale Contacts
//   dispatch(updateGlobaleBeneficiariesSelected(itemsCopy));
// } else {
// }

// const getSelectedVal = useCallback((item) => {
//   var keys = Data.map((t) => t.key);
//   var checks = Data.map((t) => t.checked);
//   let Selected = [];
//   for (let i = 0; i < checks.length; i++) {
//     if (checks[i] == true) {
//       Selected.push(keys[i]);
//     }
//   }
//   // alert(Selected);
//   setGlobalBen(Selected)

//   // console.log("Selected", Selected);
//   setValues(Selected);
//   // dispatch(updateGlobaleBene([...GlobalBen,Values]));
// }, []);

// console.log('Data', Data)

// const HandelChangeCheck = useCallback((item) => {
//   console.log('item', item)
//   let data = [...Data];
//   let index = data.findIndex((x) => x.id === item);
//   data[index].checked = data[index].checked === false ? true : false;
//   setdata(data);
// }, []);

// useEffect(() => {
//   dispatch(updateGlobaleBeneficiariesSelected(Values));
// }, [Values]);

// console.log('TabIndex', TabIndex)
// console.log('Data', Data)
// console.log('connectedUserBeneficaire', connectedUserBeneficaire)
// console.log("globaleBeneficiariesSelected", globaleBeneficiariesSelected);

// console.log("Selected", Selected);
// alert(Selected);
// let itemm = item.replace(/^+/i, '')
// console.log('checks', checks)
// console.log("item", item );
// setValues(Selected);

// console.log("filterGlobaleContacts", filterGlobaleContacts);
// let filterGlobaleContacts = GlobalBen.includes([Selected]);
// if (filterGlobaleContacts) {
//   let itemsCopy = [...GlobalBen];
//   var index = GlobalBen.indexOf(item);
//   itemsCopy.splice(index, 1); // to delete one item from the new array of Globale Contacts
//   // dispatch(updateGlobalePayerSelected(itemsCopy));
//   setGlobalBen(itemsCopy)
// } else {
//   //  dispatch(updateGlobalePayerSelected([...globalePayerSelected, option]));
//   setGlobalBen([...GlobalBen,Selected])
// }

{
  /* {Data?.map((item, index) => {
                        return (
                          <View key={index}>
                            <>
                              <TouchableOpacity
                                style={styles.Container}
                                onPress={() => {
                                  HandelChangeCheck(item.id);
                                  getSelectedVal(item);
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
                                  <Head
                                    fontSize={17}
                                    color={COLORS.darkBlueGrey}
                                    numberOfLines={1}
                                  >
                                    {item?.key}
                                  </Head>

                                  <Txt fontSize={12} color={COLORS.coolGrey}>
                                    {item?.phoneNumbers[0]?.number}
                                  </Txt>
                                </View>
                                <UseCheckBoxElements
                                  index={index}
                                  isCheck={item.checked}
                                />
                              </TouchableOpacity>
                              {index === Data?.length - 1 ? null : (
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
                      })} */
}

// let keys = Data.map((t) => t.key);
// let checks = Data.map((t) => t.checked);
// let Selected = [];
// for (let i = 0; i < checks.length; i++) {
//   if (checks[i] == true) {
//   }
// }
// setSelected([...Selected ,item.key]);
// console.log('Selected', Selected)

// console.log('item.key', item.key)
//     const filterGlobaleContacts = GlobalBen.indexOf(item.key) >= 0;

//     console.log('filterGlobaleContacts', filterGlobaleContacts)
//     if (!filterGlobaleContacts) {
//       setGlobalBen(Selected);
//     } else {
//       let itemsCopy = [...GlobalBen];
//       var index = GlobalBen.indexOf(item);
//       itemsCopy.splice(index, 1); // !to delete one item from the new array of Globale Contacts
//       setGlobalBen(itemsCopy);
//     }

// useEffect(() => {
//   setTimeout(() => {
//     dispatch(updateUserConnected(Selected));
//   }, 2000);
// }, [Selected]);
// console.log("SelectedconnectUser", selectedconnectUser);

// let filterGlobaleContacts = Selected?.indexOf(item.key) >= 0;
// if (!filterGlobaleContacts) {
//   setSelected([...Selected,item.key]);
// } else {
//   let itemsCopy = [...Selected];
//   var index = Selected.indexOf(item);
//   itemsCopy.splice(index, 1); // !to delete one item from the new array of Globale Contacts
//   setSelected(itemsCopy);
// }
// GlobalBen
// setDisablecheck(true)
// let filterGlobaleContacts = Selected?.indexOf(item.key) >= 0;
// if (!filterGlobaleContacts) {
//   setDisablecheck(false)
//   setSelected([...Selected,item.key]);
//   // dispatch(updateUserConnected(Selected))
//   setTimeout(() => {
//     dispatch(updateUserConnected([...Selected,item.key]));
//   }, 1000);
// } else {
//   setDisablecheck(false)
//   let itemsCopy = [...Selected];
//   var index = Selected.indexOf(item);
//   itemsCopy.splice(index, 1); // !to delete one item from the new array of Globale Contacts
//   setSelected(itemsCopy);

//   // dispatch(updateUserConnected(Selected))
//   setTimeout(() => {
//     dispatch(updateUserConnected(itemsCopy));
//   }, 1000);
// }
// console.log("Selected", Selected);
