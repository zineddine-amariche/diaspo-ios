import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../../../../../theme";
import HView from "../../../../../../components/views/HView/HView";
import { Head, Txt } from "../../../../../../components/utils";
import { WhiteButton } from "../../../../../../components/Buttons";
import Space from "../../../../../../components/Space";

const data = [
  {
    id: 0,
    label: "DIASPO ACCOUNT",
    value: "Main Account",
    price: "32,589.50",
    currency: "euro",
  },
  {
    id: 1,
    label: "TONTINE ACCOUNT",
    value: "2nd FX",
    price: "12,089.50",
    currency: "USD",
  },

];

const RenderAccounts = ({onPress,ChangeAccount}) => {
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
            <TouchableOpacity key={ind} onPress={()=>{
              // console.log('item' , i) 
              ChangeAccount(i)
            }}>
              <HView spaceBetween style={styles.item}>
                <View>
                  <HView>
                    <View style={styles.Point}></View>
                    <Txt fontSize={17} color={COLORS.orangeYellow}>
                      {i.label}
                    </Txt>
                  </HView>
                  <HView>
                    <Txt
                      color={COLORS.blueGreen}
                      style={{ lineHeight: 40, fontSize: 32 }}
                    >
                      {i.price}{" "}
                    </Txt>
                    <Txt
                      color={COLORS.greyblue}
                      style={{ lineHeight: 24, fontSize: 16 }}
                    >
                      {i.currency}
                    </Txt>
                  </HView>
                </View>
              </HView>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <WhiteButton onPress={onPress}>cancel</WhiteButton>
      <Space space={90} />
    </View>
  </>
  );
};

export default RenderAccounts;

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
  item: {
    backgroundColor: COLORS.paleGreyTwo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    height: 80,
  },
  Head: {
    alignSelf: "center",
    paddingVertical: 10,
  },
});
