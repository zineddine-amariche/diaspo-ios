import { Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../../theme';
import { StatusBar } from 'react-native';
import SecondaryHeader from './SecondaryHeader';
import ImgBack from '../../../Assets/headerImg/background.png';
import Spiner from '../../spiner';

const ReturnHeader = ({children,goBack,title,Loading,sousTitre}) => {
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar translucent={true} backgroundColor={'transparent'} />
    <Image
      style={styles.ImageBackground}
      source={ImgBack}
      resizeMode="stretch"
    />
    <SecondaryHeader
      Cancel="Return"
      goBack={goBack}
      title={title}
      sousTitre={sousTitre}
    />
    {Loading ? <Spiner /> :    children }
    </SafeAreaView>

  )
}

export default ReturnHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        alignItems: 'center',
        flex: 1,
      },
      ImageBackground: {
        // ...StyleSheet.absoluteFillObject,
        width: SIZES.width,
        // height: 170,
        zIndex: 99,
        position: 'absolute',
        top: Platform.OS == 'android' ? -40 : 0,
      },
})