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

const BottomSheetKyc= ({
  bottomSheetModalRef,
  onPress2,
  navigation,
  closeBottomUp2,
  close
}) => {
  const snapPoints = useMemo(() => ["95%"]);
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
    // closeDrawer();
    // closeAccount();
  };

  return (
    <BottomSheetModalProvider>
    <View style={styles.containerBottom}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={()=>{
          return
        }}
        onDismiss={()=>{
          return
        }}
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
            close={close}
            onPress2={onPress2}

          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
   </BottomSheetModalProvider>
  );
};

export default BottomSheetKyc;

const styles = StyleSheet.create({});
