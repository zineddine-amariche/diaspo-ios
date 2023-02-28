import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Txt } from "../../../../../../components/utils";
import HView from "../../../../../../components/views/HView/HView";
import { COLORS } from "../../../../../../theme";
import { Image } from "react-native";

import imgs from "../../../../../../Assets/Img/default.png";
import Line from "../../../../../../components/views/line";

const RenderItemsWalletConnection = ({
  lenght,
  index,
  T1,
  T2,
  T3,
  Price,
  date,
  source,
  item,
  navigation,
}) => {
  return (
    <>
    <TouchableOpacity onPress={()=>{
      // console.log('item ', item)
      navigation.navigate(item.to)
    }}>

      <HView spaceBetween>
        <HView
          style={{
            paddingVertical: 10,
            borderRadius: 6,
            marginVertical: 5,
          }}
        >
          <Image source={source} style={{ marginRight: 20 }} />
          <View style={{}}>
            <Txt fontSize={14}
            // fontFamily={'Poppins-SemiBold'}
             color={COLORS.darkBlueGrey}>{T2}</Txt>
            <Txt fontSize={12} color={COLORS.coolGrey}>{date}</Txt>
          </View>
        </HView>
        <View>
          <Image source={imgs} />
        </View>
      </HView>
    </TouchableOpacity>
      {lenght - 1 !== index ? (
        <Line height={1} color={COLORS.silverTwo} width={"80%"} />
      ) : null}
    </>
  );
};

export default RenderItemsWalletConnection;

const styles = StyleSheet.create({});
