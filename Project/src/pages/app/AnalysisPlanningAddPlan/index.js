import React, { useCallback, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import ImgBack from "../../../Assets/Img/HomeBack.png";

import SecondaryHeader from "../../../components/Headers/root/SecondaryHeader";
import Space from "../../../components/Space";
import { COLORS, SIZES } from "../../../theme";
import Bottom4 from "./BottomSheetPassword";
import ViewT1 from "../../../components/views/CardViewType1";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Formik } from "formik";
import { useAmount } from "./Hooks";
import PrimaryInput from "../../../components/Input";
import DropDown from "../../../components/select/DropDown";
import Switch from "../../../components/Switch/SwitchCom";
import { PrimaryButtonLinear } from "../../../components/Buttons";
import Line from "../../../components/views/line";

const AddPlan = ({ navigation, navigation: { goBack }, route }) => {
  const bottomSheetModalRef = useRef(null);
  const [IsOn, setIsOn] = useState(false);



  const Switchs = ()=>{
    setIsOn(!IsOn)

  }
  const { state, schema, onSubmit } = useAmount();
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const [selected, setSelected] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [selected3, setSelected3] = useState(null);


 

  const onSelects = (item) => {
    setSelected(item);
  };

  const onSelect = (item) => {
    setSelected3(item);
  };
  const onSelec1 = (item) => {
    setSelected2(item);
  };
  const data = [
    {
      color: "#44C5E4",
      label: "Weekly",
      value: 1,
    },
    {
      color: "#44C5E4",
      label: "Monthly",
      value: 2,
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />
      <Formik
        initialValues={state}
        validationSchema={schema}
        onSubmit={(values, formikAction) => {
          // console.log("values", values);
          formikAction.setSubmitting(false);
          formikAction.resetForm();
          // Login();
          // onSubmit(values);
          // handlePresentModalPress();
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => {
          const { amount, category, startAt, endAt } = values;
          return (
            <>
              <SecondaryHeader
                goBack={goBack}
                title={"Add Plan"}
                Cancel={"Cancel"}
                Save={handleSubmit}

              />
              <ScrollView
                contentContainerStyle={{ width: SIZES.width }}
                showsVerticalScrollIndicator={false}
              >
                <>
                  <Space space={30} />
                  <ViewT1>
                    <Space space={20} />
                    <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
                      <DropDown
                        data={data}
                        label={"Select category"}
                        setFieldValue={setFieldValue}
                        name={"category"}
                        errors={errors.category}
                        touched={touched.category}
                        placeholder={"Select your category"}
                        onBlur={handleBlur("category")}
                        value={selected}
                        onSelect={onSelects}
                        placeholderTextColor={COLORS.darkBlueGrey}
                        fontSize={20}
                      />
                      <Space space={20} />
                      <PrimaryInput
                        name={amount}
                        Label={"Amount"}
                        placeholder="14.760"
                        style={styles.Input}
                        errors={errors.amount}
                        touched={touched.amount}
                        value={amount}
                        onBlur={handleBlur("amount")}
                        onChangeText={handleChange("amount")}
                        amount="euro"
                        keyboardType="numeric"
                        placeholderTextColor={COLORS.darkBlueGrey}
                      />
                      <Space space={20} />
                      <DropDown
                        label={"Start date"}
                        setFieldValue={setFieldValue}
                        name={"startAt"}
                        errors={errors.startAt}
                        touched={touched.startAt}
                        placeholder={"Select your Start date"}
                        onBlur={handleBlur("startAt")}
                        value={selected}
                        onSelect={onSelect}
                        placeholderTextColor={COLORS.darkBlueGrey}
                        fontSize={20}
                        onPress={handlePresentModalPress}
                      />
          

                      <Space space={20} />
                      <Switch state={IsOn} label="Repeat this plan"  Switchs={Switchs}/>
                      <Space space={10} />

                    </KeyboardAwareScrollView>
                  </ViewT1>
                </>
              </ScrollView>
            </>
          );
        }}
      </Formik>
      <Bottom4
        bottomSheetModalRef={bottomSheetModalRef}
        // onSuccess={onSuccess}
        // onError={onError}
        // DeleteSelectMethod={DeleteSelectMethod}
      />
            <View style={styles.containerButton}>
        <PrimaryButtonLinear
          disabled={true}
          onPress={() => {
            // NavTobenefOrder();
          }}
          width={"100%"}
        >
          delete plan
        </PrimaryButtonLinear>
        <Space space={25} />
        <Line color={COLORS.black} />
      </View>
    </SafeAreaView>
  );
};
export default AddPlan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: "center",
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    borderBottomEndRadius: 15,
    overflow: "hidden",
    borderBottomStartRadius: 15,
    height: 110,
  },
  topinuptxt: {
    padding: 20,
  },
  containerButton: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 110,
    paddingTop: 15,
  },
  Input: {
    color: COLORS.Noir,
    fontSize: 20,
    // //fontFamily: "Roboto-Bold",
    flex: 1,
    paddingLeft: 2,
  },
});

{
  /* {SelectMethod ? (
                <View style={styles.containerButton}>
                  <PrimaryButtonLinear
                    width={"100%"}
                    onPress={() => {
                      handleSubmit();
                    }}
                    // loading={isSubmitting}
                  >
                    Next
                  </PrimaryButtonLinear>
                  <Space space={25} />
                  <Line color={COLORS.black} />
                </View>
              ) : null} */
}
