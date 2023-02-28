import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../../../../theme';
import ImgBack from '../../../../../../Assets/Img/headerScreens.png';
import erow from '../../../../../../Assets/Img/E-RowReturn.png';

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Image} from 'react-native';
import {Head} from '../../../../../utils';
const CustomHeader = ({opacity, title, onPress, width}) => {
  return (
    <View style={{position: 'relative', height: 110}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={[styles.ImageBackground, {opacity}]}
        source={ImgBack}
        resizeMode="stretch"
      />
      <View style={styles.container2}>
        <TouchableOpacity onPress={onPress} style={{}}>
          <View
            style={{
              paddingLeft: 20,
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={erow} />
          </View>
        </TouchableOpacity>

        <View style={[styles.children, {width: width}]}>
          <Head
            Bold={'700'}
            fontSize={16}
            color={COLORS.white}
            style={styles.Head}>
            {title}
          </Head>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  ImageBackground: {
    width: SIZES.width,
    zIndex: 100,
    overflow: 'hidden',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    position: 'absolute',
    bottom: -23,
    zIndex: 120,
  },
  Button: {
    backgroundColor: COLORS.Vert0,
    height: 30,
    width: 30,
  },
  children: {
    justifyContent: 'center',
    flex: 1,
  },
  Head: {
    textAlign: 'center',
    fontSize: 24,
    marginLeft: -20,
  },
});
