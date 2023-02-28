import { StyleSheet, View } from "react-native";
import React from "react";
import { useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import CustomBackdrop from "./CustomBackdrop";
import { COLORS } from "../../../../../../../theme";
import ContentRenders from "./ContentRenders";

const BottomSheetReminder = ({
  bottomSheetModalRef,

  close,
  sendReminder,
}) => {
  const snapPoints = useMemo(() => ["45%"]);
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
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
          <ContentRenders close={close} sendReminder={sendReminder} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
    // </BottomSheetModalProvider>
  );
};

export default BottomSheetReminder;

const styles = StyleSheet.create({});
