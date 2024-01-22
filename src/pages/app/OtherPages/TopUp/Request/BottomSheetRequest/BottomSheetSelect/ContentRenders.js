import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Head, Txt } from "../../../../../../../components/utils";
import Space from "../../../../../../../components/Space";
import { WhiteButton } from "../../../../../../../components/Buttons";
import { COLORS } from "../../../../../../../theme";
import Form1 from "./Forms/Form1";
import { useCallback } from "react";

const ContentRenders = ({ onPress, closeSelect, setFieldValue, }) => {
  const [selected, setSelected] = useState(0);

  const [success, setsuccess] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);

  // const ShowCodeForm = () => {
  //   setSelected(1);
  // };

  const ShowSucces = () => {
    setsuccess(true);
  };
  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
        }}
      >
        <Head style={styles.Head}>Select bank name</Head>
        <Space space={20} />
        <ScrollView>
          <Form1 setFieldValue={setFieldValue} closeSelect={closeSelect} />
        </ScrollView>
        <Space />

        <WhiteButton onPress={onPress}>CANCEL</WhiteButton>

        <Space space={90} />
      </View>
    </>
  );
};

export default ContentRenders;

// const BodyModel = ({ onDissmis }) => {
//   return (
//     <>
//       <View style={styles.ModelContainer}>
//         <Image source={illusphone} style={{ width: "100%" }} />

//         <Head
//          fontFamily={"Poppins-Bold"}
//           style={{ padding: 20, textAlign: "center" }}
//         >
//           Transfered successfully
//         </Head>
//         <Txt
//           color={COLORS.slateGrey}
//           style={{
//             paddingHorizontal: 10,
//             textAlign: "center",
//             //fontFamily: "Poppins-SemiBold",
//           }}
//         >
//           <Txt Bold={"700"} color={COLORS.black} fontSize={17}>
//             12,000 euro
//           </Txt>{" "}
//           has been transfered successfully to
//           <Txt Bold={"700"} color={COLORS.black} fontSize={17}>
//             {" "}
//             Faith Felicity (+44 7538 110953).
//           </Txt>
//           You can check in your account
//           <Txt Bold={"400"} color={COLORS.orangeYellow} fontSize={17}>
//             {" "}
//             transaction history.
//           </Txt>
//           .
//         </Txt>

//         <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
//       </View>
//     </>
//   );
// };

const styles = StyleSheet.create({
  Head: {
    alignSelf: "center",
    paddingVertical: 10,
  },
});
