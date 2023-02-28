import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HView from "../../../../../../../components/views/HView/HView";
import { Txt } from "../../../../../../../components/utils";
import { COLORS } from "../../../../../../../theme";

const data = [
  {
    id: 1,
    label: "Cashlib",
    value: "2nd FX",
    price: "12,089.50",
    currency: "USD",
  },
  {
    id: 0,
    label: "Paysafecard",
    value: "Main Account",
    price: "32,589.50",
    currency: "euro",
  },
  {
    id: 0,
    label: "Neosurf",
    value: "Main Account",
    price: "32,589.50",
    currency: "euro",
  },
];

const Form1 = ({ ShowCodeForm }) => {



  


  return data.map((i, ind) => {
    return (
      <>
        <TouchableOpacity
          key={ind}
          onPress={() => {
            // console.log("item", i);
            // ChangeAccount(i)
            ShowCodeForm();
          }}
        >
          <HView spaceBetween style={styles.item}>
            <View>
              <HView>
                <View style={styles.Point}></View>
                <Txt fontSize={17} color={COLORS.darkBlueGrey}>
                  {i.label}
                </Txt>
              </HView>
            </View>
          </HView>
        </TouchableOpacity>


      </>
    );
  });
};

export default Form1;


const styles = StyleSheet.create({
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.darkBlueGrey,
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
  },
});
