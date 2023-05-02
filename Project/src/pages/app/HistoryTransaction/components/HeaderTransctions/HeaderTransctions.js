import { Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImgBack from '../../../../../Assets/Img/HomeBack.png';
import SecondaryHeader from '../../../../../components/Headers/root/SecondaryHeader';
import { StatusBar } from 'react-native';
import Space from '../../../../../components/Space';
import { COLORS, SIZES } from '../../../../../theme';



const HeaderTransctions = ({children, navigation}) => {
    return (
      <>

        <SafeAreaView style={styles.container}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <Space />
          <Image
            style={styles.ImageBackground}
            source={ImgBack}
            resizeMode="stretch"
          />
          <SecondaryHeader
            goBack={() => {
              navigation.goBack();
            }}
            title={'Transaction History'}
            Cancel={'Cancel'}
          />
          <Space space={20} />
  
          {children}
        </SafeAreaView>
      </>
    );
  };

export default HeaderTransctions

const styles = StyleSheet.create({
    container: {
      backgroundColor: COLORS.paleGrey,
      alignItems: 'center',
      flex: 1,
    },
    ImageBackground: {
      ...StyleSheet.absoluteFillObject,
      width: SIZES.width,
      height: Platform.OS == 'ios' ? 200 : 170,
    },
  });