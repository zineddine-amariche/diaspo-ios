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
import { COLORS } from "../../../../../../../theme";
import RenderAppUsers from "../../Components/RenderContents/RenderAppUsers";

const Bottom3 = ({ bottomSheetModalRef, closeDrawer,ContactsPhone }) => {
  const snapPoints = useMemo(() => ["95%"]);
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
    closeDrawer();
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
          handleIndicatorStyle={{
            backgroundColor: COLORS.blueGreen,
            width: 50,
            height: 5,
          }}
        >
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            <RenderAppUsers
              onPress={handleClosePress}
              ContactsPhone={ContactsPhone}
              // SelectContactToUse={SelectContactToUse}
              // ContactToUse={ContactToUse}
            />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Bottom3;

const styles = StyleSheet.create({});
