import { Alert, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AuthLayout from "../../../components/views/Layouts/AuthLayout";
import Form2 from "./Forms/Form2";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { Head, Txt } from "../../../components/utils";
import { COLORS } from "../../../theme";
import illus from "../../../Assets/Img/illus.png";
import { confirmationPassword, resetConfirm } from "../../../redux/Features/authentification/ConfirmPass/Slice";
import { useDispatch, useSelector } from "react-redux";
import { resetForgot } from "../../../redux/Features/authentification/ForgotPass/Slice";


const CreatPassword = ({ navigation, navigation: { goBack } , route }) => {
  const dispatch = useDispatch();

  const {object} = route.params
  const [ShowSuccesCreatPassword, setShowSuccesCreatPassword] = useState(false);

 

  const onDissmis = () => {
    setShowSuccesCreatPassword(false);
    navigation.navigate("login");
    dispatch(resetConfirm())
    dispatch(resetForgot());
  };

  const { isError, isSuccess, message } = useSelector((state) => ({
    ...state.confirmpass,
  }));

  // let msg = message?.StatusDescription
  //   ? message?.StatusDescription
  //   : "Somthing went wrong.";

  // let msg2 = message?.statusDescription
  //   ? message?.statusDescription
  //   : "Somthing went wrong.";

  // const { username } = useSelector((state) => ({
  //   ...state.forgot,
  // }));


  //   useEffect(() => {
  //   if (isError && message?.status === "error") {
  //     Alert.alert(message?.status, msg, [
  //       {
  //         text: "Cancel",
  //         onPress: () =>{ dispatch(resetConfirm())
  //           dispatch(resetForgot());
  //           navigation.navigate('Forgot')

  //         },
  //         style: "cancel",
  //       },
  //       { text: "OK", onPress: () => {
  //         dispatch(resetConfirm())
  //         dispatch(resetForgot());
  //         navigation.navigate('Forgot')
  //       } },
  //     ]);
  //   }
  //   if (isError && message?.status === "failure") {
  //     Alert.alert(message?.status, msg2, [
  //       {
  //         text: "Cancel",
  //         onPress: () => dispatch(Logout()),
  //         style: "cancel",
  //       },
  //       { text: "OK", onPress: () => dispatch(Logout()) },
  //     ]);
  //   }
  //   if (isSuccess) {
  //     // handleNextStep();
  //     // console.log("success");
  //     setShowSuccesCreatPassword(true);
  //   }
  // }, [isError, isSuccess, message, dispatch]);
  

const onSuccesAction = ()=>{
  setShowSuccesCreatPassword(true);
}
const onErrorAction = async ()=>{
  dispatch(resetCode());
    dispatch(Logout());
    dispatch(resetRegister());
    await AsyncStorage.clear();
    navigation.navigate('SplashScreen');
}


  return (
    <AuthLayout
      Title={"Create a new password"}
      goBack={()=>{
        
        navigation.navigate('Forgot')
        dispatch(resetConfirm())
        dispatch(resetForgot());

        }}
      Visible={ShowSuccesCreatPassword}
      onDissmis={onDissmis}
      BodyModel={BodyModel}
      width={"70%"}
      top={"20%"}
    >
      <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
        <Form2
          
          ShowSuccesCreatPassword={ShowSuccesCreatPassword}
          onDissmis={onDissmis}
          object={object}
          onSuccesAction={onSuccesAction}
          onErrorAction={onErrorAction}
        />
      </KeyboardAwareScrollView>
    </AuthLayout>
  );
};

export default CreatPassword;

const styles = StyleSheet.create({});


const BodyModel = () => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illus} style={{ width: "100%" }} />

        <Head
          // fontFamily={"Poppins-Bold"}
          style={{ padding: 20, textAlign: "center" }}
        >
          New password has been created successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 20,
            textAlign: "center",
            // fontFamily: "Poppins-SemiBold",
          }}
        >
          You now can use your new password to login. This notification will
          be closed automatically.
        </Txt>
        <View style={{ height: 20 }}></View>
      </View>
    </>
  );
};