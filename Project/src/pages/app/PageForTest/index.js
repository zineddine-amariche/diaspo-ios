import { ImageBackground } from "react-native";
import { SafeAreaView, StatusBar } from "react-native";
import SecondaryHeader from "../../../components/Headers/root/SecondaryHeader";
import Space from "../../../components/Space";
import { COLORS, SIZES } from "../../../theme";
import ImgBack from "../../../Assets/Img/HomeBack.png";
import { PrimaryButtonLinear } from "../../../components/Buttons";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { LogBox } from "react-native";

import {
  Animated,
  Image,
  StyleSheet,
  Text,
  Platform,
  Easing,
  View,
  Dimensions,
} from "react-native";
import SortableList from "react-native-sortable-list";
import { Txt } from "../../../components/utils";
import Top from "../../../Assets/Img/Top.png";
import Bottom from "../../../Assets/Img/Bottom.png";
import thumbnailPath from "../../../Assets/Img/ContactsUser.png";
import HView from "../../../components/views/HView/HView";
const window = Dimensions.get("window");

const data = {
  0: {
    image: "https://placekitten.com/200/240",
    text: "Chloe",
  },
  1: {
    image: "https://placekitten.com/200/201",
    text: "Jasper",
  },
  2: {
    image: "https://placekitten.com/200/202",
    text: "Pepper",
  },
  3: {
    image: "https://placekitten.com/200/203",
    text: "Oscar",
  },
  4: {
    image: "https://placekitten.com/200/204",
    text: "Dusty",
  },
  5: {
    image: "https://placekitten.com/200/205",
    text: "Spooky",
  },
  6: {
    image: "https://placekitten.com/200/210",
    text: "Kiki",
  },
  7: {
    image: "https://placekitten.com/200/215",
    text: "Smokey",
  },
  8: {
    image: "https://placekitten.com/200/220",
    text: "Gizmo",
  },
  9: {
    image: "https://placekitten.com/220/239",
    text: "Kitty",
  },
};

function Row(props) {
  const { active, data, index } = props;

  const activeAnim = useRef(new Animated.Value(0));
  const style = useMemo(
    () => ({
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          shadowRadius: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          //   elevation: activeAnim.current.interpolate({
          //     inputRange: [0, 1],
          //     outputRange: [2, 6],
          //   }),
        },
      }),
    }),
    []
  );
  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bounce,
      toValue: Number(active),
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.row, style]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            height: 30,
            width: 30,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.paleGrey,
            marginRight: 10,
          }}
        >
          <Txt>{index}</Txt>
        </View>
        <View>
          <HView>
            <Image
              source={thumbnailPath}
              style={styles.Img}
              resizeMode="contain"
            />
            <View>
              <Txt style={styles.text}>
                {data.text} {data.text}{" "}
              </Txt>
              <Txt style={styles.soustext}>+44 7538 110953</Txt>
            </View>
          </HView>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Image source={Top} style={{ marginRight: 7 }} resizeMode="contain" />
        <Image
          source={Bottom}
          style={{ marginRight: 5 }}
          resizeMode="contain"
        />
      </View>
      {/* <Line height={1} color={COLORS.silverTwo} width={"100%"} /> */}
    </Animated.View>
  );
}

const PageForTest = ({ navigation }) => {
  const renderRow = useCallback(({ data, active, index }) => {
    return <Row data={data} index={index} active={active} />;
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);

  const onChangeOrder = (data, nextOrder) => {
    console.log("next order - ", nextOrder);
    console.log("data - ", data);
  };

  //   const  onReleaseRow = (key, currentOrder) => {
  //     console.log('current order - ',currentOrder)
  //     }

 

  const chagne = (arr, from, to) => {
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
  };
  return (
    <SafeAreaView style={styles.container1}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />

      <SecondaryHeader
        goBack={() => {
          navigation.goBack();
        }}
        title={"Test Page"}
        Cancel="Return"
      />

      <Space space={20} />
      <Txt style={{ textAlign: "center", paddingBottom: 10 }}>
        Hold, drag and drop to reorder beneficiaries
      </Txt>

      <View style={styles.container}>
        <View style={{ backgroundColor: COLORS.paleGrey, alignSelf: "center" }}>
          <Space></Space>
          <SortableList
            style={styles.list}
            contentContainerStyle={styles.contentContainer}
            data={data}
            renderRow={renderRow}
            onChangeOrder={(nextOrder) => {
              onChangeOrder(data, nextOrder);
              // let arr = chagne(nextOrder, 2, 3);
              // console.log(arr)
            }}
            onReleaseRow={(key, data, ey) => {
              // onRelease(key,data,ey);
            }}
          />
          <Space></Space>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PageForTest;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: COLORS.paleGrey,
    flex: 1,
    alignItems: "center",
  },
  soustext: {
    fontSize: 12,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    borderBottomEndRadius: 15,
    overflow: "hidden",
    borderBottomStartRadius: 15,
    height: 110,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: "#999999",
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },
      android: {
        paddingHorizontal: 0,
      },
    }),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    height: 80,
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        width: window.width - 10 * 2,
        shadowColor: "rgba(0,0,0,0.2)",
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },
      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
    marginRight: 6,
  },
  text: {
    fontSize: 17,
    color: "#222222",
  },
});
