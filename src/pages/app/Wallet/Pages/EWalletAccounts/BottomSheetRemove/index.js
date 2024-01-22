import { StyleSheet, View } from "react-native";
import React from "react";
import { useMemo } from "react";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import CustomBackdrop from "./CustomBackdrop";
import { COLORS } from "../../../../../../theme";
import ContentRenders from "./ContentRenders";
import { useState } from "react";

const BottomSheetRemove = ({
  bottomSheetModalRef,
  onPress2,
  navigation,
  closeBottomUp2,
  closeBottomUp1,
  ShowPopup,
  disConnect
}) => {
  const snapPoints = useMemo(() => ["30%"]);
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
    // closeDrawer();
    // closeAccount();
  };
  return (
    // <BottomSheetModalProvider>
    <View style={styles.containerBottom}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={CustomBackdrop}
        onDismiss={handleClosePress}
        handleIndicatorStyle={{
          backgroundColor: COLORS.blueGreen,
          width: 50,
          height: 5,
        }}
      >
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <ContentRenders
            onPress={handleClosePress}
            navigation={navigation}
            closeBottomUp2={closeBottomUp2}
            closeBottomUp1={closeBottomUp1}
            onPress2={onPress2}
            ShowPopup={ShowPopup}
            disConnect={disConnect}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
    // </BottomSheetModalProvider>
  );
};

export default BottomSheetRemove;

const styles = StyleSheet.create({});
