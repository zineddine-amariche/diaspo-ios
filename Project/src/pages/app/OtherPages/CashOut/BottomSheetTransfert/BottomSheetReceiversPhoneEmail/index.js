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
import RenderReceivers from "../../Components/RenderContents/RenderReceivers";
import { COLORS } from "../../../../../../theme";
import { useState } from "react";

const Bottom2 = ({ bottomSheetModalRef, closeDrawer, ContactsPhone }) => {
  const snapPoints = useMemo(() => ["95%"]);
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
    closeDrawer();
  };

  const [ContactToUse, setContactToUse] = useState(0);

  const SelectContactToUse = (Item) => {
    setContactToUse(Item);
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
            backgroundColor: COLORS.greyblue,
            width: 50,
            height: 5,
          }}
        >
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            <RenderReceivers
              ContactsPhone={ContactsPhone}
              onPress={handleClosePress}
              SelectContactToUse={SelectContactToUse}
              ContactToUse={ContactToUse}
            />
          </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Bottom2;

const styles = StyleSheet.create({
  containerBottom:{
    backgroundColor:COLORS.paleGrey
  }
});
