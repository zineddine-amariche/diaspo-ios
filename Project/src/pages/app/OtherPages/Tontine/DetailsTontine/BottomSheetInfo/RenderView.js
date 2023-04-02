import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import img from '../../../../../../Assets/Img/ImgUser.png';
import {Image} from 'react-native';
import Space from '../../../../../../components/Space';
import {COLORS} from '../../../../../../theme';
import {Head, Txt} from '../../../../../../components/utils';
import {WhiteButton} from '../../../../../../components/Buttons';
import {useSelector} from 'react-redux';
import Spiner from '../../../../../../components/spiner';

const RenderView = ({closeModal, projectId}) => {
  const {isSuccess, isError, data, isLoading, message} = useSelector(state => ({
    ...state.ParticipantInfo,
  }));

  return isLoading ? (
    <View
      style={{
        height: 200,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Txt>Loading</Txt>
      <Txt fontSize={13} color={COLORS.silver} style={{marginTop: 5}}>
        Please wait ...
      </Txt>
    </View>
  ) : (
    <View
      style={{
        backgroundColor: COLORS.white,
        alignItems: 'center',
        marginTop:20

      }}>
      <Space space={20} />
      <Image source={img} />
      <Space space={20} />

      <Head color={COLORS.darkBlueGrey}>Donna Dorothy</Head>
      <Txt color={COLORS.coolGrey}>+28 3768 233984</Txt>
      <Txt color={COLORS.coolGrey}>yvonne_zoe@diaspo.com</Txt>

      <Space space={20} />

      <WhiteButton onPress={closeModal}>Close</WhiteButton>
    </View>
  );
};

export default RenderView;

const styles = StyleSheet.create({});
