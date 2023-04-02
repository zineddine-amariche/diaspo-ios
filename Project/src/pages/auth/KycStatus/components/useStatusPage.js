import {StyleSheet, Text, View} from 'react-native';
import {Image, SafeAreaView} from 'react-native';

import React from 'react';
import {StatusBar} from 'react-native';
import {COLORS} from '../../../../theme';
import WhiteHeader from '../../../../components/Headers/Auth/KycWhiteHeader';
import {Txt} from '../../../../components/utils';
import Space from '../../../../components/Space';
import review from '../../../../Assets/Kyc/review.png';
import {PaleGreyButton, PrimaryButton} from '../../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';

const UseStatusPage = ({onClose,data}) => {
  const nav =useNavigation()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <WhiteHeader
        onClose={onClose}
        title="Review of information"
        isClose={false}
      />


      <View style={{alignItems: 'center'}}>
        <Space space={60} />
        <View style={{padding: 25}}>
          <Image source={review} />
          <Space />
          <Txt fontSize={24} lineHeight={34} style={{textAlign: 'center'}}>
            Your registration
          </Txt>
          <Txt fontSize={24} lineHeight={34} style={{textAlign: 'center'}}>
            is under reviewing
          </Txt>
          <Space />

          <Txt
            color={COLORS.TextBody}
            fontSize={16}
            style={{lineHeight: 24, textAlign: 'center'}}
            // fontFamily={'Oxygen-Regular'}
          >
            Thank you for registering on our platform, the administrators will
            review your file and get back to you.
          </Txt>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flex: 1,
          width: '100%',
          alignItems: 'center',
          paddingBottom: 30,
        }}>
        <PaleGreyButton width={'90%'} 
        
        onPress={()=>{
          nav.navigate('ReviewOfInformation',{data})

      
        }}
        >Review information</PaleGreyButton>
        <Space />
        <PrimaryButton onPress={onClose} width={'90%'}>
          Close
        </PrimaryButton>
      </View>

      
    </SafeAreaView>
  );
};

export default UseStatusPage;

const styles = StyleSheet.create({});
