import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Txt} from '../utils';
import {COLORS} from '../../theme';

import * as Animatable from 'react-native-animatable';

const DateHandler = ({
  setFieldValue,
  name,
  setIsTouched,
  isInteger,
  selectedValue,
  minimumDate,
  maximumDate,
  touched,
  errors,
}) => {
  const [date, setDate] = useState(new Date());
  const [Mode, setMode] = useState('date');
  const [show, setshow] = useState(false);
  const [text, settext] = useState('MM-DD-YYYY');
  const [Color, setColor] = useState(false);
  const colorScheme = useColorScheme();

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
    <>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.silver,
          paddingBottom: Platform.OS == 'ios' ? 10 : 0,
        }}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            if (Platform.OS == 'ios') {
              return;
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
            {Platform.OS == 'ios' ? "" : `${text}`}
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
      </View>

      {errors && touched ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.error}>{errors} </Text>
        </Animatable.View>
      ) : null}
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },

  error: {
    color: COLORS.coral,
    paddingVertical: 5,
    fontSize: 13,
  },
});
