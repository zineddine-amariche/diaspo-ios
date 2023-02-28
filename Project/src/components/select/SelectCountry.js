import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  Switch,
  Touchable,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Head, Txt} from '../utils';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../theme';

export default function SelectCountry({
  placeholder,
  label,
  name,
  value,
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
  phoneInput,
  onChangeFormattedText,
  setFieldValue,
  selectedNationality,
  selectedNationalityFlag,
}) {
  const [countryCode, setCountryCode] = useState('DZ');
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [withFlag, setWithFlag] = useState(true);
  const [withEmoji, setWithEmoji] = useState(true);
  const [withFilter, setWithFilter] = useState(true);
  const [withAlphaFilter, setWithAlphaFilter] = useState(false);
  const [withCallingCode, setWithCallingCode] = useState(false);
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
    onChangeFormattedText(country.name, country.cca2);
  };
  const onClose = () => {
    setVisible(false);
  };
  const [Visible, setVisible] = useState(false);

  const handelOpen = () => {
    setVisible(true);
  };

  //  console.log('selectedNationalityFlag', selectedNationalityFlag)
  //  console.log('countryCode', countryCode)

  useEffect(() => {
    if (selectedNationality) {
      setCountry({name: selectedNationality});
      setCountryCode(selectedNationalityFlag);
    }
  }, [selectedNationality, selectedNationalityFlag]);

  const colorScheme = useColorScheme();


  // {color: colorScheme == 'dark' ? COLORS.black : COLORS.dark}

  return (
    <>
      {label ? <Head>{label}</Head> : null}
      <TouchableOpacity style={styles.container} onPress={handelOpen}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CountryPicker
            {...{
              countryCode,
              withFilter,
              withFlag,
              withCountryNameButton,
              withAlphaFilter,
              withCallingCode,
              withEmoji,
              onSelect,
              onClose,
            }}
            visible={Visible}
            placeholderTextColor={COLORS.dark}
          />
          {/* <Text style={styles.instructions}>Press on the flag to open modal</Text> */}
          {/* {country !== null && (
        <Text style={styles.data}>{JSON.stringify(country, null, 2)}</Text>
      )} */}
          {country ? (
            <Txt
              numberOfLines={1}
              color={COLORS.darkBlueGrey}
              fontSize={17}
              // fontFamily={'Poppins-Bold'}
              >
              {country.name}
            </Txt>
          ) : (
            <Text
              style={{
                color: colorScheme == 'dark' ? COLORS.silver : COLORS.silver,
                fontSize: 16,
                // fontFamily: 'Roboto-Bold',
              }}
              numberOfLines={1}>
              {placeholder}
            </Text>
          )}
        </View>
        <View>
          <AntDesign name="caretdown" size={20} style={{}} />
        </View>
      </TouchableOpacity>

      {errors && touched ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.error}>{errors} </Text>
        </Animatable.View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"#ccc",
    borderBottomColor: COLORS.silver,
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    width: '98%',
  },
  Input: {
    color: COLORS.Noir,
    fontSize: 16,
    // fontFamily: 'Roboto-Bold',
  },
  error: {
    color: COLORS.coral,
    fontSize: 13,
    marginVertical: 5,
  },
});

{
  /* <Text style={styles.welcome}>Welcome to Country Picker !</Text> */
}
{
  /* <Switch
        title='With country name on button'
        value={withCountryNameButton}
        onValueChange={setWithCountryNameButton}
      />
      <Switch title='With flag' value={withFlag} onValueChange={setWithFlag} />
      <Switch
        title='With emoji'
        value={withEmoji}
        onValueChange={setWithEmoji}
      />
      <Switch
        title='With filter'
        value={withFilter}
        onValueChange={setWithFilter}
      />
      <Switch
        title='With calling code'
        value={withCallingCode}
        onValueChange={setWithCallingCode}
      />
      <Switch
        title='With alpha filter code'
        value={withAlphaFilter}
        onValueChange={setWithAlphaFilter}
      /> */
}
