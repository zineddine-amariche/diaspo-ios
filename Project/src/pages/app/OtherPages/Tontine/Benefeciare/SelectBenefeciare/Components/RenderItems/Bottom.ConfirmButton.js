import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HView from "../../../../../../../../components/views/HView/HView";
import { COLORS } from "../../../../../../../../theme";
import { Txt } from "../../../../../../../../components/utils";
import Space from "../../../../../../../../components/Space";
import { PrimaryButtonLinear } from "../../../../../../../../components/Buttons";
import { confirmBeneficiaries } from "../../../../../../../../redux/Features/Tontine/ManageBenefeciare/confirmBeneficiaries/slice";
import { useDispatch } from "react-redux";
import Line from "../../../../../../../../components/views/line";
import Loader from "./Loader";

const BottomConfirmButton = ({
  ARR,
  laoder,
  GlobalBen,
  GlobalBen3,
  projectId,
  GlobalBen2,
  loading,
  navigation,
  index,
  type,
  token,
  title,
  routeData,
  showPopUp
}) => {
  const dispatch = useDispatch();

  return (
    <>
      {ARR?.length ? (
        !laoder ? (
          <View style={styles.containerButton}>
            <HView spaceBetween style={styles.rowButtons}>
              <View>
                {ARR?.length ? (
                  <Txt fontSize={17} 
                  //fontFamily={"Roboto-Bold"}
                  >
                    {ARR?.length} people selected
                  </Txt>
                ) : null}

                <Space space={8} />
                <TouchableOpacity
                  onPress={() => {
                     navigation.navigate("ListBéneféciare", {
                       GlobalBen,
                       GlobalBen2,
                       GlobalBen3,
                       ARR,
                       ind: index,
                       projectId,
                       type,
                       title,
                       routeData,
                     });
                    // console.log('projectId', projectId)
                  }}
                  disabled={ARR.length !== 0 ? false : true}
                >
                  <Txt fontSize={14} color={COLORS.orangeYellow}>
                    View the selected list
                  </Txt>
                </TouchableOpacity>
              </View>
              <PrimaryButtonLinear
                loading={loading}
                disabled={true}
                width={"40%"}
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
                  showPopUp()
                  // console.log("obj", obj);
                  // dispatch(createParticipants(obj));
                }}
              >
                confirm
              </PrimaryButtonLinear>
            </HView>
            <Space space={25} />
            <Line color={COLORS.black} />
          </View>
        ) : (
          <Loader />
        )
      ) : null}
    </>
  );
};

export default BottomConfirmButton;

const styles = StyleSheet.create({
  containerButton: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 110,
  },
  rowButtons: {
    paddingTop: 15,
  },
});
