import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../theme';
import {Txt} from '../../../utils';
import Imgshow from '../../../../Assets/Img/Transaction/icon24DropdownIMG.png';
import close from '../../../../Assets/Kyc/close.png';


import moment from 'moment/moment';
import Toast from 'react-native-simple-toast';

const CustomPikerTransaction = ({
  onOpen,
  date,
  disabled,
  time,
  title,
  ResetDate,
}) => {
  const localTime = moment.utc(time).local().format('HH:mm');

  return (
    <View
      style={{
        width: '50%',
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Txt fontSize={14}>{title}</Txt>

        {date !== 'MM-DD-YYYY' ? (
          <TouchableOpacity onPress={ResetDate}>
            <Image source={close} style={{marginLeft: 5 , height:15 , width:15}} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>

      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          if (disabled) {
            Toast.show('Please enter start date');
          } else {
            onOpen();
          }
        }}>
        <Txt fontSize={12} color={COLORS.darkBlueGrey}>
          {date !== 'MM-DD-YYYY' ? date : 'Select date & time'}
        </Txt>
        <Txt color={COLORS.darkBlueGrey} fontSize={12}>
          {localTime && date !== 'MM-DD-YYYY' ? ' ' + localTime : ''}
        </Txt>
        <Image source={Imgshow} style={{marginLeft: 5}} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomPikerTransaction;

const styles = StyleSheet.create({
  dateTimePicker: {
    backgroundColor: 'transparent',
    color: '#FFF',
    width: 120,
    marginTop: 10,
  },
});
