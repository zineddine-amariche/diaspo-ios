import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Txt } from "../../../../../../../components/utils";
import Rectangle from "../../../../../../../components/views/Rectangle";
import Space from "../../../../../../../components/Space";
import { COLORS } from "../../../../../../../theme";
import { TouchableOpacity } from "react-native";

import { useCreatCard } from "../Hooks/useCardInfo";
import PrimaryInput from "../../../../../../../components/Input";
import { PrimaryButtonLinear } from "../../../../../../../components/Buttons";
import SelectCountry from "../../../../../../../components/select/SelectCountry";
import ImgScan from "../../../../../../../Assets/Img/ImgScan.png";
const data = [
  {
    date: "2 cards connected",
    T2: "Melicia Diya",
    T1: "GooglePay",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../../Assets/Img/cardLogo2-removebg-preview.png"),
  },
  {
    date: "29 Jan 2020",
    T2: "Fatima Cleaning Service",
    T1: "ApplePay",
    Price: "+ £1,200",
    status: "charged",
    url: require("../../../../../../../Assets/Img/apple-pay-icon-28-removebg-preview.png"),
  },
  {
    date: "5 bank accounts connected",
    T2: "Bank Accounts",
    T1: "JCB Card",
    Price: "+ £1,200",
    status: "transfer",
    url: require("../../../../../../../Assets/Img/cardLogoCopy.png"),
  },
];

const RenderItem = ({
  values,
  errors,
  handleBlur,
  handleChange,
  touched,
  setFieldValue,
}) => {
  const { CardNumber, fullName, ValidTill, CVV, Country } = values;

  return (
    <Rectangle elevation={0.2} style={{ paddingVertical: 10, width: "90%" }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Space />

        <>
          <PrimaryInput
            name={CardNumber}
            Label={"Card Number"}
            placeholder="Your Card Number"
            style={styles.InputCard}
            errors={errors.CardNumber}
            touched={touched.CardNumber}
            value={CardNumber}
            onBlur={handleBlur("CardNumber")}
            onChangeText={handleChange("CardNumber")}
            fontSize={14}
            cardNumber
            keyboardType='numeric'
          />
          <Space space={20} />
          <PrimaryInput
            placeholder=""
            style={styles.Input}
            name={fullName}
            id={fullName}
            value={fullName}
            onBlur={handleBlur("fullName")}
            onChangeText={handleChange("fullName")}
            Label="Card owner’s full name"
            errors={errors.fullName}
            touched={touched.fullName}
            fontSize={14}
          />
          <Space space={20} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <PrimaryInput
              name={ValidTill}
              Label={"Valid till"}
              placeholder="MM / YY"
              style={styles.Input}
              errors={errors.ValidTill}
              touched={touched.ValidTill}
              value={ValidTill}
              onBlur={handleBlur("ValidTill")}
              onChangeText={handleChange("ValidTill")}
              width="48%"
            />

            <PrimaryInput
              name={CVV}
              Label={"CVV "}
              placeholder="Your last name"
              style={styles.Input}
              errors={errors.CVV}
              touched={touched.CVV}
              value={CVV}
              onBlur={handleBlur("CVV")}
              onChangeText={handleChange("CVV")}
              width="48%"
            />
          </View>

          <Space space={30} />

          <SelectCountry
            label={"Address"}
            placeholder={"Your Country"}
            name={"Country"}
            onBlur={handleBlur("Country")}
            setFieldValue={setFieldValue}
            errors={errors.Country}
            touched={touched.Country}
            onChangeFormattedText={(text) => {
              setFieldValue("Country", text);
            }}
          />

          <Space space={30} />


        </>
      </View>
      <Space />
      <View style={{ padding: 20 }}>
        <Txt fontSize={12} color={COLORS.slateGrey}>
          or you can
        </Txt>
        <TouchableOpacity
          style={styles.scan}
          onPress={() => {
            // navigation.navigate("Forgot");
          }}
        >
          <Image source={ImgScan} style={{ marginTop: 4 }} />
          <View>
            <Txt color={COLORS.yellow}>Scan your card</Txt>
            <Txt fontSize={12} color={COLORS.yellow}>
              Information will be filled automatically
            </Txt>
          </View>
        </TouchableOpacity>
      </View>
    </Rectangle>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  scan: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  InputCard:{
    paddingLeft:40,
    fontSize:20,
    color:COLORS.darkBlueGrey,
    fontWeight:'700'
  }
});
