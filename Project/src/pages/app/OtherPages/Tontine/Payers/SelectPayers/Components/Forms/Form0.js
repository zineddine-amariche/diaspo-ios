import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CardUser from "../CardUser";
import { COLORS } from "../../../../../../../../theme";
import { Head, Txt } from "../../../../../../../../components/utils";
import Rectangle from "../../../../../../../../components/views/Rectangle";
import Space from "../../../../../../../../components/Space";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thumbnailPath from "../../../../../../../../Assets/Img/ContactsUser.png";

import {
  resetTontine,
  selcetConnectContacts,
  updateCheckConnectedUser,
  updateGlobalePayerSelected,
} from "../../../../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice";
// import {
//   connected,
//   resetUserConnected,
// } from "../../../../../../../../redux/Features/2-Tontine/Manage-Payers/ConectedUsers/slice";
import { resetNonAppUserConnected } from "../../../../../../../../redux/Features/Tontine/ManagePayers/NonAppUsers/slice";
import UseCheckBoxElements from "../../../../../../../../components/checkBox/useCheckBoxElements";
import { Logout } from "../../../../../../../../redux/Features/authentification/Login/Slice";

import {
  connected,
  resetUserConnected,
} from "../../../../../../../../redux/Features/Tontine/ManagePayers/ConectedUsers/slice";
import {
  ActiveLoaderPayer,
  disableSelectedListPayers,
  resetPayers,
  updateUserConnectedPayers,
} from "../../../../../../../../redux/Features/Tontine/ManagePayers";
import { useMemo } from "react";
import { FlatList } from "react-native";

import SimpleSpiner from "../../../../../../../../components/spiner/SimpleSpiner";
const durationMs = 350;

const Form0 = ({ index, setGlobalBen }) => {
  const dispatch = useDispatch();

  const { contacts } = useSelector((state) => ({
    ...state.contacts,
  }));
  const { deleteListPayers } = useSelector((state) => ({
    ...state.payers,
  }));
  const { token } = useSelector((state) => ({ ...state.token }));
  const { connectedUsers, loading, message } = useSelector((state) => ({
    ...state.userApp,
  }));

  // console.log('connectedUsers', connectedUsers)
  const [Data, setdata] = useState([]);

  let nbr = 7;
  const [next, setNext] = useState(nbr);
  const [Loading, setLoading] = useState(false);
  let dataV =Data ? Data?.slice(0, next) : [];

  // !select check
  const HandelChangeCheck = (item) => {
    let data = [...Data];
    let index = data.findIndex((x) => x.id === item);
    data[index].checked = data[index].checked === false ? true : false;
    setdata(data);
  };
  //  !select Value Connected Payers
  const getSelectedVal = (item) => {
    let keys = Data.map((t) => t.key);
    let checks = Data.map((t) => t.checked);
    let Selected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        Selected.push(keys[i]);
      }
    }
    // console.log('Selected', Selected)
    dispatch(ActiveLoaderPayer());

    setTimeout(() => {
      dispatch(updateUserConnectedPayers(Selected));
      setGlobalBen(Selected);
    }, 500);
  };
  // !getUsers
  useEffect(() => {
    // getUsers();
    let arr = [];
    contacts?.map((item) => {
      arr.push(item?.phoneNumbers[0]?.number);
    });
    // console.log('arr', arr)
    let object = {
      mobileNumbers: arr,
      token,
    };
    //  console.log("phone numbers", object?.mobileNumbers);
    dispatch(connected(object));
  }, []);
  // !create new object
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

    if (deleteListPayers) {
      setGlobalBen([]);
      setTimeout(() => dispatch(resetPayers()), durationMs);
      let formatdata = [];
      for (let i = 0; i < temp?.length; i++) {
        formatdata.push({
          id: i,
          key: temp[i],
          checked: false,
        });
      }
      setdata(formatdata);
      dispatch(disableSelectedListPayers());
    }
  }, [connectedUsers, deleteListPayers]);

  // !claer message
  const clearAsyncStorage = async () => {
    dispatch(resetUserConnected());
    dispatch(resetNonAppUserConnected());
    dispatch(Logout());
    AsyncStorage.clear();
    dispatch(resetTontine());
  };
  // !show messges
  useEffect(() => {
    if (message && index === 0) {
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

  const handleMoreImage = () => {
    setNext(next + 7);
  };

  const renderItem = ({ item, index }) => {
    return (
      <RenderItems
        item={item}
        index={index}
        HandelChangeCheck={HandelChangeCheck}
        getSelectedVal={getSelectedVal}
      />
    );
  };

  const renderLoader = () => {
    return Loading ? <SimpleSpiner /> : null;
  };
  const loadMore = ({ distanceFromEnd }) => {
    if (next < Data?.length) {
      setLoading(true);
      handleMoreImage();
    }
  };
  useEffect(() => {
    if (next === Data?.length || next>Data?.length) {
      setLoading(false);
    }
  }, [next]);
  const memoizedValue = useMemo(() => renderItem, [Data]);

 
  return (
    <>
      {loading ? (
        <SimpleSpiner />
      ) : (
        <>
          {dataV?.length ? (
            <View
              style={{
                backgroundColor: COLORS.paleGrey,
                padding: 20,
                flex: 1,
              }}
            >
              <View style={{ flex: 1 }}>
                {/* {Data?.length ? (
                  <Txt>{Data?.length} connected users</Txt>
                ) : null} */}

                <View style={{ marginBottom: 15 }}>
                  {dataV?.length ? (
                    <Txt>{Data?.length} connected users</Txt>
                  ) : null}
                </View>

                <View style={{ backgroundColor: "#FFF", marginBottom: 20 }}>
                  <FlatList
                    data={dataV}
                    renderItem={memoizedValue}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={renderLoader}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.1}
                  />
                </View>
              </View>

              <Space space={20} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Txt color={COLORS.coral}>There are no connected users .</Txt>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Form0;

const Line = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: COLORS.silverTwo,
      }}
    ></View>
  );
};

const RenderItems = ({
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
    <View key={index}>
      <>
        <TouchableOpacity
          style={styles.Container}
          onPress={() => {
            HandelChangeCheck(item.id);
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
        {index === Data?.length - 1 ? null : <Line />}
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
