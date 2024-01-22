import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../theme';
import {Modalize} from 'react-native-modalize';
import {PrimaryButton, PrimaryButtonLinear} from '../../../../../components/Buttons';
import {Txt} from '../../../../../components/utils';
import DateTimePicker from '@react-native-community/datetimepicker';

const UseModalize = ({
  showTime,
  time,
  title,
  handleCloseModal,
  date,
  onChage,
  modalRef,
  onChangeTime,
  text,
}) => {
  return (
    <>
      <Modalize
        snapPoint={400}
        ref={modalRef}
        overlayStyle={{
          backgroundColor: COLORS.blueGreenOpacity9,
        }}
        adjustToContentHeight={false}>
        <View>
          <View
            style={{width: '100%', paddingVertical: 20, alignItems: 'center'}}>
            <Txt>{title} </Txt>
          </View>
          {showTime ? (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={onChangeTime}
            />
          ) : Platform.OS == 'ios' ? (
            <DateTimePicker
              testID="dateTimePiker"
              value={date}
              mode={'date'}
              is24Hour="default"
              onChange={onChage}
              display="spinner"
            />
          ) : null}
          <View style={{alignItems: 'center'}}>
            <PrimaryButtonLinear
              disabled={text !== 'MM-DD-YYYY' ? true : false}
              width={'90%'}
              style={{marginTop: 20}}
              onPress={() => handleCloseModal(time)}>
              VALIDATE
            </PrimaryButtonLinear>
          </View>
        </View>
      </Modalize>
    </>
  );
};

export default UseModalize;

const styles = StyleSheet.create({});
