import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { COLORS } from "../../../../../../theme";
import { Txt } from "../../../../../../components/utils";
import UseCheckBoxElements from "../../../../../../components/checkBox/useCheckBoxElements";
import { useState } from "react";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native";

const RenderListBank = ({
  item,
  index,
  isChecked,
  HandelChangeValue,
  setFieldValue,
}) => {
  const [check, setcheck] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        HandelChangeValue(index);
        setFieldValue('agency',toString(item) );
      }}
    >
      <View
        key={index}
        style={{
          backgroundColor: COLORS.paleGreyTwo,
          borderRadius: 4,
          marginVertical: 5,
          paddingVertical: 15,
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={item.img}
            style={{ width: 70, height: 30, marginRight: 13 }}
          />
          <View>
            <Txt style={{ marginBottom: 5 }}>{item.name}</Txt>
            <Txt color={COLORS.slateGrey} fontSize={12}>
              No :{" "}
              <Txt fontSize={12} color={COLORS.darkBlueGrey}>
                {item.no}
              </Txt>{" "}
            </Txt>
          </View>
        </View>
        <View style={{ backgroundColor: COLORS.paleGrey }}>
          {isChecked ? (
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: COLORS.blueGreen,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: COLORS.blueGreen,
                  width: 16,
                  height: 16,
                  borderRadius: 20,
                }}
              ></View>
            </View>
          ) : (
            <View
              style={{
                width: 25,
                height: 25,
                borderRadius: 20,
                borderWidth: 2,
                borderColor: COLORS.blueGreen,
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RenderListBank;

const styles = StyleSheet.create({});
