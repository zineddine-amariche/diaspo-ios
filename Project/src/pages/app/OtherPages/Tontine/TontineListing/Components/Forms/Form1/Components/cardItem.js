import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import ViewT1 from "../../../../../../../../../components/views/CardViewType1";
import { Txt } from "../../../../../../../../../components/utils";
import { COLORS } from "../../../../../../../../../theme";
import HView from "../../../../../../../../../components/views/HView/HView";

import icon24CustomerDefault from "../../../../../../../../../Assets/Img/icon24CustomerDefault.png";
import icon16CalendarDefault from "../../../../../../../../../Assets/Img/icon16CalendarDefault.png";
import Space from "../../../../../../../../../components/Space";
import { useDispatch, useSelector } from "react-redux";
import { getTontinesProjectInfo } from "../../../../../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice";
import moment from "moment";
import { Text } from "react-native";
 
const RenderTontine = ({ item, navigation }) => {
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  const dispatch = useDispatch();
  let object = {
    projectId: item.projectId,
    token: user.AccessToken,
  };

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 20,
        justifyContent: "space-between",
        elevation: 2,
        backgroundColor: "#FFF",
        borderRadius: 8,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          dispatch(getTontinesProjectInfo(object));
          navigation.navigate("InfoScreenTontine", {
            routeData: item,
            consult: true,
          });
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
              <Text style={{fontSize:8 ,position:'absolute' , right:0  ,top:-10}}>  { item?.type === 'TONTINE_ORDINARY_TONTINE' ? 'ORDINARY' : 'CUSTOM'}</Text>
          <View style={{ width: "55%" }}>
            <View style={{   }}>
              <Txt numberOfLines={1} color={COLORS.darkBlueGrey}>
                {item.name} 
              </Txt>
            </View>
            <Space space={10} />
            <HView>
              <Image source={icon24CustomerDefault} style={styles.img} />
              <Txt fontSize={12} color={COLORS.coolGrey}>
                {item?.listOfParticipants?.length} participants
              </Txt>
            </HView>
            <Space space={3} />
            <HView>
              <Image source={icon16CalendarDefault} style={styles.img} />
              <Txt fontSize={12} color={COLORS.coolGrey}>
                {/* {moment().startOf(item?.createdAt).fromNow()} */}

                {moment(item?.createdAt).format('lll')}
              </Txt>
            </HView>
          </View>
          <View style={styles.etat}>
            <Txt color={COLORS.orangeYellow}>{item.status=='IN PROGRESS'?"PENDING":''}</Txt>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
