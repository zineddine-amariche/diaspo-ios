import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {COLORS} from '../../../../../theme';
import Spiner from '../../../../spiner';
import { Txt } from '../../../../utils';
import CustomHeader from './components/CustomHeader';

const ScreensLayout = ({children, Loading, opacity, onPress, existData}) => {
  return (
    <View style={styles.container}>
      <CustomHeader
        opacity={opacity}
        onPress={onPress}
        title={'Review of information'}
      />

      {Loading ? <Spiner /> : existData ?  children:<NoInformation /> }
    </View>
  );
};

export default ScreensLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.paleGrey,
  },
});

const NoInformation = () => {
  return (
    <View style={{flex:1 ,alignItems:"center",justifyContent:"center"}}>
      <Txt>No Review Infomations</Txt>
    </View>
  );
};
