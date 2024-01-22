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
import {COLORS} from '../../../theme';
import {Txt} from '../../utils';

const DateHandler = ({
  setFieldValue,
  name,
  setIsTouched,
  isInteger,
  selectedValue,
  minimumDate,
  maximumDate
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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        showMode('date');
        setIsTouched(true);
      }}>
      <Txt
        style={{
          color: Color ? COLORS.darkBlueGrey : COLORS.silver,
          fontSize: 20,
          fontWeight: '700',
        }}>
        {text}
      </Txt>
      <TouchableOpacity
        onPress={() => {
          showMode('date');
          setIsTouched(true);
        }}>
        <Fontisto name={'date'} color={colorScheme == 'dark' ? COLORS.silver : COLORS.silver} size={24} />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePiker"
          value={date}
          mode={Mode}
          is24Hour="default"
          onChange={onChage}
          minimumDate={minimumDate ? minimumDate :undefined}
          maximumDate={maximumDate?maximumDate :undefined}

        />
      )}
    </TouchableOpacity>
  );
};

export default DateHandler;

const styles = StyleSheet.create({
  container: {
    margin: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
