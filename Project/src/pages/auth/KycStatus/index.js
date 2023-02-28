import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from '../../../theme';
import WhiteHeader from '../../../components/Headers/Auth/KycWhiteHeader';
import {Txt} from '../../../components/utils';
import Space from '../../../components/Space';
import review from '../../../Assets/Kyc/review.png';

const KycStatusPage = ({navigation}) => {
  const onClose = () => {
    navigation.navigate('login');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <WhiteHeader onClose={onClose} title="Review of information" />
      <View style={{alignItems: 'center'}}>
        <Space space={60} />
        <View style={{padding: 25}}>
          <Image source={review} />
          <Space/>
          <Txt fontSize={24} lineHeight={34} style={{textAlign:"center"}}>Your registration is under reviewing</Txt>
          <Space/>
          
          <Txt
            color={COLORS.TextBody}
            fontSize={16}
            style={{lineHeight: 24, textAlign: 'center'}}
            // fontFamily={'Oxygen-Regular'}
            >
           Thank you for registering on our platform, the administrators will review your file and get back to you.
          </Txt>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KycStatusPage;

const styles = StyleSheet.create({});
