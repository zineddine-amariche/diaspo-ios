import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import {Head} from '../utils';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../theme';

const CustomPhoneInpute = ({
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
//   phoneInputRef,
  onChangeFormattedText,
  setFieldValue,
  formattedValue,
  setFormattedValue,
}) => {
  useEffect(() => {
    if (value) {
      // onChangeFormattedText(value);
      // console.log('value', value)
    }
  }, [value]);
  const phoneInputRef = useRef(null)


  useEffect(() => {

    if(value){

        phoneInputRef.current.setValue(value)
    }
  }, [value])

  return (
    <>
      <View style={styles.containerForm} {...style}>
        {Label ? <Head>{Label}</Head> : null}

        <View style={{position: 'relative', backgroundColor: COLORS.white}}>
        
          <PhoneInput
            ref={phoneInputRef}
            defaultValue={value}
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
              color: COLORS.black,
              paddingBottom: 6,
              backgroundColor: COLORS.white,
            }}
            textInputStyle={{
              color: COLORS.primary,
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
            }}

            //    onChangePhoneNumber={(number, countryCode) => {
            //    console.log(':::::::::: number', number);
            //    console.log(':::::::::: countryCode', countryCode);
            //  }}
          />
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

export default CustomPhoneInpute;

const styles = StyleSheet.create({
  error: {
    color: COLORS.coral,
    fontSize: 13,
    marginVertical: 5,
  },
});
