import { ImageBackground, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import AuthHead from "../../../Headers/Auth";
import VA from "../../../../Assets/Img/VA.png";
import Line from "../../line";
import CreatedSuccess from "./Model";

const AuthLayout = ({
  children,
  Title,
  goBack,
  width,
  onDissmis,
  Visible,
  BodyModel,
  top,
}) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        source={VA}
        resizeMode="cover"
      />
      <AuthHead width={width} onPress={goBack}>
        {Title}
      </AuthHead>

      {children}
      {/* <View style={styles.lineBox}>  */}
        {/* <Line /> */}
      {/* </View> */}

      <CreatedSuccess Visible={Visible} onDissmis={onDissmis} >
        {BodyModel ? <BodyModel   onDissmis={onDissmis} /> : null}
      </CreatedSuccess>
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineBox:{
    position:'absolute', 
    bottom:8
  }
});
