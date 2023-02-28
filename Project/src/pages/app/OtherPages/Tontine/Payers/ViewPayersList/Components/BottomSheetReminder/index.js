import { StyleSheet, View } from "react-native";
import React from "react";
import { useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import CustomBackdrop from "./CustomBackdrop";
import { COLORS } from "../../../../../../../../theme";
import ContentRenders from "./ContentRenders";

const BottomSheetReminder = ({
  bottomSheetModalRef,
  Open,
  navigation,
  close,
  sendReminder,
  startWithparticipants,
  cancelTontin,
}) => {
  const snapPoints = useMemo(() => ["35%"]);
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
          <ContentRenders
            Open={Open}
            close={close}
            navigation={navigation}
            sendReminder={sendReminder}
            startWithparticipants={startWithparticipants}
            cancelTontin={cancelTontin}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
    // </BottomSheetModalProvider>
  );
};

export default BottomSheetReminder;

const styles = StyleSheet.create({});
