import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../theme';
import {Txt} from '../utils';
import Toast from 'react-native-simple-toast';

const SimpleSpiner = ({visible}) => {
  useEffect(() => {
    if (visible) {
      Toast.show(
        "You will be redirected to the tontine's details page ",
      );
    }
  }, [visible]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 120,
        justifyContent: 'center',
        flexDirection: 'row',
      }}>

      <ActivityIndicator
        style={{marginRight: 10, marginTop: 4}}
        size={17}
        color={COLORS.blueGreen}
      />
      <Txt fontSize={14}>Loading ...</Txt>
    </View>
  );
};

export default SimpleSpiner;

const styles = StyleSheet.create({});
