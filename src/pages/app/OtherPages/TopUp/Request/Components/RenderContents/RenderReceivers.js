import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../../../../../../theme";
import searchImg from "../../../../../../../Assets/Img/icodn24SearchDefault.png";
import { Txt } from "../../../../../../../components/utils";
import HView from "../../../../../../../components/views/HView/HView";
import icon2 from "../../../../../../../Assets/Img/icon24ViewtypeList.png";
import icon24Book from "../../../../../../../Assets/Img/icon24Book.png";
import FormC2 from "../ContactsForms/FormC2";
import FormC1 from "../ContactsForms/FormC1";

const RenderReceivers = ({
  SelectContactToUse,
  ContactToUse,
  ContactsPhone,
}) => {
  const FormsContacts = [
    <FormC1 />,
    <FormC2 ContactsPhone={ContactsPhone} openedPercentage={0.8} />,
  ];
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          backgroundColor: COLORS.paleGrey,
          justifyContent: "center",
          marginHorizontal: 20,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Image
          source={searchImg}
          style={{ position: "absolute", marginLeft: 10 }}
        />
        <TextInput
          placeholder="Search for name or phone number"
          style={{
            paddingLeft: 40,
          }}
        />
      </View>

      <View style={styles.Tab}>
        <TouchableOpacity
          style={styles.LeftButtonTab}
          onPress={() => {
            SelectContactToUse(0);
          }}
        >
          <HView>
            <Image source={icon2} style={{ marginRight: 10 }} />
            <Txt
              style={{ fontSize: 14 }}
              color={ContactToUse === 0 ? COLORS.blueGreen : COLORS.silver}
            >
              Connected users
            </Txt>
          </HView>
          {ContactToUse === 0 && <View style={styles.line} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.RightButtonTab}
          onPress={() => {
            SelectContactToUse(1);
          }}
        >
          <HView>
            <Image source={icon24Book} style={{ marginRight: 10 }} />

            <Txt
              style={{ marginBottom: 5 }}
              color={ContactToUse === 1 ? COLORS.blueGreen : COLORS.silver}
            >
              Your contacts
            </Txt>
          </HView>

          {ContactToUse === 1 && <View style={styles.line} />}
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: !ContactsPhone?.lenght ? COLORS.white : COLORS.paleGrey,
          padding: 16,
          // height: SIZES.height - 40,
        }}
      >
        {FormsContacts[ContactToUse]}
      </View>
      {/* <Line color={COLORS.darkBlueGrey} /> */}
    </View>
  );
};

export default RenderReceivers;

const styles = StyleSheet.create({
  Tab: {
    flexDirection: "row",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  LeftButtonTab: {
    width: "50%",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 20,
  },
  RightButtonTab: {
    width: "50%",
    alignItems: "center",
    paddingBottom: 15,
    paddingTop: 20,
  },
  line: {
    height: 3,
    width: "100%",
    backgroundColor: COLORS.blueGreen,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
