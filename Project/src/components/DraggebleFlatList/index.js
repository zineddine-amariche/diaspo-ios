import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  useOnCellActiveAnimation,
} from "react-native-draggable-flatlist";
import { useRef } from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";

import { COLORS, SIZES } from "../../theme";
import { Txt } from "../../components/utils";
import HView from "../../components/views/HView/HView";

import Top from "../../Assets/Img/Top.png";
import Bottom from "../../Assets/Img/Bottom.png";
import thumbnailPath from "../../Assets/Img/ContactsUser.png";
import { getToReoderListBeneficiary } from "../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare";
import { useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const UseDraggebleFlatList = ({ navigation, DataV }) => {
  const [data, setData] = useState([]);
const dispatch= useDispatch()
  // console.log("data", data);
  // console.log("DataV", DataV);
  const isFocused =useIsFocused()

  useEffect(() => {
    if (DataV) {
      setData(DataV);
    }
  }, [DataV,isFocused]);
  let length = data?.length;
  const renderItem = ({ item, drag, index }) => {
    const { isActive } = useOnCellActiveAnimation;
    return (
      <ScaleDecorator>
        <OpacityDecorator>
          <ShadowDecorator>
            <TouchableOpacity
              onLongPress={drag}
              activeOpacity={1}
              style={{
                elevation: isActive ? 30 : 0,
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomWidth: length !== index + 1 ? 1 : 0,
                alignSelf: "center",
                backgroundColor: "#FFF",
                width: "90%",
                borderBottomColor: COLORS.silverTwo,
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: "#FFF",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      height: 30,
                      width: 30,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: COLORS.paleGrey,
                      marginRight: 20,
                    }}
                  >
                    <Txt>{index + 1}</Txt>
                  </View>
                  <>
                    <HView>
                      <Image
                        source={thumbnailPath}
                        style={styles.Img}
                        resizeMode="contain"
                      />
                      <View style={{ backgroundColor: "#FFF" }}>
                        <Txt color={COLORS.darkBlueGrey} fontSize={16}>
                          {item?.beneficiaryDetails?.details?.firstName}{" "}
                          {item?.beneficiaryDetails?.details?.lastName}
                        </Txt>
                        <Txt fontSize={12} color={COLORS.coolGrey}>
                          {item?.beneficiaryDetails?.details?.mobileNumber}
                        </Txt>
                      </View>
                    </HView>
                  </>
                </View>
                {/* <View style={{ flexDirection: "row" }}>
                  <Image
                    source={Top}
                    style={{ marginRight: 7 }}
                    resizeMode="contain"
                  />
                  <Image
                    source={Bottom}
                    style={{ marginRight: 5 }}
                    resizeMode="contain"
                  />
                </View> */}
              </Animated.View>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  };
  const ref = useRef(null);


  return (
    <SafeAreaView style={styles.container1}>
      <View style={{ flex: 1 }}>
        {data ? (
          <>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                padding: 20,
              }}
            >
              <Txt color={COLORS.slateGrey} fontSize={14}>
                Hold, drag and drop to reorder beneficiaries
              </Txt>
            </View>

            <DraggableFlatList
              containerStyle={{ marginHorizontal: 2 }}
              ref={ref}
              data={data}
              keyExtractor={(item) => `draggable-item-${item?.participantId}`}
              onDragEnd={({ data }) => {
                setData(data);
                dispatch(getToReoderListBeneficiary(data))
              }}
              renderItem={renderItem}
            />
          </>
        ) : (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text>The list is empty .</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default UseDraggebleFlatList;

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  soustext: {
    fontSize: 12,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    borderBottomEndRadius: 15,
    overflow: "hidden",
    borderBottomStartRadius: 15,
    height: 110,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
    marginRight: 6,
  },
});
