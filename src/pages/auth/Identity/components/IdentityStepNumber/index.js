import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../theme';
import {Txt} from '../../../../../components/utils';
import TextSteps from '../TextSteps';
import Space from '../../../../../components/Space';

const IdentityStepNumber = ({step}) => {
  return (
    <>
    <Space space={20}/>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextSteps />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '80%',
          }}>
          <View
            style={{
              height: 5,
              width: '100%',
              backgroundColor: COLORS.paleGrey,
              position: 'absolute',
              alignSelf: 'center',
            }}></View>
          <Card number={1} isActive={step == 1 || step == 2 || step == 3  ? true : false} />
          <Card number={2} isActive={step  == 2 || step == 3 ? true : false} />
          <Card number={3} isActive={step  == 3 ? true : false} />
        </View>
      </View>
    </>
  );
};

export default IdentityStepNumber;

const styles = StyleSheet.create({});

const Card = ({number, isActive}) => {
  return (
    <View>
      <View
        style={{
          height: 32,
          width: 32,
          backgroundColor: isActive ? COLORS.blueGreen : COLORS.paleGrey,
          borderRadius: 32,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Txt color={isActive ? COLORS.white : COLORS.blueGreen}>{number}</Txt>
      </View>
    </View>
  );
};


