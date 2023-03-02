import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Txt} from '../../../../../components/utils';
import ImageDashed from '../../../../../Assets/Kyc/RectangleDashed.png';
import addfrontphoto from '../../../../../Assets/Kyc/galleryadd.png';
import addBackphoto from '../../../../../Assets/Kyc/GroupBack.png';
import {COLORS} from '../../../../../theme';
import checked from '../../../../../Assets/Kyc/icon3.png';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearPassportDoc,
  handleCamera,
  handleClearBackPhotoDocument,
  handleClearFrontPhotoDocument,
} from '../../../../../redux/Features/kyc/identityVerefication/slice';
import Space from '../../../../../components/Space';
import DeleteButton from '../../../../../components/Buttons/deleteButton';
import DropDown from '../../../../../components/select/DropDown';

const data2 = [
  {
    color: COLORS.grayIcon,
    label: 'PASSPORT',
    value: 'PASSPORT',
    icon: 'minus',
  },
  {
    color: COLORS.grayIcon,
    label: 'DRIVING_LICENSE',
    value: 'DRIVING_LICENSE',
    icon: 'minus',
  },
  {
    color: COLORS.grayIcon,
    label: 'CARD_ID',
    value: 'CARD_ID',
    icon: 'minus',
  },
  {
    color: COLORS.grayIcon,
    label: 'NATIONAL_ID',
    value: 'NATIONAL_ID',
    icon: 'minus',
  },
];

const Form2 = ({  TypeFileToSend, onSelectType}) => {
  const {loading, frontPhotoDocument} = useSelector(
    state => state.uploadPhotoSlice,
  );

  return TypeFileToSend !== 'PHOTO_CARD' ? (
    <>
      {!loading && TypeFileToSend !== 'PASSPORT' ? (
        <UploadFront   />
      ) : (
        <UploadPassport   />
      )}
      {frontPhotoDocument && !loading ? (
        <UploadBack   />
      ) : null}
    </>
  ) : (
    <View style={{width: '100%'}}>
      <DropDown
        label={'Select type of Document'}
        data={data2}
        name={'language'}
        errors={false}
        touched={false}
        placeholder={'Select type of Document'}
        value={TypeFileToSend}
        onSelect={onSelectType}
        placeholderTextColor={'#100'}
      />
    </View>
  );
};

export default Form2;

const styles = StyleSheet.create({});

const UploadFront = () => {
  const dispatch = useDispatch();

  const [fileUri, setFileUri] = useState('');

  const {frontPhotoDocument, loading} = useSelector(
    state => state.uploadPhotoSlice,
  );

  const deletePhoto = () => {
    dispatch(handleClearFrontPhotoDocument());
    dispatch(handleClearBackPhotoDocument());
  };
  const handleCam = () => {
    dispatch(handleCamera(true));
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
            onPress={handleCam}
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
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={addfrontphoto}
                  style={{
                    marginRight: 10,
                  }}
                />
                <View>
                  <Txt Bold={'700'}>Add front photo</Txt>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const UploadBack = () => {
  const dispatch = useDispatch();
  const {backPhotoDocument, loading} = useSelector(
    state => state.uploadPhotoSlice,
  );
  const deletePhoto = () => {
    dispatch(handleClearBackPhotoDocument());
  };
  const handleCam = () => {
    dispatch(handleCamera(true));
  };

  return (
    <>
      {loading ? (
        <SimpleSpiner />
      ) : (
        <View style={{alignItems: 'center'}}>
          <Space />
          <TouchableOpacity
            onPress={handleCam}
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
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={addfrontphoto}
                  style={{
                    marginRight: 10,
                  }}
                />
                <View>
                  <Txt Bold={'700'}>Add back photo</Txt>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const UploadPassport = () => {
  const dispatch = useDispatch();
  const {loading, passportDoc} = useSelector(state => state.uploadPhotoSlice);
  const deletePhoto = () => {
    dispatch(clearPassportDoc());
  };
  const handleCam = () => {
    dispatch(handleCamera(true));
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
            onPress={handleCam}
            style={{
              marginTop: 20,
              overflow: 'hidden',
              borderRadius: 24,

              justifyContent: 'center',
            }}>
            <Image source={ImageDashed} style={{}} />

            {passportDoc?.content ? (
              <>
                <DeleteButton onDelete={deletePhoto} />

                <Image
                  source={{uri: passportDoc?.content}}
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
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={addfrontphoto}
                  style={{
                    marginRight: 10,
                  }}
                />
                <View>
                  <Txt Bold={'700'}>add your passport </Txt>
                  <Txt Bold={'700'}>photo </Txt>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
