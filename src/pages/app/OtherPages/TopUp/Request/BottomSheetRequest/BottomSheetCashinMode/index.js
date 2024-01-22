import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
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

const BottomSheetCashinMode = ({
  bottomSheetModalRef,
  onPress2,
  navigation,
  closeBottomUp2,
  closeBottomUp1,
  closeSelect,
  sendRequest
}) => {
  const snapPoints = useMemo(() => ["45%"]);
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
            closeSelect={closeSelect}
            sendRequest={sendRequest}

          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
    // </BottomSheetModalProvider>
  );
};

export default BottomSheetCashinMode;

const styles = StyleSheet.create({});
