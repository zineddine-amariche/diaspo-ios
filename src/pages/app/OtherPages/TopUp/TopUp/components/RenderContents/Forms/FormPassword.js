import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { useRef } from "react";
import * as Animatable from "react-native-animatable";
import { Head, Txt } from "../../../../../../../../components/utils";
import { PrimaryButtonLinear } from "../../../../../../../../components/Buttons";
import { useTransfers } from "../../../Hooks";
import { COLORS } from "../../../../../../../../theme";
import Space from "../../../../../../../../components/Space";
import ViewT2 from "../../../../../../../../components/views/CardV2";
import { useDispatch } from "react-redux";

const FormPassword = ({
  handleNextForm,
  onPress,
  DeleteSelectMethod,
  onError,
  // onSuccess,
}) => {
  const { StateCode, validationSchemaCode } = useTransfers();
  let textInput = useRef(null);

  const lengthInput = 6;

  const [interVal, setinterVal] = useState("");

  useEffect(() => {
    textInput.focus();
  }, []);

  const dispatch = useDispatch();

  return (
    <>
      <ViewT2 elevation={0}>
        <Formik
          initialValues={StateCode}
          validationSchema={validationSchemaCode}
          onSubmit={(values, formikAction) => {
            setTimeout(() => {
              // console.log("values", values);
              formikAction.setSubmitting(false);
              formikAction.resetForm();
              handleNextForm(2);
            }, 1000);
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
            const { code } = values;

            return (
              <>
                <Head style={styles.label}>
                  {"Enter your password to confirm"}
                </Head>
                <TextInput
                  onChangeText={(val) => {
                    setinterVal(val);
                    setFieldValue("code", val);
                  }}
                  style={{ width: 0, height: 0, position: "absolute" }}
                  value={interVal}
                  maxLength={lengthInput}
                  returnKeyType="done"
                  keyboardType="numeric"
                  ref={(input) => {
                    textInput = input;
                  }}
                  onBlur={handleBlur("code")}
                  autoFocus={true}
                  onSubmitEditing={() => {
                    if (interVal.length !== 6) {
                      // alert('wrong password')
                      onError();
                      DeleteSelectMethod();
                    } else {
                      // console.log('submiting',interVal.length)
                      // onSuccess();
                      DeleteSelectMethod();
                    }
                  }}
                />

                <View style={styles.containerInput}>
                  {Array(lengthInput)
                    .fill()
                    .map((data, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            textInput.focus();
                          }}
                        >
                          <View
                            style={[
                              styles.cellView,
                              {
                                borderBottomColor:
                                  index === interVal?.length
                                    ? COLORS.Vert1
                                    : COLORS.gray,
                              },
                            ]}
                          >
                            <Text style={styles.cellText}>
                              {interVal && interVal.length > 0
                                ? interVal[index]
                                : ""}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </View>

                {errors.code && touched.code ? (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.error}>{errors.code} </Text>
                  </Animatable.View>
                ) : null}

                <Space space={20} />
                <PrimaryButtonLinear
                  width={"100%"}
                  onPress={() => {
                    onPress();
                    Keyboard.dismiss();
                    DeleteSelectMethod();
                  }}
                  loading={isSubmitting}
                  condition
                  color={COLORS.dirtyBlue}
                >
                  CANCEL
                </PrimaryButtonLinear>
              </>
            );
          }}
        </Formik>
      </ViewT2>
    </>
  );
};

export default FormPassword;

const styles = StyleSheet.create({
  label: {
    fontWeight: "700",
    textAlign: "center",
  },

  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1.5,
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    textAlign: "center",
    fontSize: 16,
  },
  error: {
    color: COLORS.coral,
    marginTop: 10,
    paddingLeft: 10,
    fontSize: 13,
  },

  containerNumbers: {
    // width: 282,
    height: 348,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
  },
  number: {
    height: 45,
    width: 110,
    borderRadius: 5,
    backgroundColor: COLORS.shadows,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
    marginVertical: 5,
  },
  numberText: {
    fontSize: 30,
    color: COLORS.black,
    letterSpacing: 0,
    textAlign: "center",
  },
});

{
  /* <View style={{ backgroundColor: COLORS.Blur }}>
        <View style={[styles.containerNumbers, {}]}>
          {numbers.map((n) => {
            return (
              <TouchableOpacity
                style={styles.number}
                key={n.id}
                onPress={() => {
                  onAdd(n.id);
                }}
              >
                <Text style={styles.numberText}>{n.id}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View> */
}
