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
import { COLORS } from "../../../../../theme";
import ContentRenders from "./ContentRenders";

const BottomSheetTopUpAccount = ({
  bottomSheetModalRef,
  bottomSheetModalRef2,
  closeBottomUp1,
  closeBottomUp2,
  navigation,
  onPress
}) => {
  const snapPoints = useMemo(() => ["65%"]);
  const handleSheetChanges = useCallback((index) => {}, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
  };
  const handleAll = () => {
    bottomSheetModalRef.current.close();
    // setTimeout(() => {
    //   bottomSheetModalRef2.current.close();
    // }, 300);
  };
  return (
    //  <BottomSheetModalProvider>
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
            navigation={navigation}
            closeAll={handleClosePress}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
    //  </BottomSheetModalProvider>
  );
};

export default BottomSheetTopUpAccount;

const styles = StyleSheet.create({});
