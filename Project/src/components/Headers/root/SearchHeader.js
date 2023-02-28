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

const SearchHeader = ({ goBack, title, sousTitre ,Cancel }) => {
  return (
    <View style={[styles.header]}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Image source={icon24ChevronLeftDefault} />
          { Cancel && (<Txt color={COLORS.white}>{Cancel}</Txt>)}
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Head color={COLORS.white}>{title}</Head>
          {sousTitre && (
            <Txt fontSize={14} color={COLORS.white}>
              {sousTitre}
            </Txt>
          )}
        </View>
      </View>
      <View style={styles.conatinerInput}>
        <Image source={SearchImg} />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.slateGrey}
          placeholder="Search on Diaspo"
        />
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    width: "100%",
    paddingTop: 50,
    paddingBottom: 20,
    zIndex: 999,
  },
  button: {
    paddingRight: 15,
    flexDirection:'row',
    alignItems:'center'
  },

  row: {
    flexDirection: "row",
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
    
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    paddingRight: 40,
  },
  conatinerInput: {
    width: "87%",
    backgroundColor: COLORS.lightGreyBlue,
    height: 36,
    marginTop: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    
  },
  input: {
    height: "100%",
    marginTop: 2,
    fontSize: 14,
  },
});
