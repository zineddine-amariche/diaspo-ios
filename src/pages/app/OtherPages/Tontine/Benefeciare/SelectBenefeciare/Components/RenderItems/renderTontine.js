import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ViewT1 from "../../../../../../../../components/views/CardViewType1";
import { Txt } from "../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../theme";
import HView from "../../../../../../../../components/views/HView/HView";

import icon24CustomerDefault from "../../../../../../../../Assets/Img/icon24CustomerDefault.png";
import icon16CalendarDefault from "../../../../../../../../Assets/Img/icon16CalendarDefault.png";
import Space from "../../../../../../../../components/Space";

const RenderTontine = ({ item ,navigation}) => {

  return (
    <ViewT1>
      <TouchableOpacity activeOpacity={0.5}
      
      onPress={()=>{
        navigation.navigate('InfoScreenTontine' , {routeData :  item,isFirstTime:false})
      }}
      >
        <HView spaceBetween>
          <View>
            <Txt color={COLORS.darkBlueGrey}>{item.name}</Txt>
            <Space space={10} />
            <HView>
              <Image source={icon24CustomerDefault} style={styles.img} />
              <Txt fontSize={12} color={COLORS.coolGrey}>
                {item.participents}
              </Txt>
            </HView>
            <Space space={3} />
            <HView>
              <Image source={icon16CalendarDefault} style={styles.img} />
              <Txt fontSize={12} color={COLORS.coolGrey}>
                {item.months}
              </Txt>
            </HView>
          </View>
          <View style={styles.etat}>
            <Txt color={COLORS.orangeYellow}>{item.etat}</Txt>
          </View>
        </HView>
      </TouchableOpacity>
    </ViewT1>
  );
};

export default RenderTontine;

const styles = StyleSheet.create({
  img: {
    marginRight: 10,
  },
  etat: {
    backgroundColor: COLORS.offWhite,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 13,
  },
});
