import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Form from './components/Form';
import {COLORS} from '../../../theme';

const KycForm = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.blueGreen}}>
      <View style={{height: 90}}></View>
      <Form />
    </View>
  );
};

export default KycForm;

const styles = StyleSheet.create({});
