import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../../../theme';
import Space from '../../../../../components/Space';
import ImgSearch from '../../../../../Assets/Img/Notification/group24.png';
import {Image} from 'react-native';
import {Txt} from '../../../../../components/utils';
import ReturnHeader from '../../../../../components/Headers/root/ReturnHeader';

const SearchNotifications = ({navigation}) => {
  return (
    <ReturnHeader
      title={'Notifications'}
      goBack={() => {
        navigation.navigate('Notifications');
      }}
      Notifications>
      <Space space={40} />
      <ScrollView contentContainerStyle={{}}>
        <View style={{marginTop: 20, alignItems: 'center', padding: 20}}>
          <Image source={ImgSearch} />
          <Space space={40} />
          <Txt fontSize={17} color={COLORS.darkBlueGrey}>
            Search for notifications
          </Txt>
          <Space />
          <Txt fontSize={14} color={COLORS.slateGrey}>
            Find notifications, promotions, updates
          </Txt>
        </View>
      </ScrollView>
    </ReturnHeader>
  );
};

export default SearchNotifications;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: 'center',
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    borderBottomEndRadius: 15,
    overflow: 'hidden',
    borderBottomStartRadius: 15,
    height: 110,
  },
});
