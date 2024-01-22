import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Form from './components/Form';
import {COLORS} from '../../../theme';

const KycForm = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.blueGreenOpacity9,justifyContent:"space-between"}}>
      <View style={{height: 40}}></View>
      <Form />
    </View>
  );
};

export default KycForm;

const styles = StyleSheet.create({});
