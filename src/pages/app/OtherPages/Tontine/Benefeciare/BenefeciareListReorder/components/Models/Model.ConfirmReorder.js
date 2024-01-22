import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CreatedSuccess from "../../../../../../../../components/views/Layouts/AuthLayout/Model";
import HView from "../../../../../../../../components/views/HView/HView";
import { Head } from "../../../../../../../../components/utils";
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from "../../../../../../../../components/Buttons";
import { useSelector } from "react-redux";

const ModelConfirmReorder = ({
  navigation,
  success2,
  onDissmis2,
  pressNo,
  pressYes,
  routeData,projectId,
  confirmbtn
}) => {
  return (
    <CreatedSuccess Visible={success2} onDissmis={onDissmis2}>
      {BodyModelConfirmToReorder ? (
        <BodyModelConfirmToReorder
          onDissmis={onDissmis2}
          pressNo={pressNo}
          pressYes={pressYes}
          navigation={navigation}
          projectId={projectId}
          routeData={routeData}
          confirmbtn={confirmbtn}
        />
      ) : null}
    </CreatedSuccess>
  );
};

export default ModelConfirmReorder;

const BodyModelConfirmToReorder = ({
  navigation,
  onDissmis,
  pressNo,
  pressYes,
  routeData,projectId,
  confirmbtn
}) => {
  const {ListToReorder} = useSelector(state=>state.beneficaire)

  
  return (
    <>
      <Head
        //fontFamily={"Poppins-Bold"}
        style={{ padding: 20, textAlign: "center" }}
      >
        Do you want to confirm your Tontine?
      </Head>

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
            pressYes(navigation,projectId,routeData,confirmbtn);
          }}
        >
          yes
        </PrimaryButtonLinear>
      </HView>
    </>
  );
};

const styles = StyleSheet.create({});
