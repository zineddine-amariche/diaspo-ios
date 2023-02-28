import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormPassword from "./Forms/FormPassword";

const PasswordRender = ({
  onPress,
  // DeleteSelectMethod,
  onError,
}) => {
  return (
    <View>
      <FormPassword
        onPress={onPress}
        onError={onError}
        // DeleteSelectMethod={DeleteSelectMethod}
      />
    </View>
  );
};

export default PasswordRender;

const styles = StyleSheet.create({});
