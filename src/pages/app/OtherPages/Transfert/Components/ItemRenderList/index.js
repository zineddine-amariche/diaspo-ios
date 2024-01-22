import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS } from "../../../../../../theme";
import HView from "../../../../../../components/views/HView/HView";
import { Txt } from "../../../../../../components/utils";

const RenderContent = () => (
  <View
    style={{
      backgroundColor: COLORS.white,
      padding: 16,
      height: 450,
    }}
  >
    <TouchableOpacity>
      <HView spaceBetween style={styles.item}>
        <View>
          <HView>
            <View style={styles.Point}></View>
            <Txt fontSize={17} color={COLORS.orangeYellow}>
              Main Account
            </Txt>
          </HView>
          <HView>
            <Txt
              color={COLORS.blueGreen}
              style={{ lineHeight: 40, fontSize: 32 }}
            >
              32,589.50{" "}
            </Txt>
            <Txt
              color={COLORS.greyblue}
              style={{ lineHeight: 24, fontSize: 16 }}
            >
              euro
            </Txt>
          </HView>
        </View>
      </HView>
    </TouchableOpacity>
    <HView spaceBetween style={styles.item}>
      <View>
        <HView>
          <View style={styles.Point}></View>
          <Txt fontSize={17} color={COLORS.orangeYellow}>
            Main Account
          </Txt>
        </HView>
        <HView>
          <Txt
            color={COLORS.blueGreen}
            style={{ lineHeight: 40, fontSize: 32 }}
          >
            32,589.50{" "}
          </Txt>
          <Txt color={COLORS.greyblue} style={{ lineHeight: 24, fontSize: 16 }}>
            euro
          </Txt>
        </HView>
      </View>
    </HView>
    <HView spaceBetween style={styles.item}>
      <View>
        <HView>
          <View style={styles.Point}></View>
          <Txt fontSize={17} color={COLORS.orangeYellow}>
            Main Account
          </Txt>
        </HView>
        <HView>
          <Txt
            color={COLORS.blueGreen}
            style={{ lineHeight: 40, fontSize: 32 }}
          >
            32,589.50{" "}
          </Txt>
          <Txt color={COLORS.greyblue} style={{ lineHeight: 24, fontSize: 16 }}>
            euro
          </Txt>
        </HView>
      </View>
    </HView>
  </View>
);

export default RenderContent;

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
  },
});
