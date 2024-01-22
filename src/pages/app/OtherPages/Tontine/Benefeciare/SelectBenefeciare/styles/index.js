import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../../../../theme";

const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      alignItems: "center",
      flex: 1,
    },
    ImageBackground: {
      ...StyleSheet.absoluteFillObject,
      width: SIZES.width,
      height: 152,
      zIndex: 99,
    },
    topinuptxt: {
      padding: 20,
    },
  
    Tabs: {
      backgroundColor: COLORS.white,
      flex: 1,
    },
    line: {
      height: 3,
      width: "110%",
      backgroundColor: COLORS.blueGreen,
      position: "absolute",
      bottom: -17,
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      alignSelf: "center",
    },
    ButtonText: {
      marginLeft: 5,
    },
  
    lineVertical: {
      height: 45,
      width: 1,
      backgroundColor: COLORS.lightBlueGrey,
    },
    scene: {
      flex: 1,
    },
  });
  
  export default styles