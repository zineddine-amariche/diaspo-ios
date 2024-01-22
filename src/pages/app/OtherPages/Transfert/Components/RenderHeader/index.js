import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const RenderHeader = ({ funHeader }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.panelHeader} onPress={funHeader}>
        <View style={styles.panelHandle} />
      </TouchableOpacity>
    </View>
  );
};

export default RenderHeader;

const styles = StyleSheet.create({});
