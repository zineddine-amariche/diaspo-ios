import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import {COLORS} from '../../../theme';

// import { StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
import {Head, Txt} from '../utils';
// import DateHandler from "./Components/DateHandler";
import {COLORS} from '../../theme';
// import * as Animatable from "react-native-animatable";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateHandler = ({
  setFieldValue,
  name,
  setIsTouched,
  isInteger,
  selectedValue,
  minimumDate,
  maximumDate,
}) => {
  const [date, setDate] = useState(new Date());
  const [Mode, setMode] = useState('date');
  const [show, setshow] = useState(false);
  const [text, settext] = useState('MM-DD-YYYY');
  const [Color, setColor] = useState(false);
  const colorScheme = useColorScheme();

  // get selected value from localStorage &
  // display the last value entred
  useEffect(() => {
    if (selectedValue) {
      settext(selectedValue);
      setColor(true);
    }
  }, [selectedValue]);

  const onChage = (event, selectedDate) => {
    const currenDate = selectedDate || date;
    setshow(Platform.OS === 'ios');
    setDate(currenDate);
    let tempDate = new Date(currenDate);
    var seconds = tempDate.getTime() / 1000;
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    if (isInteger) {
      setFieldValue(name, Math.floor(seconds));
    } else {
      setFieldValue(name, fDate);
    }
    settext(fDate);
    setColor(true);
  };

  const showMode = currentMode => {
    setshow(true);
    setMode(currentMode);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          if (Platform.OS == 'ios') {
            return;
            // showMode('date');
            // setIsTouched(true);
          } else {
            showMode('date');
            setIsTouched(true);
          }
        }}>
        <Txt
          style={{
            color: Color ? COLORS.darkBlueGrey : COLORS.silver,
            fontSize: 20,
            fontWeight: '700',
          }}>
          {Platform.OS == 'ios' ? null : `${text}`}
        </Txt>
        <View
          style={{
            position: 'absolute',
            width: 190,
            top: 1,
            flex: 1,
            zIndex: 20,
            left: -20,
          }}>
          {Platform.OS == 'ios' ? (
            <DateTimePicker
              testID="dateTimePiker"
              value={date}
              mode={Mode}
              is24Hour="default"
              onChange={onChage}
              minimumDate={minimumDate ? minimumDate : undefined}
              maximumDate={maximumDate ? maximumDate : undefined}

              // isVisible={show}
              // onConfirm={handleConfirm}
              // onCancel={onChage}
            />
          ) : (
            show && (
              <DateTimePicker
                testID="dateTimePiker"
                value={date}
                mode={Mode}
                is24Hour="default"
                onChange={onChage}
                minimumDate={minimumDate ? minimumDate : undefined}
                maximumDate={maximumDate ? maximumDate : undefined}

                // isVisible={show}
                // onConfirm={handleConfirm}
                // onCancel={onChage}
              />
            )
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            showMode('date');
            setIsTouched(true);
          }}>
          <Fontisto
            name={'date'}
            color={colorScheme == 'dark' ? COLORS.silver : COLORS.silver}
            size={24}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      {/* {show && ( */}
      {/* <DateTimePicker
          testID="dateTimePiker"
          value={date}
          mode={Mode}
          is24Hour="default"
          onChange={onChage}
          minimumDate={minimumDate ? minimumDate :undefined}
          maximumDate={maximumDate?maximumDate :undefined}

          isVisible={show}
          // onConfirm={handleConfirm}
          // onCancel={onChage}

        /> */}
      {/* )} */}
    </>
  );
};

export default DateHandler;

const styles = StyleSheet.create({
  container: {
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:"#446"
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  Input: {
    color: COLORS.darkBlueGrey,
    fontSize: 20,
    // fontFamily: 'Roboto-Bold',
    flex: 1,
    paddingLeft: 2,
  },
});

// import { StyleSheet, Text, View } from "react-native";
// import React, { useState } from "react";
// import { Head, Txt } from "../utils";
// import DateHandler from "./Components/DateHandler";
// import { COLORS } from "../../theme";
// import * as Animatable from "react-native-animatable";

// const CustomDatePiker = ({
//   label,
//   name,
//   value,
//   placeholder,
//   onBlur,
//   onChangeText,
//   width,
//   check,
//   style,
//   hidePass,
//   isPassword,
//   HandlehidePass,
//   errors,
//   touched,
//   placeholderTextColor,
//   editable,
//   keyboardType,
//   icon,
//   fontSize,
//   openDrawerisReceivers,
//   amount,
//   setFieldValue,
//   isInteger,
//   setIsTouched,
//   IsTouched,
//   selectedValue,
//   minimumDate,
//   maximumDate
// }) => {
//   return (
//     <>
//       <View style={styles.containerForm}>
//         {label ? <Head fontSize={fontSize}>{label}</Head> : null}
//         <View style={styles.InputCustom}>
//           <DateHandler
//             setFieldValue={setFieldValue}
//             name={name}
//             setIsTouched={setIsTouched}
//             isInteger={isInteger}
//             IsTouched={IsTouched}
//             selectedValue={selectedValue}
//             minimumDate={minimumDate}
//             maximumDate={maximumDate}
//           />
//         </View>
//       </View>

//       {errors && IsTouched ? (
//         <Animatable.View animation="fadeInLeft" duration={500}>
//           <Text style={styles.error}>{errors} </Text>
//         </Animatable.View>
//       ) : null}
//     </>
//   );
// };

// export default CustomDatePiker;

// const styles = StyleSheet.create({
//   containerForm: {
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.silver,
//   },
//   error: {
//     color: COLORS.coral,
//     fontSize: 13,
//     marginVertical: 5,
//   },

//   iconPass: {
//     fontSize: 20,
//     position: "absolute",
//     right: 10,
//     top: 9,
//     zIndex: 100,
//   },
//   imp: {
//     position: "absolute",
//     right: 10,
//     top: 10,
//   },
// });
