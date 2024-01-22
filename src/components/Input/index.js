import React, {useCallback, useState} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {COLORS} from '../../theme';
import {Head, Txt} from '../utils';
import omg from '../../Assets/Img/icon24EyeClose.png';
import cardimg from '../../Assets/Img/icon24CreditcardFace.png';
import CreatedSuccess from '../views/Layouts/AuthLayout/Model';
import Space from '../Space';
import {PaleGreyButton} from '../Buttons';
import HView from '../views/HView/HView';
import imageInfo from '../../Assets/Img/icon24Info2.png';

const PrimaryInput = ({
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
  icon,
  fontSize,
  openDrawerisReceivers,
  amount,
  cardNumber,
  advancedSettings,
  onDissmis,
  visible,
  onSuccess,
}) => {
  const colorScheme = useColorScheme();

  return (
    <View style={{flex: 1}}>
      <View style={[styles.containerForm]}>
        {Label ? (
          <HView>
            <Head fontSize={fontSize} style={{}}>
              {Label}
            </Head>
            {advancedSettings ? (
              <TouchableOpacity onPress={onSuccess}>
                <Image source={imageInfo} style={{marginLeft: 10}} />
              </TouchableOpacity>
            ) : null}
          </HView>
        ) : null}

        <TouchableOpacity
          style={{position: 'relative'}}
          onPress={openDrawerisReceivers}>
          <TextInput
            placeholder={placeholder}
            numberOfLines={1}
            name={name}
            id={name}
            value={value}
            onBlur={onBlur}
            onChangeText={onChangeText}
            {...style}
            style={{
              color: colorScheme == 'dark' ? COLORS.black : COLORS.dark,
              paddingVertical: Platform.OS == 'ios' ? 8 : 7,
            }}
            secureTextEntry={hidePass ? true : false}
            editable={editable}
            keyboardType={keyboardType}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : COLORS.silver
            }
          />

          {cardNumber ? (
            <View style={{position: 'absolute', left: 6, top: 13}}>
              <Image source={cardimg} />
            </View>
          ) : null}

          {check === 'NonCheck' && (
            <View style={{position: 'absolute', right: 10}}>
              <Txt color={COLORS.coral}>Non Verify</Txt>
            </View>
          )}

          {check === true && (
            <View style={{position: 'absolute', right: 10}}>
              <Txt color={COLORS.Sccess}>Verify</Txt>
            </View>
          )}

          {isPassword == 'pass' ? (
            hidePass ? (
              <TouchableOpacity onPress={HandlehidePass} style={styles.imp}>
                <Image source={omg} />
              </TouchableOpacity>
            ) : (
              <Text style={styles.iconPass} onPress={HandlehidePass}>
                👁
              </Text>
            )
          ) : null}

          {amount && (
            <TouchableOpacity onPress={HandlehidePass} style={styles.imp}>
              <Txt>{amount}</Txt>
            </TouchableOpacity>
          )}

          {icon && (
            <TouchableOpacity
              style={{position: 'absolute', right: 5, top: 16}}
              onPress={openDrawerisReceivers}>
              <Image source={icon} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      {errors && touched ? (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.error}>{errors} </Text>
        </Animatable.View>
      ) : null}

      <CreatedSuccess Visible={visible} onDissmis={onDissmis} top={90}>
        {BodyModelInfo ? <BodyModelInfo onDissmis={onDissmis} /> : null}
      </CreatedSuccess>
    </View>
  );
};

export default PrimaryInput;

const BodyModelInfo = ({onDissmis}) => {
  return (
    <>
      <View style={styles.ModelContainer}>

        <Head
          // fontFamily={'Poppins-Bold'}
          style={{padding: 20, textAlign: 'center'}}>
          What is retention rate ?
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            // fontFamily: 'Poppins-SemiBold',
          }}>
          it defines the amount that will remain in the tontine wallet at each
          round of the tontine
        </Txt>
        <Space space={8} />

        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            // fontFamily: 'Poppins-SemiBold',
          }}
          fontSize={12}>
          if a particiapants pay 100 in a 5% retention rate tontine 95 is paid
          to the particiapant 5 remain in account ,the tontine manager can use
          that money and send it as agreed with other
        </Txt>
        <Space space={10} />
        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.silver,
    // borderBottomColor: COLORS.blueGreen,
    marginRight: 10,
  },
  error: {
    color: COLORS.coral,
    fontSize: 13,
    marginVertical: 5,
  },

  iconPass: {
    fontSize: 20,
    position: 'absolute',
    right: 10,
    top: 9,
    zIndex: 100,
  },
  imp: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  light: {
    color: 'black',
  },
  dark: {
    color: 'white',
  },
});
