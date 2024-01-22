import React, { useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { StyleSheet } from "react-native";
import { Txt } from "../../components/utils";
import { useRef } from "react";
import { countries } from "../../services/countries";

const SelectBottomSheet = () => {
  let ActionSheets = useRef();

  const showActionSheet = () => {
    ActionSheets.current.show();
  };

  let ARR = [];

  countries.map((I) => {
    ARR.push(I.countryName);
  });
  ARR.push("CANCEL");

  const styless = {
    titleBox: {
      background: "pink",
    },
    titleText: {
      fontSize: 16,
      color: "#000",
    },
  };
  const [Region, setRegion] = useState("");

  const handlePress = (buttonIndex) => {
    setRegion({
      selected: buttonIndex,
      Region: ARR[buttonIndex],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={showActionSheet}>
        <Txt> {Region ? Region?.Region : "Discount"}</Txt>
      </TouchableHighlight>
      <ActionSheet
        ref={ActionSheets}
        title={
          <Text style={{ color: "#000", fontSize: 18, fontWeight: "700" }}>
            Select your country
          </Text>
        }
        options={ARR}
        cancelButtonIndex={ARR.length - 1}
        destructiveButtonIndex={ARR.length - 1}
        // onPress={(index) => {
        //  console.log(index)
        // }}
        useNativeDriver={true}
        styles={styless}
        tintColor={"#000"}
        selectedValue={Region}
        value={Region}
        onPress={handlePress}
      />
    </View>
  );
};

export default SelectBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 18,
    alignItems: "center",
    justifyContent: "center",
  },
});
