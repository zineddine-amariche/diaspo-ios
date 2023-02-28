import { Formik } from "formik";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { View } from "react-native-animatable";

import ImgBack from "../../../../../../Assets/Img/HomeBack.png";
import { PrimaryButtonLinear } from "../../../../../../components/Buttons";
import SecondaryHeader from "../../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../../components/Space";
import { COLORS, SIZES } from "../../../../../../theme";
import RenderItem from "./components/RenderItem";
import { useCreatCard } from "./Hooks/useCardInfo";

const CardFormInfo = ({ navigation }) => {
  const { initialValues, validationSchema,Submit } = useCreatCard();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SecondaryHeader
        goBack={() => {
          navigation.goBack();
        }}
        title={"Enter Card’s Information"}
        Cancel="Return"
      />
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikAction) => {
            // formikAction.setSubmitting(false);
            formikAction.resetForm();
            // dispatch(login(values));
            Submit(values)
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
            return (
              <>
                <ScrollView
                  contentContainerStyle={{
                    width: SIZES.width,
                    alignItems: "center",
                  }}
                  showsVerticalScrollIndicator={false}
                >
                  <Space space={20} />
                  <RenderItem
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                  />
                  <Space space={120} />
                </ScrollView>
                <View style={{ alignItems:'center',position: "absolute",backgroundColor:COLORS.paleGrey ,bottom: 0, width:'100%', height:90 }}>
                  <Space space={20} />
                  <PrimaryButtonLinear
                    width={"90%"}
                    onPress={() => {
                      handleSubmit();
                    }}
                    // loading={isLoading}
                    disabled={true}
                  >
                    connect this card
                  </PrimaryButtonLinear>
                </View>
              </>
            );
          }}
        </Formik>
      </>
    </SafeAreaView>
  );
};
export default CardFormInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: "center",
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    height: 130,
  },
});
