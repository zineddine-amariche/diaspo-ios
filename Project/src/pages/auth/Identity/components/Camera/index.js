import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RNCamera} from 'react-native-camera';
import BtnImage from '../../../../../Assets/Kyc/buttonPhoto.png';
import Flash from '../../../../../Assets/Kyc/Flash.png';
import closePng from '../../../../../Assets/Kyc/close.png';
import switchCamera from '../../../../../Assets/Kyc/switchCamera.png';
import Toast from 'react-native-simple-toast';
import * as ImagePicker from 'react-native-image-picker';
import {
  activateBack,
  activateFront,
  cleanAll,
  handleBackPhotoDocument,
  handleCamera,
  handleFrontPhotoDocument,
  handlePassportDoc,
  handleProofDocument,
  handleSelfiePhotoObject,
  setStep,
  uploadPhoto,
} from '../../../../../redux/Features/kyc/identityVerefication/slice';
import {resetCode} from '../../../../../redux/Features/ConfirmAccount/CodeSlice';
import {Logout} from '../../../../../redux/Features/authentification/Login/Slice';
import {resetRegister} from '../../../../../redux/Features/authentification/Register/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageResizer from 'react-native-image-resizer';
import {useRef} from 'react';
import {PaleGreyButton} from '../../../../../components/Buttons';
import { COLORS } from '../../../../../theme';

const Camera = ({TypeFileToSend, setType, navigation}) => {
  const cameraRef = useRef(null);
  const dispatch = useDispatch();

  const [typeCam, setTypeCam] = useState(RNCamera.Constants.Type.back);
  const {token} = useSelector(state => ({...state.token}));

  const navigate = () => {
    navigation.navigate('login');
  };
  const {isFront, frontPhotoDocument, step, kycUserId} = useSelector(
    state => state.uploadPhotoSlice,
  );
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const fileName = data.uri.split('/').pop();

      let type;
      if (data.uri.endsWith('.jpeg') || data.uri.endsWith('.jpg')) {
        type = 'image/jpeg';
      } else if (data.uri.endsWith('.png')) {
        type = 'image/png';
      }

      let imageSizeInBytes = data.width * data.height * 3; // Assumes 3 bytes per pixel (RGB)
      // let imageSizeInMB = imageSizeInBytes / (1024 * 1024);

      if (imageSizeInBytes > 1500000) {
        // Calculate the new dimensions to maintain aspect ratio while reducing file size
        let newWidth = data.width;
        let newHeight = data.height;
        while (imageSizeInBytes > 1500000) {
          newWidth *= 0.9;
          newHeight *= 0.9;
          imageSizeInBytes /= 1.21; // Reduce file size by 10% each iteration
        }

        // Resize the image using the ImageResizer module
        const resizedImageUri = await ImageResizer.createResizedImage(
          data.uri,
          newWidth,
          newHeight,
          'JPEG',
          85, // Quality of the resized image
        );

        let obj = {
          fileName: resizedImageUri.name,
          typeImage: 'image/jpeg',
          typeToSend: TypeFileToSend,
          content: resizedImageUri.uri,
          token,
          userId: kycUserId,
          onSucces,
          onErrorAction,
          size: resizedImageUri.size,
        };
        onPicIsReady(obj);
      } else {
        let obj = {
          fileName,
          typeImage: type,
          typeToSend: TypeFileToSend,
          content: data.uri,
          token,
          userId: kycUserId,
          onSucces,
          onErrorAction,
          size: imageSizeInBytes,
        };
        onPicIsReady(obj);
      }
    }
  };

  const launchImageLibrary = async () => {
    let response = await ImagePicker.launchImageLibrary({
      mediaTypes: 'photo',
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (response.didCancel) {
      console.log('User cancelled image picker');
      // Toast.show('choose image cancelled !');
    } else if (response.error) {
      Toast.show('Somthing went wrong !');
    } else {
      let DATA = response?.assets[0];

      if (DATA.fileSize > 1500000) {
        let newWidth = DATA.width;
        let newHeight = DATA.height;
        while (DATA.fileSize > 1500000) {
          newWidth *= 0.9;
          newHeight *= 0.9;
          DATA.fileSize /= 1.21; // Reduce file size by 10% each iteration
        }

        // Resize the image using the ImageResizer module
        const resizedImageUri = await ImageResizer.createResizedImage(
          DATA.uri,
          newWidth,
          newHeight,
          'JPEG',
          85, // Quality of the resized image
        );

        let obj = {
          fileName: resizedImageUri.name,
          typeImage: 'JPEG',
          typeToSend: TypeFileToSend,
          content: resizedImageUri.uri,
          token,
          userId: kycUserId,
          onSucces,
          onErrorAction,
          size: resizedImageUri.size,
        };
        onPicIsReady(obj);
      } else {
        let obj = {
          fileName: DATA.fileName,
          typeImage: DATA.type,
          typeToSend: TypeFileToSend,
          content: DATA.uri,
          token,
          userId: kycUserId,
          onSucces,
          onErrorAction,
          size: DATA.fileSize,
        };
        onPicIsReady(obj);
      }
    }
  };

  const onPicIsReady = obj => {
    if (step == 1) {
      dispatch(handleSelfiePhotoObject(obj));
    } else if (step == 2) {
      if (step == 2 && TypeFileToSend == 'PASSPORT') {
        dispatch(handlePassportDoc(obj));
         dispatch(uploadPhoto(obj));
        // console.log('handlePassportDoc-userId', obj.userId);
      } else {
        if (frontPhotoDocument?.content) {
          dispatch(handleBackPhotoDocument(obj));
          dispatch(uploadPhoto(obj));
          // console.log('obj--back-', obj.userId);
        } else {
          dispatch(handleFrontPhotoDocument(obj));
          dispatch(uploadPhoto(obj));
          // console.log('obj--USERID-', obj.userId);
        }
      }
    } else if (step == 3) {
      dispatch(handleProofDocument(obj));
      // console.log('obj--USERID-Step332', obj.userId);
    }
  };

  const onSucces = () => {
    if (step == 1) {
      dispatch(setStep(2));
      Toast.show('success !');
    }
    if (!isFront && step == 2) {
      dispatch(activateFront());
      Toast.show('success !');
    } else if (isFront && step == 2) {
      dispatch(activateBack());
      Toast.show('success !');
    } else if (step == 3) {
      dispatch(cleanAll(navigate));
      setType('PHOTO_CARD');
      Toast.show('success !');
    }
  };
  const onErrorAction = async () => {
    dispatch(resetCode());
    dispatch(Logout());
    dispatch(resetRegister());
    await AsyncStorage.clear();
    navigation.navigate('SplashScreen');
  };

  const flipCamera = () => {
    // setTypeCam(
    //   typeCam === RNCamera.Constants.Type.back
    //     ? RNCamera.Constants.Type.front
    //     : RNCamera.Constants.Type.back,
    // );
    if (typeCam === RNCamera.Constants.Type.back) {
      setTypeCam(RNCamera.Constants.Type.front);
    } else {
      setTypeCam(RNCamera.Constants.Type.back);
    }
  };
// console.log('typeCam', typeCam)
// console.log('RNCamera.Constants.Type.back', RNCamera.Constants.Type.back)
  return (
    <>
      <View
        style={{
          paddingTop: 30,
          backgroundColor: COLORS.white,
          flex: 1,
          paddingBottom: 120,
        }}>
        <View
          style={{
            backgroundColor: '#200',
            flex: 1,
            overflow: 'hidden',
            borderRadius: 30,
            elevation: 2,
          }}>
          <RNCamera
            style={{
              flex: 1,
            }}
            type={typeCam}
            ref={cameraRef}
            captureAudio={false}
            onCameraReady={() => {}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#FFF',
                elevation: 1,
                height: 48,
                width: 48,
                borderRadius: 8,
                top: 25,
                position: 'absolute',
                right: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                dispatch(handleCamera(false));
                // Toast.show(' cancelled !');
              }}>
              <Image source={closePng} />
            </TouchableOpacity>
            <View
              style={{
                bottom: 15,
                position: 'absolute',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <View style={{width: '40%', left: 25, position: 'absolute'}}>
                <Image source={Flash} />
              </View>

              <TouchableOpacity onPress={takePicture}>
                <Image source={BtnImage} />
              </TouchableOpacity>

              {step == 1 || step == 2 ? (
                <TouchableOpacity
                  onPress={flipCamera}
                  style={{right: 25, position: 'absolute'}}>
                  <Image source={switchCamera} />
                </TouchableOpacity>
              ) : null}
            </View>
          </RNCamera>
        </View>
        <View style={styles.cameraButtons}>
          <PaleGreyButton
            onPress={launchImageLibrary}
            //  onPress={loadCam}
            width="100%">
            Choose from library
          </PaleGreyButton>
        </View>
      </View>
    </>
  );
};

export default Camera;


const styles = StyleSheet.create({
    cameraButtons: {
      position: 'absolute',
      bottom: 20,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
  });
