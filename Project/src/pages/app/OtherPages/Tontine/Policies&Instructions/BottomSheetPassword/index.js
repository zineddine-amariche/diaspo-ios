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
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import CustomBackdrop from "./customBackdrop";
import PasswordRender from "../../Transfers/Components/RenderContents/PasswordRender";
import { COLORS, SIZES } from "../../../../../theme";

const Bottom4 = ({ bottomSheetModalRef,  onSuccess,DeleteSelectMethod }) => {
  let heightcuts = SIZES.height / 10;
  // console.log('heightcuts', heightcuts)
  const snapPoints = useMemo(() => [`${heightcuts}%`]);
  const handleSheetChanges = useCallback((index) => {
    // console.log("handleSheetChangesss", index);
  }, []);
  const handleClosePress = () => {
    bottomSheetModalRef.current.close();
    // DeleteSelectMethod()
  };

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
          <PasswordRender onPress={handleClosePress} DeleteSelectMethod={DeleteSelectMethod} onSuccess={onSuccess} />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Bottom4;

const styles = StyleSheet.create({});
