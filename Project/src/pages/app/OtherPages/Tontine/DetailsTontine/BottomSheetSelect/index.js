import { StyleSheet, View } from "react-native";
import React  from "react";
import { useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import CustomBackdrop from "./CustomBackdrop";
import { COLORS } from "../../../../../../theme";
import ContentRenders from "./ContentRenders";

const BottomSheetSelect = ({
  bottomSheetModalRef,
  onPress2,
  navigation,
  closeBottomUp2,
  closeBottomUp1,
  ChangeAccount,
  closeSelect,
  projectId,
  tontineProjectInfo
}) => {
  const snapPoints = useMemo(() => ["55%"]);
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
    <View >
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
        <BottomSheetScrollView showsVerticalScrollIndicator={false} style={styles.containerBottom}>

          <ContentRenders
            onPress={handleClosePress}
            navigation={navigation}
            closeBottomUp2={closeBottomUp2}
            closeBottomUp1={closeBottomUp1}
            onPress2={onPress2}
            ChangeAccount={ChangeAccount}
            closeSelect={closeSelect}
            projectId={projectId}
            tontineProjectInfo={tontineProjectInfo}

          />

        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
    // </BottomSheetModalProvider>
  );
};

export default BottomSheetSelect;

const styles = StyleSheet.create({
 
});
