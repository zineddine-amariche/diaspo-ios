import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {COLORS} from '../../../../../theme';
import SearchHeader from './components/SearchHeader';
// import CustomHeader from './components/CustomHeader';

const SearchLayout = ({children, opacity,onPress,title}) => {
  return (
    <View style={styles.container}>
      <SearchHeader opacity={opacity} onPress={onPress}  title={title} />
      {children}
    </View>
  );
};

export default SearchLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.paleGrey,
  },
});
