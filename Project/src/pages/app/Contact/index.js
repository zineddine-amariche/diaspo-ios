import React, { useState } from "react";

import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
} from "react-native";

import { StatusBar } from "react-native";
import ImgBack from "../../../Assets/Img/HomeBack.png";
import { COLORS, SIZES } from "../../../theme";
import { Txt } from "../../../components/utils";
import SecondaryHeader from "../../../components/Headers/root/SecondaryHeader";
import Space from "../../../components/Space";
import HView from "../../../components/views/HView/HView";
import icon24MapPinLocation from "../../../Assets/Img/icon24MapPinLocation.png";
import icon24Time from "../../../Assets/Img/icon24Time.png";
import icon24CallPhone from "../../../Assets/Img/icon24CallPhone.png";
import icon24Mail from "../../../Assets/Img/icon24Mail.png";
let data = [
  { key: "Work day:", content: "Monday to Friday" },
  { key: "Morning:", content: "9am to 12am" },
  { key: "Afternoon:", content: "1pm to 6pm" },
];
const ContactUs = ({ navigation }) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.paleGrey, flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SecondaryHeader
        goBack={() => {
          navigation.navigate("Home");
        }}
        title={"Contact Us"}
      />
      <ScrollView>
        <Space space={20} />

        <View
          // ref={(scrollView) => (scrollView = scrollView)}
          // scrollEnabled={scrollEnabled}
          style={styles.container}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              alignSelf: "center",
            }}
          >
            <View style={{ paddingTop: 10, paddingBottom: 20 }}>
              <Txt
                fontSize={17}
                color={COLORS.darkBlueGrey}
                style={{
                  fontWeight: "bold",
                  paddingBottom: 10,
                  lineHeight: 24,
                }}
              >
                Diaspo Pte Ltd.
              </Txt>

              <Txt fontSize={14} color={COLORS.slateGrey}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque.
              </Txt>
            </View>
            <HView>
              <View
                style={{
                  backgroundColor: COLORS.lightBlueGrey,
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Image
                  style={styles.ImageVisit}
                  source={icon24MapPinLocation}
                  resizeMode="stretch"
                />
              </View>
              <View style={{ paddingLeft: 15 }}>
                <Txt
                  fontSize={14}
                  color={COLORS.darkBlueGrey}
                  lineHeight={20}
                  Bold={"800"}
                  style={{ paddingTop: 10 }}
                >
                  Visit us:
                </Txt>
                <Txt fontSize={14} color={COLORS.slateGrey}>
                  91 Western Road, Brighton, East Sussex,{"\n"} England
                </Txt>
              </View>
            </HView>
            {/* <Space  space={30}/> */}

            <HView>
              <View
                style={{
                  backgroundColor: COLORS.lightBlueGrey,
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Image style={styles.ImageVisit} source={icon24Time} />
              </View>
              <View>
                <Txt
                  fontSize={14}
                  color={COLORS.darkBlueGrey}
                  lineHeight={20}
                  Bold={"800"}
                  style={{ paddingTop: 40, paddingLeft: 15 }}
                >
                  Working hours:
                </Txt>

                {/* <FlatList
                    data={[
                      {key: 'Work day:',content:'Monday to Friday'},
                      {key: 'Morning:',content:'9am to 12am'},
                      {key: 'Afternoon:',content:'1pm to 6pm'},
                      
                    ]}
                    renderItem={({item}) => <Txt style={styles.item}>{'\u2B24' + ' '}{item.key}{item.content}</Txt>}
                  /> */}

                {data.map((item, index) => {
                  return (
                    <View key={index}>
                      <Txt style={styles.item}>
                        {"\u2B24" + " "}
                        {item.key}
                        {item.content}
                      </Txt>
                    </View>
                  );
                })}
              </View>
            </HView>
            <Space space={30} />

            <HView>
              <View
                style={{
                  backgroundColor: COLORS.lightBlueGrey,
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Image style={styles.ImageVisit} source={icon24CallPhone} />
              </View>
              <View>
                <Txt
                  fontSize={14}
                  color={COLORS.darkBlueGrey}
                  lineHeight={20}
                  Bold={"800"}
                  style={{ paddingTop: 5, paddingLeft: 15 }}
                >
                  Reach us:
                </Txt>
                <Txt
                  fontSize={14}
                  color={COLORS.slateGrey}
                  lineHeight={20}
                  Bold={"800"}
                  style={{ paddingLeft: 15 }}
                >
                  +44 7538 110953
                </Txt>
              </View>
            </HView>

            <Space space={30} />

            <HView>
              <View
                style={{
                  backgroundColor: COLORS.lightBlueGrey,
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Image style={styles.ImageVisit} source={icon24Mail} />
              </View>
              <View>
                <Txt
                  fontSize={14}
                  color={COLORS.darkBlueGrey}
                  lineHeight={20}
                  Bold={"800"}
                  style={{ paddingTop: 5, paddingLeft: 15 }}
                >
                  Email us:
                </Txt>
                <Txt
                  fontSize={14}
                  color={COLORS.slateGrey}
                  lineHeight={20}
                  Bold={"800"}
                  style={{ paddingLeft: 15 }}
                >
                  contact@diaspo.com
                </Txt>
              </View>
            </HView>
          </View>
        </View>
        <Space space={120} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
  },

  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    height: 110,
  },
  Img: {
    height: 193,
    width: 370,
    borderRadius: 10,
  },
  ImageVisit: {
    width: 20,
    height: 20,
  },
  contentList: {
    flex: 1,
  },
  item: {
    paddingLeft: 15,
    fontSize: 14,
    color: COLORS.slateGrey,
  },
});
