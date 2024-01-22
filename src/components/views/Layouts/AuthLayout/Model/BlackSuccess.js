import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
} from "react-native";
import BlackModal from "../../../../Models/M-1/blackModal";

const BlackSuccess = ({ Visible, onDissmis, children ,padding }) => {
  return (
    <BlackModal padding={padding} transparent visible={Visible} onDissmis={onDissmis}>
      <>{children}</>
    </BlackModal>
  );
};

const styles = StyleSheet.create({
  ModelContainer: {},
});

export default BlackSuccess;
