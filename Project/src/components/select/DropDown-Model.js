import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Head, Txt } from "../utils";
import HView from "../views/HView/HView";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";

import { COLORS, SIZES } from "../../theme";
import HalfModal from "../Models/M-1/Model-1";
import SelectModal from "./ModalSelect";
import Line from "../views/line";

const DropDownModel = ({
  data = [],
  value = {},
  onSelect = () => {},
  background,
  setFieldValue,
  name,
  errors,
  label,
  placeholder,
}) => {
  const [ShowOption, setShowOption] = useState(false);
  const onSelectItem = (val) => {
    setShowOption(false);
    onSelect(val);
    //   setFieldValue(name, JSON.stringify(val));
  };

  return (
    <HView>
      {label ? (
        <Txt style={styles.title} fontSize={17} color={COLORS.black}>
          {label}{" "}
        </Txt>
      ) : null}
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.DropDownStyle]}
          activeOpacity={0.8}
          onPress={() => {
            setShowOption(!ShowOption);
          }}
        >
          <HView spaceBetween>
            {!!value ? (
              <Txt
                Bold="700"
                style={{
                  color: COLORS.orangeYellow,
                }}
              >
                {value?.label}{" "}
              </Txt>
            ) : (
              <Txt color={COLORS.orangeYellow} Bold="700" fontSize={16}>
                {placeholder}{" "}
              </Txt>
            )}

            <AntDesign
              name="caretdown"
              size={16}
              style={{
                transform: [{ rotate: ShowOption ? "180deg" : "0deg" }],
                color: COLORS.orangeYellow,
              }}
            />
          </HView>
        </TouchableOpacity>

        {errors ? <Text style={styles.error}>{errors} </Text> : null}
        <SelectModal
          visible={ShowOption}
          onDissmis={() => {
            setShowOption(false);
          }}
        >
          <View style={styles.containerItems}>
            <View style={styles.BoxTitle}>
              <Txt>Select Currency </Txt>
            </View>

            <View style={styles.mapBox}>
              {data.map((val, i) => {
                return (
                  <View key={i} style={styles.Item}>
                    <TouchableOpacity
                      onPress={() => {
                        onSelectItem(val);
                      }}
                      style={styles.touch}
                    >
                      <View style={styles.BoxModal}>
                        <Txt
                          style={{
                            color: COLORS.grayIcon,
                            paddingLeft: 10,
                            fontSize: 14,
                          }}
                        >
                          {val.label}
                        </Txt>
                        {data.length !== i + 1 && (
                          <Line height={1} color={COLORS.lightBlueGrey} width={"77%"} />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </SelectModal>
      </View>
    </HView>
  );
};

export default DropDownModel;

const styles = StyleSheet.create({
  containerItems: {
    flex: 1,
    padding: 20,
  },
  item: {
    marginVertical: 5,
  },
  touch: {},
  BoxModal: {},
  BoxTitle: {
    alignSelf: "center",
    marginBottom: 10,
  },
  mapBox: {
    paddingTop: 10,
  },
  Item: {
    height: 30,
    // borderBottomColor:"#000",
    // borderTopColor:"#000",
    // borderBottomWidth:1,
    // borderTopWidth:1,  marginVertical:1 ,
    justifyContent: "center",
  },
});
