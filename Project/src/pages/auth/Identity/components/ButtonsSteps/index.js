import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleCamera, setStep, uploadPhoto } from '../../../../../redux/Features/kyc/identityVerefication/slice';
import { PrimaryButton } from '../../../../../components/Buttons';
import Space from '../../../../../components/Space';

const ButtonsSteps = ({setType}) => {
  return (
    <>
      <CustomButtonForStepOne />
      <CustomButtonForStepTow setType={setType} />
      <CustomButtonForStepThree />
    </>
  );
};

export default ButtonsSteps;

const styles = StyleSheet.create({});

const CustomButtonForStepOne = () => {
  const dispatch = useDispatch();

  const {loading, selfiePhotoObject, step} = useSelector(
    state => state.uploadPhotoSlice,
  );
  return (
    <>
      {step == 1 ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingHorizontal: 20,
            backgroundColor: '#FFF',
          }}>
          <PrimaryButton
            loading={loading}
            width={'100%'}
            disabled={step >= 4 ? true : false}
            onPress={() => {
              if (selfiePhotoObject?.content && step == 1) {
                if (selfiePhotoObject.userId) {
                  dispatch(uploadPhoto(selfiePhotoObject));
                  console.log(
                    'selfiePhotoObject selfiePhotoObject',
                    selfiePhotoObject.userId,
                  );
                } else {
                  console.log(
                    ' non selfiePhotoObject.userId',
                    selfiePhotoObject.userId,
                  );
                }
              } else {
                dispatch(handleCamera(true));
              }
            }}>
            {selfiePhotoObject?.content ? 'Next Step' : 'Upload'}
          </PrimaryButton>
          <Space space={20} />
        </View>
      ) : null}
    </>
  );
};

const CustomButtonForStepTow = ({setType}) => {
  const {backPhotoDocument, loading, passportDoc, step} = useSelector(
    state => state.uploadPhotoSlice,
  );
  const dispatch = useDispatch();

  return (
    <>
      {step == 2 && (backPhotoDocument || passportDoc) ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingHorizontal: 20,
            backgroundColor: '#FFF',
          }}>
          <PrimaryButton
            loading={loading}
            width={'100%'}
            disabled={step >= 4 ? true : false}
            onPress={() => {
              if (backPhotoDocument?.content && step == 2) {
                dispatch(setStep(3));
                setType('PROOF_OF_ADDRESS');
              } else if (passportDoc?.content && step == 2) {
                dispatch(setStep(3));
                setType('PROOF_OF_ADDRESS');
              }
            }}>
            {'Next Step'}
          </PrimaryButton>
          <Space space={20} />
        </View>
      ) : null}
    </>
  );
};

const CustomButtonForStepThree = () => {
  const {ProofDocument, loading, step} = useSelector(
    state => state.uploadPhotoSlice,
  );
  const dispatch = useDispatch();
  return (
    <>
      {step == 3 && ProofDocument?.content ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            paddingHorizontal: 20,
            backgroundColor: '#FFF',
          }}>
          <PrimaryButton
            loading={loading}
            width={'100%'}
            disabled={step >= 4 ? true : false}
            onPress={() => {
              if (step == 3) {
                dispatch(uploadPhoto(ProofDocument));
              } else {
                console.log('error upload 3');
              }
            }}>
            {'Complete'}
          </PrimaryButton>
          <Space space={20} />
        </View>
      ) : null}
    </>
  );
};
