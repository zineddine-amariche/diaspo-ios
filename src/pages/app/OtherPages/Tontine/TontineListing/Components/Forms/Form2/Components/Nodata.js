import { StyleSheet, Text, View } from "react-native";
import { Txt } from "../../../../../../../../../components/utils";
import ViewT1 from "../../../../../../../../../components/views/CardViewType1";
import { COLORS } from "../../../../../../../../../theme";
import React, { useEffect } from "react";

const Nodata = () => {
  return (
    <View style={{ padding: 20 }}>
      <ViewT1>
        <Txt color={COLORS.darkBlueGrey} fontSize={14}>
          There are no <Txt color={COLORS.coral}> Cancelled </Txt> tontines
          .
        </Txt>
      </ViewT1>
    </View>
  );
};

export default Nodata;

const styles = StyleSheet.create({});
