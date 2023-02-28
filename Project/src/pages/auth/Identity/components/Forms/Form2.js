import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Txt} from '../../../../../components/utils';
import ImageDashed from '../../../../../Assets/Kyc/RectangleDashed.png';
import addfrontphoto from '../../../../../Assets/Kyc/addfrontphoto.png';
import addBackphoto from '../../../../../Assets/Kyc/GroupBack.png';
import {COLORS} from '../../../../../theme';
import checked from '../../../../../Assets/Kyc/icon3.png';
import * as ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import Spiner from '../../../../../components/spiner';
import {
  activateFront,
  handleClearBackPhotoDocument,
  handleClearFrontPhotoDocument,
  uploadPhoto,
} from '../../../../../redux/Features/kyc/identityVerefication/slice';
import Space from '../../../../../components/Space';
import DeleteButton from '../../../../../components/Buttons/deleteButton';
import DropDown from '../../../../../components/select/DropDown';

const data2 = [
  {
    color: COLORS.grayIcon,
    label: 'PASSPORT',
    value: "PASSPORT",
    icon: 'minus',
  },
  {
    color: COLORS.grayIcon,
    label: 'DRIVING_LICENSE',
    value: "DRIVING_LICENSE",
    icon: 'minus',
  },
  {
    color: COLORS.grayIcon,
    label: 'CARD_ID',
    value: "CARD_ID",
    icon: 'minus',
  },
  {
    color: COLORS.grayIcon,
    label: 'NATIONAL_ID',
    value: "NATIONAL_ID",
    icon: 'minus',
  },
];


const Form2 = ({OpenCamera, TypeFileToSend,onSelectType}) => {
  const {
    isFront,
    isBack,
    messasge,
    loading,
    selfiePhotoObject,
    frontPhotoDocument,
  } = useSelector(state => state.uploadPhotoSlice);

  return TypeFileToSend !== 'PHOTO_CARD' ? (
    <>
      {!loading ? <UploadFront OpenCamera={OpenCamera} /> : null}
      {frontPhotoDocument && !loading ? (
        <UploadBack OpenCamera={OpenCamera} />
      ) : null}
    </>
  ) : (
    <View style={{  width:"100%"}}>
      {/* <Txt>select type of Document</Txt> */}

      <DropDown
        label={'Select type of Document'}
        data={data2}
        name={'language'}
        errors={false}
        touched={false}
        placeholder={'Select type of Document'}
        // onBlur={handleBlur('language')}
        value={TypeFileToSend}
        onSelect={onSelectType}
        placeholderTextColor={"#100"}
      />
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({});

const UploadFront = ({OpenCamera}) => {
  const dispatch = useDispatch();

  const [fileUri, setFileUri] = useState('');

  const {isFront, isBack, messasge, frontPhotoDocument, loading} = useSelector(
    state => state.uploadPhotoSlice,
  );

  const deletePhoto = () => {
    dispatch(handleClearFrontPhotoDocument());
  };

  return (
    <>
      {loading ? (
        <SimpleSpiner />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Space space={20} />
          <View style={{padding: 25}}>
            <Txt
              color={COLORS.TextBody}
              fontSize={16}
              style={{lineHeight: 24, textAlign: 'center'}}
              // fontFamily={'Oxygen-Regular'}
              >
              Please upload photos of your government issued identity
              documentation (ID card, passport or driver's license) with your
              data visible.
            </Txt>
          </View>
          <TouchableOpacity
            // onPress={launchImageLibrary}
            onPress={OpenCamera}
            style={{
              marginTop: 20,
              overflow: 'hidden',
              borderRadius: 24,

              justifyContent: 'center',
            }}>
            <Image source={ImageDashed} style={{}} />

            {frontPhotoDocument?.content ? (
              <>
                <DeleteButton onDelete={deletePhoto} />

                <Image
                  source={{uri: frontPhotoDocument?.content}}
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
      )}
    </>
  );
};

const UploadBack = ({OpenCamera}) => {
  const [fileUri, setFileUri] = useState('');
  const {isFront, isBack, messasge, backPhotoDocument, loading} = useSelector(
    state => state.uploadPhotoSlice,
  );

  const dispatch = useDispatch();
  const launchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaTypes: 'photo',
      allowsEditing: true,
      // aspect: [4, 3],
    });

    if (!result.didCancel) {
      let obj = {
        type: '',
        content: result.assets[0].uri,
        token,
      };
      setFileUri(result.assets[0].uri);
      dispatch(uploadPhoto(obj));
    }
  };

  const deletePhoto = () => {
    dispatch(handleClearBackPhotoDocument());
  };
  // console.log('backPhotoDocument?.content', backPhotoDocument?.content)
  return (
    <>
      {loading ? (
        <SimpleSpiner />
      ) : (
        <View style={{alignItems: 'center'}}>
          {/* <View style={{padding: 25}}>
            <Txt
              color={COLORS.TextBody}
              fontSize={16}
              style={{lineHeight: 24, textAlign: 'center'}}
              fontFamily={'Oxygen-Regular'}>
              Please upload photos of your government issued identity
              documentation (ID card, passport or driver's license) with your
              data visible.
            </Txt>
          </View> */}
          <Space />
          <TouchableOpacity
            // onPress={launchImageLibrary}
            onPress={OpenCamera}
            style={{
              marginTop: 20,
              overflow: 'hidden',
              borderRadius: 24,

              justifyContent: 'center',
            }}>
            <Image source={ImageDashed} style={{}} />
            {backPhotoDocument?.content ? (
              <>
                <DeleteButton onDelete={deletePhoto} />

                <Image
                  source={{uri: backPhotoDocument?.content}}
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
                source={addBackphoto}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const UploadSuccess = () => {
  const {isFront, isBack, messasge, loading} = useSelector(
    state => state.uploadPhotoSlice,
  );
  return (
    <>
      {loading ? (
        <SimpleSpiner />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Space space={60} />
          <View style={{padding: 25}}>
            <View
              style={{
                backgroundColor: COLORS.blueGreen,
                height: 60,
                width: 60,
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 30,
              }}>
              <Image source={checked} />
            </View>
            <Txt
              color={COLORS.TextBody}
              fontSize={16}
              style={{lineHeight: 24, textAlign: 'center'}}
              // fontFamily={'Oxygen-Regular'}
              >
              The images have been successfully uploaded. Click next to complete
            </Txt>
          </View>
        </View>
      )}
    </>
  );
};
