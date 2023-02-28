import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import CustomBackdrop from "./customBackdrop";
// import PasswordRender from "../../Transfers/Components/RenderContents/PasswordRender";
import { COLORS, SIZES } from "../../../../../../theme";
import RenderView from "./RenderView";

const BottomInfo = ({ bottomSheetModalRef,  onSuccess,DeleteSelectMethod,closeModal }) => {
  let heightcuts = SIZES.height / 15;
  // console.log('heightcuts', heightcuts)
  const snapPoints = useMemo(() => [`${heightcuts}%`]);
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChangesss", index);
  }, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
    // DeleteSelectMethod()
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    // setIsOpen(true);
  }, []);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        handleClosePress();
        // DeleteSelectMethod()
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isKeyboardVisible]);

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

          <RenderView onPress={handleClosePress} DeleteSelectMethod={DeleteSelectMethod} onSuccess={onSuccess} closeModal={closeModal}  />
        
        </BottomSheetScrollView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default BottomInfo;

const styles = StyleSheet.create({});
