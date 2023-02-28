import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "../../theme";
import { Head, Txt } from "../utils";
import { CustomPicker } from "react-native-custom-picker";

import AntDesign from "react-native-vector-icons/AntDesign";

const SelectItem = ({
  label,
  data,
  touched,
  errors,
  setFieldValue,
  name,
  placeholder,
  style,
  onBlur
}) => {


  const renderHeader = () => {
    return (
      <View style={styles.headerFooterContainer}>
        <Txt>{placeholder}</Txt>
      </View>
    );
  };
  
  const renderFooter = (action) => {
    return (
      <TouchableOpacity
        style={styles.headerFooterContainer}
        onPress={() => {
          // Alert.alert("Footer", "You've click the footer!", [
          //   {
          //     text: "OK",
          //   },
          //   {
          //     text: "Close Dropdown",
          //     onPress: action.close.bind(this),
          //   },
          // ]);
          action.close;
        }}
      >
        <Text>This is footer, click me!</Text>
      </TouchableOpacity>
    );
  };
  
  const RenderField = (settings, action ) => {
    const { selectedItem, defaultText, getLabel, clear } = settings;
    return (
      <View style={styles.container}>
          {!selectedItem && (
            <View style={styles.innerContainer}>
              <Txt style={{ color: COLORS.silver }}>{defaultText}</Txt>
              <TouchableOpacity
                style={styles.clearButton}
                // onPress={() => action.close.bind(this)}
              >
                <AntDesign name="caretdown" size={20} style={{}} />
              </TouchableOpacity>
            </View>
          )}
          {selectedItem && (
            <View style={styles.innerContainer}>
              <Txt style={styles.text} color={COLORS.black}>
                {getLabel(selectedItem)}
              </Txt>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  clear();
                  // setFieldValue(name, null);
                }}
              >
                <AntDesign name="close" size={20} />
              </TouchableOpacity>
            </View>
          )}
      </View>
    );
  };
  
  const renderOption = (settings) => {
    const { item, getLabel } = settings;
    return (
      <View style={styles.optionContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={[styles.box, { backgroundColor: item.color }]} />
          <Txt style={{ color: item.color, alignSelf: "flex-start" }}>
            {getLabel(item)}
          </Txt>
        </View>
      </View>
    );
  };
  return (
    <View style={{ }}>
     { label ? <Head style={styles.title}>{label}</Head> : null}
        <View style={styles.InputCustom}>
          <CustomPicker
            placeholder={placeholder}
            options={data}
            getLabel={(item) => item.label}
            fieldTemplate={RenderField}
            optionTemplate={renderOption}
            headerTemplate={renderHeader}
            // footerTemplate={renderFooter}
            onValueChange={(value) => {
              // console.log(value)
              // console.log(value?.value)
              setFieldValue(name, value?.value);
              onBlur={onBlur}
            }}
          />
        </View>

      {errors && touched ? (
        <Text style={styles.error}>{errors && errors}</Text>
      ) : null}
    </View>
  );
};

export default SelectItem;


const styles = StyleSheet.create({
  InputCustom: {
    borderBottomColor: COLORS.Vert1,
  },
  container: {
    borderBottomColor: COLORS.silver,
    borderBottomWidth: 1,
    height:40,
    justifyContent :"center"
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 5,
  },
  text: {
    fontSize: 18,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  optionContainer: {
    paddingHorizontal: 0,
    paddingVertical: 20,
    borderBottomColor: COLORS.silver,
    borderBottomWidth: 1,
    width: "80%",
    alignSelf: "center",
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: "row",
  },
  box: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  error: {
    color: COLORS.coral,
    fontSize: 13,
    marginVertical:5

  },
});

{
  /* <Picker
enabled={true}
style={{fontSize:18}}
mode="dropdown"
placeholder={placeholder}
selectedValue={name}
itemStyle={{  }}
onValueChange={(itemValue, itemIndex) => {
  setFieldValue(name, itemValue);
}}
{...style}

>
{data.map((item) => {
  return (
    <Picker.Item
      label={item.name.toString()}
      value={item.value.toString()}
      key={item.Id.toString()}
    />
  );
})}
</Picker> */
}
