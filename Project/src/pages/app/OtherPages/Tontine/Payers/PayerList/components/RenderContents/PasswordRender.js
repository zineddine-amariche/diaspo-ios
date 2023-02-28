import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FormPassword from "./Forms/FormPassword";

const PasswordRender = ({
  onPress,
  // onSuccess,
  DeleteSelectMethod,
  onError,
}) => {
  return (
    <View>
      <FormPassword
        onPress={onPress}
        onError={onError}
        // onSuccess={onSuccess}
        DeleteSelectMethod={DeleteSelectMethod}
      />
    </View>
  );
};

export default PasswordRender;

const styles = StyleSheet.create({});
