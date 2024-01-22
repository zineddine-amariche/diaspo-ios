import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Rectangle from '../../../../../../components/views/Rectangle';
import HView from '../../../../../../components/views/HView/HView';
import {
  PaleGreyButton,
  PrimaryLinearOption,
} from '../../../../../../components/Buttons';
const RenterConnectCarte = ({onPress, source,isLoading}) => {
  return (
    <View
      elevation={0.2}
      title={'Wallet Connection'}
      swiper
      style={{
         backgroundColor: '#FFF',
        marginTop: 20,
        paddingVertical: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        borderRadius:24,
        paddingHorizontal: 15,
        width:"99%",
        marginBottom:2
        
      }}
      radius={24}>
      <HView spaceBetween>
        <Image source={source} />
        <PaleGreyButton onPress={onPress} width={'40%'} height={40} loading={isLoading}>
          connected
        </PaleGreyButton>
      </HView>
    </View>
  );
};

export default RenterConnectCarte;

const styles = StyleSheet.create({});
