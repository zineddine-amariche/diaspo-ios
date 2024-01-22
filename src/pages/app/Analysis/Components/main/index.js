import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React  from "react";
import { Txt } from "../../../../../components/utils";

import newTransaction from "../../../../../Assets/Img/newTransaction.png";
import ctangleCustom from "../../../../../Assets/Img/Pic_cashin.png";

import transfer from "../../../../../Assets/Img/transfer.png";
import cashOut from "../../../../../Assets/Img/cashOut.png";
import { COLORS } from "../../../../../theme";
import Tontine from '../../../../../Assets/Img/Tontine.png';

const MainTypes = ({ navigation,onPress }) => {


  const navtopage = (path) => {
    navigation.navigate(path);
  };
  return (
    <View style={styles.Types}>
      <TouchableOpacity
        onPress={() => {
          navtopage("Transfer");
        }}
        style={styles.Box}
      >
        <Image source={transfer} />
        <Txt color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
          Transfer
        </Txt>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navtopage("Tontine");
        }}
        style={styles.Box}

      >
        <Image source={Tontine} />
        <Txt color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
         Tontines 
        </Txt>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => {
          navtopage("Request");
        }}
        style={styles.Box}

      >
        <Image source={newTransaction} />
        <Txt color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
          Request
        </Txt>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => {
          // navtopage("TopUp")
          onPress()
        }}
        style={styles.Box}

      >
        <Image source={ctangleCustom} />
        <Txt color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
        Cash In
        </Txt>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navtopage("CashOut");
        }}
        style={styles.Box}

      >
        <Image source={cashOut} />
        <Txt color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
          Cash Out
        </Txt>
      </TouchableOpacity>

    </View>
  );
};

export default MainTypes;

const styles = StyleSheet.create({
  Types: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-evenly",
    paddingHorizontal:5
  },
  Box:{
    overflow:"hidden",
    alignItems:"center",
  }
});
