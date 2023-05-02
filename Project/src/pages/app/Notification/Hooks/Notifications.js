import {ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {StatusBar} from 'react-native';
import {ImageBackground} from 'react-native';
import SecondaryHeader from '../../../../components/Headers/root/SecondaryHeader';
import {COLORS, SIZES} from '../../../../theme';
import ImgBack from '../../../../Assets/Img/HomeBack.png';
import ReactangleNotification from '../../../../components/views/Reactangle-Notification';
import Space from '../../../../components/Space';
import {useSelector} from 'react-redux';
import ReturnHeader from '../../../../components/Headers/root/ReturnHeader';

const Notifications = ({navigation}) => {
  const onSearch = () => {
    navigation.navigate('SearchNotifications');
  };

  const {invitations} = useSelector(state => ({
    ...state.storeNotifications,
  }));

  return (
 
    <ReturnHeader
      title={'Notifications'}
      goBack={() => {
        navigation.goBack();
      }}
      Notifications
      onSearch={onSearch}>
      <Space space={20} />
      {invitations.length == 0 ? (
        <NoNotify />
      ) : (
        <ScrollView contentContainerStyle={{width: SIZES.width}}>
          <ReactangleNotification
            data={invitations}
            navigation={navigation}
            title={`New notifications (${invitations.length})`}
          />
          <Space space={20} />
        </ScrollView>
      )}
    </ReturnHeader>
  );
};

export default Notifications;

const NoNotify = () => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,

        width: SIZES.width,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: colorScheme == 'dark' ? COLORS.black : COLORS.dark}}>
        no notifications
      </Text>
    </View>
  );
};

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
