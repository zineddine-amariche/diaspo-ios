import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import PrimaryInput from "../../../../../components/Input";
import { COLORS } from "../../../../../theme";
import { useRegister } from "../Hooks/useEdit";
import ViewT1 from "../../../../../components/views/CardViewType1";
import { Txt } from "../../../../../components/utils";
import { PrimaryButtonLinear } from "../../../../../components/Buttons";
import avatar from "../../../../../Assets/Img/avatar.png";
import icon16CameraPlus from "../../../../../Assets/Img/icon16CameraPlus.png";

import HView from "../../../../../components/views/HView/HView";
import icon24Info from "../../../../../Assets/Img/icon24Info.png";
import { TouchableOpacity } from "react-native";
import InputPhone from "../../../../../components/Input/PhoneInput";
import SelectCountry from "../../../../../components/select/SelectCountry";
import * as ImagePicker from "react-native-image-picker";
import DropDown from "../../../../../components/select/DropDown";
import { useDispatch, useSelector } from "react-redux";
import rectangleCopy3 from "../../../../../Assets/Img/rectangleCopy3.png";

import Space from "../../../../../components/Space";
import { register } from "../../../../../redux/Features/authentification/Register/Slice";

const Form = ({
  currentStep,
  next,
  navigation,
  handleNextForm,
  handleNextStep,
}) => {
  const handleSubmit = (values) => {
    next(values);
  };

  const data = [
    {
      color: "#44C5E4",
      label: "Man",
      value: 1,
    },
    {
      color: "#EB4592",
      label: "Woman",
      value: 2,
    },
  ];

  const data2 = [
    {
      color: COLORS.grayIcon,
      label: "USA, United Kingdom ",
      value: 1,
      icon: "city",
    },
    {
      color: COLORS.grayIcon,
      label: "Algeria, Alger Centre",
      value: 2,
      icon: "city",
    },
  ];

  const [formattedValue, setFormattedValue] = useState("");

  const {
    initialState,
    validationSchema,
    hidePass,
    HandlehidePass,
    ToRegister,
  } = useRegister();

  const [fileUri, setFileUri] = useState("");
  const dispatch = useDispatch();

  const launchImageLibrary = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
    };

    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: "photo",
      allowsEditing: true,
      aspect: [4, 3],
    });
    // console.log('result', result.assets[0].uri)

    if (!result.didCancel) {
      setFileUri(result.assets[0].uri);
    }
  };
  // console.log('UserPhote', UserPhote)
  const [selected, setSelected] = useState(null);

  const onSelect = (item) => {
    setSelected(item);
  };

  const [selectedCity, setSelectedCIty] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const onSelectCity = (item) => {
    setSelectedCIty(item);
  };
  const onSelectLanguage = (item) => {
    setSelectedLanguage(item);
  };
  const onSelectState = (item) => {
    setSelectedState(item);
  };
  const { loading, message } = useSelector((state) => ({
    ...state.auth,
  }));


 
  return (
    <ViewT1>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={(values, formikAction) => {
          const {
            password,
            email,
            firstName,
            lastName,
            mobileNumber,
            language,
            group,
            streetName,
            streetNumber,
            city,
            postCode,
            state,
            country,
          } = values;

          let obj = {
            password,
            email,
            firstName,
            lastName,
            mobileNumber,
            language,
            group,
            address: {
              streetName,
              streetNumber,
              city,
              postCode,
              state,
              country,
            },
          };

          dispatch(register(obj, navigation));
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
          const {
            gender,
            profile_image,
            lastName,
            firstName,
            email,
            password,
            mobileNumber,
            address,
            streetName,
            streetNumber,
            city,
            postCode,
            state,
            country,
            language,
          } = values;
          return (
            <>
              <View style={styles.Avatar}>
                <Image
                  source={fileUri ? { uri: fileUri } : rectangleCopy3}
                  style={{
                    height: 172,
                    width: 172,
                    borderRadius: 200,
                    backgroundColor: "#eee",
                    borderColor: COLORS.lightGreyBlue,
                    borderWidth: fileUri ? 5 : 7,
                  }}
                />
                <TouchableOpacity
                  style={styles.icon16CameraPlus}
                  onPress={launchImageLibrary}
                >
                  <Image source={icon16CameraPlus} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <PrimaryInput
                  name={firstName}
                  Label={"first name"}
                  placeholder="Your first name"
                  style={styles.Input}
                  errors={errors.firstName}
                  touched={touched.firstName}
                  value={firstName}
                  onBlur={handleBlur("firstName")}
                  onChangeText={handleChange("firstName")}
                  width="48%"
                />

                <PrimaryInput
                  name={lastName}
                  Label={"last name"}
                  placeholder="Your last name"
                  style={styles.Input}
                  errors={errors.lastName}
                  touched={touched.lastName}
                  value={lastName}
                  onBlur={handleBlur("lastName")}
                  onChangeText={handleChange("lastName")}
                  width="48%"
                />
              </View>
              <View style={styles.space}></View>

              <PrimaryInput
                name={email}
                Label={"Email"}
                placeholder="Your email"
                style={styles.Input}
                errors={errors.email}
                touched={touched.email}
                value={email}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                keyboardType="email-address"
              />
              <View style={styles.space}></View>

              <InputPhone
                onChangeFormattedText={(text) => {
                  setFormattedValue(text);
                  setFieldValue("mobileNumber", text);
                }}
                name={mobileNumber}
                Label={"Phone number"}
                placeholder="Your phone number"
                style={styles.Input}
                errors={errors.mobileNumber}
                touched={touched.mobileNumber}
                onBlur={handleBlur("mobileNumber")}
                keyboardType="numeric"
              />
              <View style={styles.space}></View>

              <DropDown
                label={"Language"}
                data={data2}
                setFieldValue={setFieldValue}
                name={"language"}
                errors={errors.language}
                touched={touched.language}
                placeholder={"Select language"}
                onBlur={handleBlur("language")}
                value={selectedLanguage}
                onSelect={onSelectLanguage}
              />
              <View style={styles.space}></View>

              <SelectCountry
                label={"Address"}
                placeholder={"Your country"}
                name={"country"}
                onBlur={handleBlur("country")}
                setFieldValue={setFieldValue}
                errors={errors.country}
                touched={touched.country}
                onChangeFormattedText={(text) => {
                  setFieldValue("country", text);
                }}
              />
              <View style={styles.space}></View>

              <DropDown
                data={data2}
                setFieldValue={setFieldValue}
                name={"state"}
                errors={errors.state}
                touched={touched.state}
                placeholder={"Select your state"}
                onBlur={handleBlur("state")}
                value={selectedState}
                onSelect={onSelectState}
              />

              <View style={styles.space}></View>

              <DropDown
                data={data2}
                setFieldValue={setFieldValue}
                name={"city"}
                errors={errors.city}
                touched={touched.city}
                placeholder={"Select your city"}
                onBlur={handleBlur("city")}
                value={selectedCity}
                onSelect={onSelectCity}
              />

              <View style={styles.space}></View>

              <PrimaryInput
                name={streetName}
                placeholder="Your street name"
                style={styles.Input}
                errors={errors.streetName}
                touched={touched.streetName}
                value={streetName}
                onBlur={handleBlur("streetName")}
                onChangeText={handleChange("streetName")}
              />

              <View style={styles.space}></View>

              <PrimaryInput
                name={streetNumber}
                placeholder="Your street number"
                style={styles.Input}
                errors={errors.streetNumber}
                touched={touched.streetNumber}
                value={streetNumber}
                onBlur={handleBlur("streetNumber")}
                onChangeText={handleChange("streetNumber")}
                keyboardType="numeric"
              />
              <View style={styles.space}></View>

              <PrimaryInput
                name={postCode}
                placeholder="Your post code"
                style={styles.Input}
                errors={errors.postCode}
                touched={touched.postCode}
                value={postCode}
                onBlur={handleBlur("postCode")}
                onChangeText={handleChange("postCode")}
                keyboardType="numeric"
              />
              <View style={styles.space}></View>

              <PrimaryInput
                placeholder="Your password"
                style={styles.Input}
                name={password}
                id={password}
                value={password}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                Label="Password"
                secureTextEntry={hidePass ? true : false}
                isPassword={"pass"}
                hidePass={hidePass}
                HandlehidePass={HandlehidePass}
                errors={errors.password}
                touched={touched.password}
                placeholderTextColor={COLORS.Noir}
              />
              <View style={styles.space}></View>

              <PrimaryButtonLinear
                width={"100%"}
                onPress={() => {
                  handleSubmit();
                }}
                loading={loading}
                disabled={true}
              >
                Update user
              </PrimaryButtonLinear>
              <Space space={20} />

              <HView>
                <Image source={icon24Info} style={{ marginRight: 10 }} />
                <Txt style={styles.bodyText}>
                  By creating an account, you agree to
                </Txt>
              </HView>
              <>
                <Txt style={styles.copyrightText}>
                  Diaspo’s Terms of Service and Privacy Policy.
                </Txt>
              </>
              <Space space={20} />
            </>
          );
        }}
      </Formik>
    </ViewT1>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 20,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.slateGrey,
    textAlign: "center",
  },
  copyrightText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.orangeYellow,
    paddingLeft: 26,
  },
  Input: {
    color: COLORS.Noir,
    fontSize: 16,
    // //fontFamily: "Roboto-Bold",
    flex: 1,
    paddingLeft: 2,
  },
  Avatar: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    position: "relative",
    flex: 1,
    overflow: "hidden",
  },
  icon16CameraPlus: {
    position: "absolute",
    right: "25%",
    bottom: 30,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 100,
    shadowColor: COLORS.blueGreen,
    shadowOffset: {
      width: 10,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

 
