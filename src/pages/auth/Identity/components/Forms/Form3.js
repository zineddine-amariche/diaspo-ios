import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Txt} from '../../../../../components/utils';
import RectangleProfAddress from '../../../../../Assets/Kyc/RectangleProfAddress.png';
import addfrontphoto from '../../../../../Assets/Kyc/addfrontphoto.png';
import {COLORS} from '../../../../../theme';
import DeleteButton from '../../../../../components/Buttons/deleteButton';
import {useDispatch, useSelector} from 'react-redux';
import { clearProofDocument, handleCamera } from '../../../../../redux/Features/kyc/identityVerefication/slice';
const Form3 = () => {
  const dispatch = useDispatch();

  const {ProofDocument} = useSelector(state => state.uploadPhotoSlice);
  const deletePhoto = () => {
    dispatch(clearProofDocument());
  };
  const handleCam = () => {
    dispatch(handleCamera(true));
  };

  return (
    <>
      <View style={{alignItems: 'center'}}>
        <View style={{padding: 25}}>
          <Txt
            color={COLORS.TextBody}
            fontSize={16}
            style={{lineHeight: 24, textAlign: 'center'}}
            // fontFamily={'Oxygen-Regular'}
            >
            Please upload photos of your government issued identity
            documentation (ID card, passport or driver's license) with your data
            visible.
          </Txt>
        </View>
        <TouchableOpacity
          // onPress={launchImageLibrary}
          onPress={handleCam}
          style={{
            marginTop: 20,
            overflow: 'hidden',
            borderRadius: 24,

            justifyContent: 'center',
          }}>
          <Image source={RectangleProfAddress} style={{}} />
  

          {ProofDocument?.content ? (
            <>
              <DeleteButton onDelete={deletePhoto} />

              <Image
                source={{uri: ProofDocument?.content}}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  width: 420,
                  height: 400,
                }}
                resizeMode="center"
              />
            </>
          ) : (
            <Image
              source={addfrontphoto}
              style={{
                position: 'absolute',
                alignSelf: 'center',
                justifyContent: 'center',
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Form3;

const styles = StyleSheet.create({});
