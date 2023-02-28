import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {COLORS} from '../../../../../theme';
import CustomHeader from './components/CustomHeader';

const ScreensLayout = ({children, opacity,onPress}) => {
  return (
    <View style={styles.container}>
      <CustomHeader opacity={opacity} onPress={onPress}  title={"Review of information"} />
      {children}
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
