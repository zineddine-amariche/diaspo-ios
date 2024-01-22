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
import { Txt } from "../../../../../../components/utils";

const data = [
  {
    id: 0,
    label: "Main Account",
    value: "Main Account",
    price: "32,589.50",
    currency: "euro",
  },
  {
    id: 1,
    label: "2nd FX",
    value: "2nd FX",
    price: "12,089.50",
    currency: "USD",
  },
  {
    id: 2,
    label: "2rd FX",
    value: "2rd FX",
    price: "32,099.50",
    currency: "AUD",
  },
];

const RenderAccounts = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
          // height: SIZES.height / 4,
        }}
      >
        <ScrollView>
          {data.map((i, ind) => {
            return (
              <TouchableOpacity key={ind} >
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
});
