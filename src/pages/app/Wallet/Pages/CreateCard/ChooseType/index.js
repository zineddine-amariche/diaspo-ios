import React  from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";

import ImgBack from "../../../../../../Assets/Img/HomeBack.png";
import SecondaryHeader from "../../../../../../components/Headers/root/SecondaryHeader";
import Space from "../../../../../../components/Space";
import { COLORS, SIZES } from "../../../../../../theme";
import RenderItem from "./components/RenderItem";

const CreateCard = ({ navigation }) => {


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={"transparent"} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />

      <>
        <SecondaryHeader
          goBack={() => {
            navigation.goBack();
          }}
          title={"Choose Card Type"}
          Cancel="Return"
        />

        <ScrollView
          contentContainerStyle={{ width: SIZES.width, alignItems: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <Space space={20} />
          <RenderItem navigation={navigation} />

        </ScrollView>
      </>


    </SafeAreaView>
  );
};
export default CreateCard;


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
