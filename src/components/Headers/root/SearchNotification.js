import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../../../theme";
import { Head, Txt } from "../../utils";
import icon24ChevronLeftDefault from "../../../Assets/Img/icon24ChevronLeftDefault.png";
import SearchImg from "../../../Assets/Img/icodn24SearchDefault.png";

const SearchNotification = ({ goBack, title, sousTitre ,Cancel }) => {
  return (
    <View style={[styles.header]}>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Image source={icon24ChevronLeftDefault} />
          { Cancel && (<Txt color={COLORS.white}>{Cancel}</Txt>)}
        </TouchableOpacity>
 
      <View style={styles.conatinerInput}>
        <Image source={SearchImg} />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.slateGrey}
          placeholder="Search"
        />
      </View>
    </View>
  );
};

export default SearchNotification;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
    zIndex: 999,
    flexDirection:'row',
    alignItems:'center'
  },
  button: {
    paddingRight: 15,
    flexDirection:'row',
    alignItems:'center',
    marginRight:10,
    marginLeft:20
  },

  buttonContainer: {
    alignItems: "center",
    flex: 1,
  },
  conatinerInput: {
    width: "60%",
    backgroundColor: COLORS.lightGreyBlue,
    height: 36,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    height: "100%",
    marginTop: 6,
    fontSize: 14,
  },
});
