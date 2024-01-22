import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../../../../../theme';

import { ActivityIndicator } from "react-native-paper";

const Loader = () => {
    return (
      <View
        style={{
          height: 110,
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:COLORS.white
        }}
      >
        <ActivityIndicator color={COLORS.blueGreen} size="small" />
      </View>
    );
  };

export default Loader

const styles = StyleSheet.create({})