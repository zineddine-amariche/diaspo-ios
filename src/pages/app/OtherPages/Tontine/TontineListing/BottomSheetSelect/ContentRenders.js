import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import HView from "../../../../../../components/views/HView/HView";
import { Head, Txt } from "../../../../../../components/utils";
import { COLORS } from "../../../../../../theme";
import Space from "../../../../../../components/Space";
import { WhiteButton } from "../../../../../../components/Buttons";
import { data } from "../Hooks/utils";
import { useDispatch } from "react-redux";
import { createSelectedTontine } from "../../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice";

const ContentRenders = ({ onPress, navigation, closeSelect }) => {
  const dispatch = useDispatch();
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
        }}
      >
        <Head style={styles.Head}>Select Account</Head>
        <ScrollView>
          {data.map((i, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => {
                  dispatch(createSelectedTontine(i.type));
                  closeSelect();
                  navigation.navigate("CreateTontine", { ind, type: i.type });
                  // console.log(i.type) 
                }}
                disabled={i.disable ? true : false}
              >
                <View
                  spaceBetween
                  style={[
                    styles.item,
                    {
                      backgroundColor: i.disable
                        ? COLORS.silverTwo
                        : COLORS.paleGrey,
                    },
                  ]}
                >
                  <HView>
                    <Txt
                      fontSize={17}
                      color={i.disable ? COLORS.grayIcon : COLORS.blueGreen}
                    >
                      {i.name}
                    </Txt>
                  </HView>
                  <HView>
                    <Txt color={COLORS.coolGrey} style={{ fontSize: 12 }}>
                      {i.discription}
                    </Txt>
                  </HView>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <WhiteButton onPress={closeSelect}>cancel</WhiteButton>
        <Space space={90} />
      </View>
    </>
  );
};

export default ContentRenders;

const styles = StyleSheet.create({
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.orangeYellow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 3,
  },

  Head: {
    alignSelf: "center",
    paddingVertical: 10,
  },
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.orangeYellow,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginTop: 3,
  },
  item: {
    backgroundColor: COLORS.paleGreyTwo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    height: 80,
    justifyContent: "center",
  },
});
