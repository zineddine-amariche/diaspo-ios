import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { ImageBackground } from "react-native";
import SecondaryHeader from "../../../../../components/Headers/root/SecondaryHeader";
import { COLORS, SIZES } from "../../../../../theme";
import ImgBack from "../../../../../Assets/Img/HomeBack.png";
import Space from "../../../../../components/Space";
import { Txt } from "../../../../../components/utils";
import bitmap from '../../../../../Assets/Img/bitmap.png';
const Promotion = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />

      <SecondaryHeader
        goBack={() => {
          navigation.navigate("Notifications");
        }}
        title={"Promotion"}
        Cancel="Return"
        
      />
      <Space space={20} />

      <ScrollView
        contentContainerStyle={{ width: SIZES.width }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.boxPolicies}>

        <Image source={bitmap} />
          <Space space={30} />
          <Txt color={COLORS.darkBlueGrey} fontSize={17}>
          30% discount for EXGO tour booking from today with Diaspo Wallet
          </Txt>
          <Space space={4} />
          <Txt color={COLORS.darkSkyBlue} fontSize={12}>
          11:30 am - Yesterday
          </Txt>
          <Space space={10} />
          <Txt color={COLORS.slateGrey} fontSize={14}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </Txt>
          <Space space={10} />
          <Txt color={COLORS.slateGrey} fontSize={14}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
            ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
            numquam eius modi tempora incidunt ut labore et dolore magnam
            aliquam quaerat voluptatem.
          </Txt>
          <Space space={10} />
          <Txt color={COLORS.slateGrey} fontSize={14}>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
            autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
            voluptas nulla pariatur.
          </Txt>
          <Space space={10} />

          <Txt color={COLORS.slateGrey} fontSize={14}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
            est et expedit
          </Txt>

          <Space space={20} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Promotion;

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

  containerButton: {
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: COLORS.transparent,
  },
  boxPolicies: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
