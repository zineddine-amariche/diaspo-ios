import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Head, Txt } from "../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import Rectangle from "../../../../../../../../components/views/Rectangle";
import { useState } from "react";
import thumbnailPath from "../../../../../../../../Assets/Img/ContactsUser.png";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import HView from "../../../../../../../../components/views/HView/HView";
import UseCheckBoxElements from "../../../../../../../../components/checkBox/useCheckBoxElements";
import { useIsFocused } from "@react-navigation/native";
import { useMemo } from "react";
import { FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import {
  ActiveLoader,
  disableSelectedList,
  resetBeneficaire,
  updateUserContacts,
} from "../../../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare";

const Form1 = ({ setGlobalBen }) => {
  const dispatch = useDispatch();
  const durationMs = 350;

  const { contacts } = useSelector((state) => ({ ...state.contacts }));
  const [ContactsData, setContactsData] = useState([]);
  const isFocsed = useIsFocused();
  let nbr = 7;
  const [next, setNext] = useState(nbr);
  const [Loading, setLoading] = useState(false);
  let dataV = ContactsData?.slice(0, next);
  const { deleteList } = useSelector((state) => ({
    ...state.beneficaire,
  }));
  const renderLoader = () => {
    return Loading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="small" color={COLORS.blueGreen} />
      </View>
    ) : null;
  };

  const loadMore = ({ distanceFromEnd }) => {
    if (next < ContactsData.length) {
      setLoading(true);
      handleMoreImage();
    }
  };
  const renderItem = ({ item, index }) => {
    return (
      <View key={index}>
        <>
          <View>
            <TouchableOpacity
              onPress={() => {
                HandelChangeCheck(item.id);
                getSelectedVal(item);
              }}
              style={styles.Container}
            >
              <View>
                <Image
                  source={thumbnailPath}
                  style={styles.Img}
                  resizeMode="contain"
                />
              </View>
              <HView spaceBetween>
                <View style={{ width: "57%" }}>
                  <Head
                    fontSize={17}
                    color={COLORS.darkBlueGrey}
                    numberOfLines={1}
                  >
                    {item.key.displayName}
                  </Head>

                  <Txt fontSize={12} color={COLORS.coolGrey}>
                    {item?.key.phoneNumbers[0]?.number}
                  </Txt>
                </View>

                <UseCheckBoxElements index={index} isCheck={item.checked} />
              </HView>
            </TouchableOpacity>
          </View>
          {index === ContactsData.length - 1 ? null : (
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

  const handleMoreImage = () => {
    setNext(next + 7);
  };
  // !select contact
  const HandelChangeCheck = (item) => {
    let data = [...ContactsData];
    let index = ContactsData.findIndex((x) => x.id === item);
    data[index].checked = data[index].checked === false ? true : false;
    setContactsData(data);
  };
  //  !select Value Connected Beneficaire
  const getSelectedVal = (item) => {
    var keys = ContactsData.map((t) => t.key);
    var checks = ContactsData.map((t) => t.checked);
    let Selected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        Selected.push(keys[i]);
      }
    }
    dispatch(ActiveLoader());

    setTimeout(() => {
      dispatch(updateUserContacts(Selected));
      setGlobalBen(Selected);
    }, 500);
  };
  // !creat new object
  useEffect(() => {

    if(contacts){


      let temp = [...contacts];
      let formatdata = [];
      for (let i = 0; i < temp?.length; i++) {
        formatdata.push({
          id: i,
          key: temp[i],
          checked: false,
        });
      }
  
      setContactsData(formatdata);
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
        setContactsData(formatdata);
        dispatch(disableSelectedList());
      }
    }
    // if (deleteList) {
    //   setGlobalBen([]);
    //   setTimeout(() =>  dispatch(resetBeneficaire()), durationMs);
    // }
  }, [deleteList]);

  useEffect(() => {
    if (next > ContactsData.length) {
      setLoading(false);
    }
  }, [next]);
  const memoizedValue = useMemo(() => renderItem, [ContactsData]);

  useEffect(() => {
    if (next === ContactsData.length) {
      setLoading(false);
    }
  }, [next]);






  return (
    <>
      {ContactsData?.length ? (
        <View
          style={{ backgroundColor: COLORS.paleGrey, padding: 20, flex: 1 }}
        >
          <View style={{ marginBottom: 15 }}>
            <Txt>{ContactsData?.length} users from your contact </Txt>
          </View>

          <View style={{ flex: 1, backgroundColor: "#FFF", marginBottom: 20 }}>
            <FlatList
              data={dataV}
              renderItem={memoizedValue}
              keyExtractor={(item, index) => index}
              ListFooterComponent={renderLoader}
              onEndReached={loadMore}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Txt color={COLORS.coral} style={{ padding: 20 }}>
            There are no contacts.
          </Txt>
        </View>
      )}
    </>
  );
};

export default Form1;

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

{
  /* <CircleCheckBox
              onPress={() => {
                // handleOnChange(index, item);
                // HandelChageGlobale(index,item)
              }}
              checked={check[index]}
              index={index}
            /> */
}
// const dispatch = useDispatch();
// const [checkedState, setCheckedState] = useState(
//   new Array(contacts?.length).fill(false)
// );

// const {
//   selectedConectedContacts,
//   selectedFromContacts,
//   selectedNonAppContacts,
//   globalePayerSelected,
//   globaleBeneficiariesSelected,
// } = useSelector((state) => ({
//   ...state.tontines,
// }));

// const [currentOptionSelected, setCurrentOptionSelected] = useState([]);

// const { check2, check1 } = useSelector((state) => ({
//   ...state.tontines,
// }));

// const handleOnChange = (position, option) => {
//   const updatedCheckedState = checkedState.map((item, index) =>
//     index === position ? !item : item
//   );
//   setCheckedState(updatedCheckedState);
//   dispatch(updateCheckFromConnectedUser(updatedCheckedState)); // garder checked contacts after change value
//   let filter = currentOptionSelected.includes(option);
//   if (filter) {
//     let itemsCopy = [...currentOptionSelected];
//     var index = currentOptionSelected.indexOf(option);
//     itemsCopy.splice(index, 1); // to delete one item from the new array
//     setCurrentOptionSelected(itemsCopy);

//     dispatch(selcetFromContacts(itemsCopy));
//     // dispatch(
//     //   updateGlobalePayerSelected([...currentOptionSelected, itemsCopy])
//     // );
//     // dispatch(updateGlobalePayerSelected([...globalePayerSelected, itemsCopy]));

//     // dispatch(
//     //   updateGlobalePayerSelected([
//     //     ...globalePayerSelected,
//     //     ...selectedFromContacts
//     //   ])
//     // );
//     // console.log('itemsCopy', itemsCopy)
//   } else {
//     setCurrentOptionSelected([...currentOptionSelected, option]);
//     dispatch(selcetFromContacts([...currentOptionSelected, option]));
//     // dispatch(updateGlobalePayerSelected([...globalePayerSelected, option]));

//     // dispatch(
//     //   updateGlobalePayerSelected([
//     //     ...globalePayerSelected,
//     //     ...selectedFromContacts
//     //   ])
//     // );
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
//     dispatch(updateGlobalePayerSelected(itemsCopy));
//   } else {
//     dispatch(updateGlobalePayerSelected([...globaleBeneficiariesSelected, option]));
//   }
// };

// useEffect(() => {
//   if (!Reinitiliser) {
//     let AR = new Array(contacts?.length).fill(false);
//     setCheckedState(AR);
//   }
// }, [Reinitiliser]);

{
  /* <UserCardContacts
                        // item={item}
                        // index={index}
                        // length={contacts?.length}
                        // handleOnChange={handleOnChange}
                        // HandelChageGlobale={HandelChageGlobale}
                        // checkedState={checkedState}
                        // check={check2}

                        item={item?.key}
                        id={item?.id}
                        index={index}
                        length={ContactsData?.length}
                        check={item?.checked}
                        connected
                        HandelChangeCheck={HandelChangeCheck}
                        getSelectedVal={getSelectedVal}
                      /> */
}

// useEffect(() => {
//   dispatch(updateGlobaleBeneficiariesSelected2(Values2));

// }, [Values2]);

// console.log('globaleBeneficiariesSelected2', globaleBeneficiariesSelected2)

// const { globaleBeneficiariesSelected2,  } = useSelector((state) => ({
//   ...state.tontines,
// }));

{
  /* {ContactsData?.slice(0, next)?.map((item, index) => {
                  return (
                   
                  );
                })} */
}
