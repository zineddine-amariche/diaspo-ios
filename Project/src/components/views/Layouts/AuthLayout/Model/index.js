import React, { useEffect, useState } from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
} from "react-native";


import HalfModal from "../../../../Models/M-1/Model-1";

const CreatedSuccess = ({ Visible, onDissmis, children ,padding }) => {
  return (
    <HalfModal padding={padding} transparent visible={Visible} onDissmis={onDissmis}>
      <>{children}</>
    </HalfModal>
  );
};

const styles = StyleSheet.create({
  ModelContainer: {},
});

export default CreatedSuccess;
