import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../theme';

const ViewT1 = ({children, elevation}) => {
  return (
    <View
      style={[
        styles.container,
        {
          elevation: elevation === 0 ? elevation : 3,
          shadowColor: '#171717',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
      ]}>
      {children}
    </View>
  );
};

export default ViewT1;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    width: '100%',
    alignSelf: 'center',
 
  },
});
