import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../../../../../theme";
const { width, height } = Dimensions.get("screen");

const childrenWidth = width * 0.9;
const childrenHeight = 78;


const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.paleGrey,
      flex: 1,
    },
    ImageBackground: {
      ...StyleSheet.absoluteFillObject,
      width: SIZES.width,
      height: 110,
    },
    topinuptxt: {
      padding: 20,
    },
    containerButton: {
      width: "100%",
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
      height: 110,
      paddingTop: 15,
      position: "absolute",
      bottom: 0,
    },
    BoxInfoTextYellow: {
      justifyContent: "center",
    },
    textInfo: {
      marginLeft: 8,
    },
    Input: {
      color: COLORS.darkBlueGrey,
      fontSize: 20,
      // //fontFamily: "Roboto-Bold",
      flex: 1,
      paddingLeft: 2,
    },
    Container: {
      backgroundColor: "#fff",
      flexDirection: "row",
      marginVertical: 10,
      paddingLeft: 15,
      paddingRight: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    Img: {
      borderRadius: 5,
      height: 40,
      width: 40,
      marginRight: 6,
    },
  
    item: {
      width: childrenWidth,
      height: childrenHeight,
      flexDirection: "row",
      alignItems: "center",
    },
    item_children: {
      width: childrenWidth,
      height: childrenHeight - 4,
      backgroundColor: "#EEE",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4,
      paddingHorizontal: 20,
    },
    item_icon: {
      width: childrenHeight * 0.6,
      height: childrenHeight * 0.6,
      marginLeft: 15,
      resizeMode: "contain",
    },
    item_text: {
      marginRight: 15,
      color: "#2ecc71",
    },
    ImageBackground: {
      ...StyleSheet.absoluteFillObject,
      width: SIZES.width,
      height: 110,
    },
    Img: {
      borderRadius: 5,
      height: 40,
      width: 40,
      marginRight: 6,
    },
    containerButton: {
      width: "100%",
      paddingHorizontal: 20,
      backgroundColor: COLORS.white,
      height: 110,
      paddingTop: 15,
      position: "absolute",
      bottom: 0,
    },
  });

  export default styles