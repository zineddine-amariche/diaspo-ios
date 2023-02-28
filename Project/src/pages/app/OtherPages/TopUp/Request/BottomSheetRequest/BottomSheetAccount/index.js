import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import CustomBackdrop from "../customBackdrop";
import RenderAccounts from "../../Components/RenderContents/RenderAccounts";
import { COLORS } from "../../../../../../../theme";

const Bottom1 = ({ bottomSheetModalRef, closeDrawer, closeAccount,ChangeAccount }) => {
  const snapPoints = useMemo(() => [ "60%"]);
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
    closeDrawer();
    closeAccount();
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.containerBottom}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={CustomBackdrop}
          onDismiss={handleClosePress}
          handleIndicatorStyle={{backgroundColor:COLORS.blueGreen, width:50 , height:5}}
        >
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.contentContainer}>
            <RenderAccounts ChangeAccount={ChangeAccount} onPress={handleClosePress} />
          </View>
        </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Bottom1;

const styles = StyleSheet.create({});
