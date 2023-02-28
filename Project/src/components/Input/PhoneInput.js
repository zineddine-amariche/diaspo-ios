import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {Head} from '../utils';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../theme';
import {useSelector} from 'react-redux';
import {useState} from 'react';

const InputPhone = ({
  Label,
  name,
  value,
  placeholder,
  onBlur,
  onChangeText,
  width,
  check,
  style,
  hidePass,
  isPassword,
  HandlehidePass,
  errors,
  touched,
  placeholderTextColor,
  editable,
  keyboardType,
  phoneInputRef,
  onChangeFormattedText,
  setFieldValue,
  formattedValue,
  setFormattedValue,
  setUpdate,
  Update
}) => {
  useEffect(() => {
    if (value) {
      // onChangeFormattedText(value);

      // console.log('value', value)
      onChangeFormattedText(value);
    }
  }, [value]);
  const isReturns = useSelector(
    state => state.registerPerssisteSlice.isReturns,
  );
  // console.log('isReturns', isReturns)
  const colorScheme = useColorScheme();


  // console.log('colorScheme', colorScheme)
  // console.log('Update', Update)
  // console.log('isReturns', isReturns)
  // console.log('formattedValue', formattedValue);
  // console.log('value', value);
  return (
    <>
      <View style={styles.containerForm} {...style}>
        {Label ? <Head>{Label}</Head> : null}
        <View style={{position: 'relative', backgroundColor: COLORS.white}}>
          {formattedValue &&
          value &&
          formattedValue === value &&
          isReturns == 2 &&
          !Update &&
          !errors ? (
            <TouchableOpacity
              onPress={() => {
                setUpdate(true);
              }}
              style={{
                paddingVertical: 20,
                paddingHorizontal: 10,
                marginTop: 10,
                borderBottomWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  color: colorScheme == 'dark' ? COLORS.dark : COLORS.black,
                }}>
                {formattedValue}
              </Text>
            </TouchableOpacity>
          ) : (
            <PhoneInput
              ref={phoneInputRef}
              // value={value}
              defaultCode="DZ"
              layout="second"
              onChangeFormattedText={onChangeFormattedText}
              // onChange={(number, countryCode) => {
              //   console.log(':::::::::: number', number);
              //   console.log(':::::::::: countryCode', countryCode);
              // }}
              withDarkTheme
              withShadow
              containerStyle={{
                alignSelf: 'center',
                elevation: 0,
                borderBottomColor: COLORS.silver,
                borderBottomWidth: 1,
                flex: 1,
              }}
              textContainerStyle={{
                color: colorScheme == 'dark' ? COLORS.dark : COLORS.black,
                paddingBottom: 6,
                backgroundColor: COLORS.white,
              }}
              textInputStyle={{
                color: colorScheme == 'dark' ? COLORS.dark : COLORS.silver,
                marginTop: -13,
                flex: 1,
                paddingTop: 15,
              }}
              inputStyle={{
                backgroundColor: '#fff',
              }}
              codeTextStyle={{}}
              disableArrowIcon={false}
              textProps={{
                placeholder: 'Enter a phone number...',
                style: {
                  color: colorScheme == 'dark' ? COLORS.dark : COLORS.black,
                },
              }}
              // textProps={{ style: { color: 'red' }}}
              //    onChangePhoneNumber={(number, countryCode) => {
              //    console.log(':::::::::: number', number);
              //    console.log(':::::::::: countryCode', countryCode);
              //  }}
            />
          )}
        </View>
      </View>

      {errors ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.error}>{errors} </Text>
        </Animatable.View>
      ) : null}
    </>
  );
};

export default InputPhone;

const styles = StyleSheet.create({
  error: {
    color: COLORS.coral,
    fontSize: 13,
    marginVertical: 5,
  },
});
