import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../../theme';
import Space from '../../../components/Space';
import {RNCamera} from 'react-native-camera';
import BtnImage from '../../../Assets/Kyc/buttonPhoto.png';
import Flash from '../../../Assets/Kyc/Flash.png';
import closePng from '../../../Assets/Kyc/close.png';
import switchCamera from '../../../Assets/Kyc/switchCamera.png';
import Toast from 'react-native-simple-toast';
import * as ImagePicker from 'react-native-image-picker';

import {PaleGreyButton, PrimaryButton} from '../../../components/Buttons';
import IdentityStepNumber from './components/IdentityStepNumber';
import WhiteHeader from '../../../components/Headers/Auth/KycWhiteHeader';
import Form1 from './components/Forms/Form1';
import Form2 from './components/Forms/Form2';
import Form3 from './components/Forms/Form3';
import {useDispatch, useSelector} from 'react-redux';
import Spiner from '../../../components/spiner';
import ImageResizer from 'react-native-image-resizer';

import {useRef} from 'react';
import {
  activateBack,
  activateFront,
  cleanAll,
  clearProofDocument,
  handleBackPhotoDocument,
  handleCamera,
  handleClearBackPhotoDocument,
  handleClearFrontPhotoDocument,
  handleClearSelfiePhotoObject,
  handleFrontPhotoDocument,
  handleProofDocument,
  handleSelfiePhotoObject,
  setStep,
  uploadPhoto,
} from '../../../redux/Features/kyc/identityVerefication/slice';
import {resetCode} from '../../../redux/Features/ConfirmAccount/CodeSlice';
import {Logout} from '../../../redux/Features/authentification/Login/Slice';
import {resetRegister} from '../../../redux/Features/authentification/Register/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Identity = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    isFront,
    selfiePhotoObject,
    backPhotoDocument,
    frontPhotoDocument,
    loading,
    step,
    openCamera,
    messasge,
    ProofDocument,
    kycUserId
  } = useSelector(state => state.uploadPhotoSlice);
  const {user} = useSelector(state => ({
    ...state.register,
  }));

  const {userId} = useSelector(state => ({
    ...state.auth.user,
  }));

console.log('kycUserId', kycUserId)
 
  // const user = useSelector(state => ({
  //   ...state.auth.user,
  // }));
  // console.log('userId', userId)
// console.log('user', user)


  const [TypeFileToSend, setTypeFileToSend] = useState('PHOTO_CARD');
  const [typeCam, setTypeCam] = useState(RNCamera.Constants.Type.back);
  const cameraRef = useRef(null);
  const {token} = useSelector(state => ({...state.token}));

  const naviagte = () => {
    navigation.navigate('login');
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
      dispatch(cleanAll(naviagte));
      setTypeFileToSend('PHOTO_CARD');
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
    setTypeCam(
      typeCam === RNCamera.Constants.Type.back
        ? RNCamera.Constants.Type.front
        : RNCamera.Constants.Type.back,
    );
  };
  const onSelectType = item => {
    setTypeFileToSend(item.value);
    console.log('item', item.value);
    // setIsTouchedLanguage(true)
  };
  const renderScene = () => {
    switch (step) {
      case 1:
        return <Form1 navigation={navigation} />;
      case 2:
        return (
          <Form2
            navigation={navigation}
            OpenCamera={() => {
              dispatch(handleCamera(true));
            }}
            TypeFileToSend={TypeFileToSend}
            onSelectType={onSelectType}
          />
        );
      case 3:
        return (
          <Form3
            navigation={navigation}
            OpenCamera={() => {
              dispatch(handleCamera(true));
            }}
          />
        );
    }
  };

  const onPicIsReady = obj => {
    if (step == 1) {
      dispatch(handleSelfiePhotoObject(obj));
    } else if (step == 2) {
      if (frontPhotoDocument?.content) {
        dispatch(handleBackPhotoDocument(obj));
        dispatch(uploadPhoto(obj));
        console.log('obj--back-', obj.userId)

      } else {
        dispatch(handleFrontPhotoDocument(obj));
        dispatch(uploadPhoto(obj));
        console.log('obj--USERID-', obj.userId)

      }
    } else if (step == 3) {
      dispatch(handleProofDocument(obj));
      console.log('obj--USERID-Step332', obj.userId)

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
      console.log('ImagePicker Error: ', response.error);
      Toast.show('Somthing went wrong  with photo library!');
    } else {
      let DATA = response?.assets[0];
      // console.log('fileSize  onSelect ', DATA.fileSize);

      if (DATA.fileSize > 1500000) {
        // Calculate the new dimensions to maintain aspect ratio while reducing file size
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
        // console.log('new size', obj.size);
         onPicIsReady(obj);
        // console.log('obj--USERID-BIG', obj.userId)

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
        console.log('small');
         onPicIsReady(obj);
        // console.log('obj--USERID-BIG', obj.userId)

      }
    }
  };
  const onClose = () => {
    navigation.navigate('login');
    setTypeFileToSend('PHOTO_CARD');
    dispatch(setStep(1));
    dispatch(handleClearSelfiePhotoObject());
    dispatch(handleClearFrontPhotoDocument());
    dispatch(handleClearBackPhotoDocument());
    dispatch(clearProofDocument());
  };

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
      let imageSizeInMB = imageSizeInBytes / (1024 * 1024);
      // console.log('imageSizeInBytes from camera ', imageSizeInBytes)
      // console.log('fileSize  onSelect from camera ', imageSizeInMB);

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
        // console.log('new size', resizedImageUri.size);
         onPicIsReady(obj);
        console.log('obj--USERID-BIG', obj.userId)

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
        console.log('small');
        onPicIsReady(obj);
        console.log('obj---userId---onSMALL', obj.userId)

      }
    }
  };
  return (
    <>
      {!openCamera ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            alignItems: 'center',
          }}>
          <StatusBar translucent={true} backgroundColor={'transparent'} />
          <WhiteHeader onClose={onClose} title="Identity Verification" />

          <IdentityStepNumber step={step} />
          {loading ? (
            <Spiner />
          ) : (
            <>
              <Space space={20} />
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{}}>
                {renderScene()}
                <Space space={190} />
              </ScrollView>

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
                      if (selfiePhotoObject?.content  && step == 1) {

                        if(selfiePhotoObject.userId){
                         dispatch(uploadPhoto(selfiePhotoObject));
                          console.log('selfiePhotoObject selfiePhotoObject', selfiePhotoObject.userId);
                        }else{
                          console.log(' non selfiePhotoObject.userId', selfiePhotoObject.userId)
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
              {step == 2 && backPhotoDocument ? (
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
                        setTypeFileToSend('PROOF_OF_ADDRESS');
                      } else {
                        console.log('PROOF_OF_ADDRESS_ERROOr');
                      }
                    }}>
                    {'Next Step'}
                  </PrimaryButton>
                  <Space space={20} />

                </View>
              ) : null}
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
          )}
        </SafeAreaView>
      ) : (
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
      )}
    </>
  );
};

export default Identity;

// let obj = {
//   fileName,
//   typeImage: type,
//   typeToSend: TypeFileToSend,
//   content: data.uri,
//   token,
//   userId: userId ? userId : user?.data?.walletAccountUser?.userId,
//   onSucces,
//   onErrorAction,
// };
// const imageSizeInBytes = data.width * data.height * 3; // Assumes 3 bytes per pixel (RGB)
// const imageSizeInMB = imageSizeInBytes / (1024 * 1024);

// if (imageSizeInMB > 2500000) {
//   // Calculate the new dimensions to maintain aspect ratio while reducing file size
//   let newWidth = data.width;
//   let newHeight = data.height;
//   while (imageSizeInMB > 1500000) {
//     newWidth *= 0.9;
//     newHeight *= 0.9;
//     imageSizeInMB /= 1.21; // Reduce file size by 10% each iteration
//   }

//   const resizedImageUri = await ImageResizer.createResizedImage(
//     (imageUri = data.uri),
//     newWidth,
//     newHeight,
//     (typeImage = type),
//     85, // Quality of the resized image
//   );
//   console.log('resizedImageUri', resizedImageUri);
// }

// if (imageSizeInMB < 2.5) {
//   // console.log('imageSizeInMB', imageSizeInMB);
//   if (step == 1) {
//     dispatch(handleSelfiePhotoObject(obj));
//   } else if (step == 2) {
//     if (frontPhotoDocument?.content) {
//       dispatch(handleBackPhotoDocument(obj));
//       dispatch(uploadPhoto(obj));
//     } else {
//       dispatch(handleFrontPhotoDocument(obj));
//       dispatch(uploadPhoto(obj));
//     }
//   } else if (step == 3) {
//     dispatch(handleProofDocument(obj));
//   }
// } else {
//   Toast.show('image size too big,take another one');
//   dispatch(handleCamera(false));
// }

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
