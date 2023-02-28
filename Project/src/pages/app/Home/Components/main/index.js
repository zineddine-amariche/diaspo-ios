import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React  from "react";
import { Txt } from "../../../../../components/utils";

import ctangleCustom from "../../../../../Assets/Img/Pic_cashin.png";

import transfer from "../../../../../Assets/Img/transfer.png";
import cashOut from "../../../../../Assets/Img/cashOut.png";
import { COLORS } from "../../../../../theme";
import Tontine from '../../../../../Assets/Img/Tontine3.png';
import { useTranslation } from "react-i18next";

const MainTypes = ({ navigation,onPress }) => {

  const { t, i18n } = useTranslation( );

  const navtopage = (path) => {
    navigation.navigate(path);
  };
  return (
    <View style={styles.Types}>


      <TouchableOpacity
        onPress={() => {
          navtopage("Tontine");
        }}
        style={styles.Box}

      >
        <View style={{backgroundColor:'#FFF', borderRadius:9}}>

        <Image source={Tontine} style={{height:56,width:56}}/>
        </View>
        <Txt fontSize={14}  color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
         {t("Home.main_account_box.title1")}
        </Txt>
      </TouchableOpacity>


      <TouchableOpacity
        onPress={() => {
          // navtopage("TopUp")
          onPress()
        }}
        style={styles.Box}

      >
        <Image source={ctangleCustom} style={{height:56,width:56}} />
        <Txt fontSize={14} color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
        {t("Home.main_account_box.title2")}

        </Txt>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navtopage("CashOut");
        }}
        style={styles.Box}

      >
        <Image source={cashOut} style={{height:56,width:56}} />
        <Txt fontSize={14}  color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
        {t("Home.main_account_box.title3")}

        </Txt>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navtopage("Transfer");
          
        }}
        style={styles.Box}
      >
        <Image source={transfer} style={{height:56,width:56}} />
        <Txt fontSize={14}  color={COLORS.lightBlueGrey} style={{ paddingTop: 10 }}>
        {t("Home.main_account_box.title4")}

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
