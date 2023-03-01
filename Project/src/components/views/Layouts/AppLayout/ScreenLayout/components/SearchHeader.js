import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../../../../theme';
import ImgBack from '../../../../../../Assets/Img/headerScreens.png';
import erow from '../../../../../../Assets/Img/E-RowReturn.png';
import SearchImg from '../../../../../../Assets/Img/icodn24SearchDefault.png';

import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Image} from 'react-native';
import {Head, Txt} from '../../../../../utils';
const SearchHeader = ({opacity, title, onPress, width}) => {
  return (
    <View
      style={{
        position: 'relative',
      }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={[styles.ImageBackground]}
        source={ImgBack}
        resizeMode="stretch"
      />

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: Platform.OS == 'ios' ? 50 : 30,
        }}>
        <TouchableOpacity onPress={()=>{
          console.log('click')
          onPress()
        }} style={{flexDirection:'row',alignItems:"center"}}>
          <View
            style={{
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image source={erow} />
          </View>
          <Txt color={COLORS.white}>Return</Txt>

        </TouchableOpacity>

        <Head
          Bold={'700'}
          fontSize={20}
          color={COLORS.white}
          style={styles.Head}>
          {title}
        </Head>
      </View>
      <View style={styles.conatinerInput}>
        <Image source={SearchImg} />
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.slateGrey}
          placeholder="Search on Diaspo"
        />
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  ImageBackground: {
    width: SIZES.width,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: Platform.OS == 'ios' ? 160 : 140,
  },

  input: {
    height: '100%',
    marginTop: 2,
    fontSize: 14,
  },
  conatinerInput: {
    width: '87%',
    backgroundColor: COLORS.lightGreyBlue,
    height: 36,
    marginTop: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    zIndex: 1000,
    bottom: Platform.OS == 'ios' ? 15 : 20,
    position: 'absolute',
    alignSelf: 'center',
  },
  Head: {
    textAlign: 'center',
    width: '55%',
    lineHeight: 28,
  },
});
