import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ViewT1 from "../../../../../../../../components/views/CardViewType1";
import { Txt } from "../../../../../../components/utils";
import { PrimaryButtonLinear } from "../../../../../../../../components/Buttons";
import Space from "../../../../../../../../components/Space";

const PrepaidCard = ({ title }) => {
  return (
    <ViewT1 padding={20} width="90%" style={{ paddingVertical: 10 }}>
      <View style={styles.label}>
        <Txt>{title}</Txt>
      </View>
      <Space />

      <PrimaryButtonLinear
        disabled={false}
        // onPress={handlePresentModalPress4}
      >
        Top up with prepaid card
      </PrimaryButtonLinear>
    </ViewT1>
  );
};

export default PrepaidCard;

const styles = StyleSheet.create({
  label: {
    marginVertical: 10,
  },
});
