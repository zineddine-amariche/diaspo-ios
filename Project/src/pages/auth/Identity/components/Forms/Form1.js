import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Txt} from '../../../../../components/utils';
import ImageSelfied from '../../../../../Assets/Kyc/GroupUser.png';

import {COLORS} from '../../../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import DeleteButton from '../../../../../components/Buttons/deleteButton';
import {handleClearSelfiePhotoObject} from '../../../../../redux/Features/kyc/identityVerefication/slice';

const Form1 = () => {
  const {selfiePhotoObject} = useSelector(state => state.uploadPhotoSlice);
  const dispatch = useDispatch();
  const deletePhoto = () => {
    dispatch(handleClearSelfiePhotoObject());
  };
  return (
    <View style={{alignItems: 'center'}}>
      <View style={{padding: 20}}>
        <Txt
          color={COLORS.TextBody}
          fontSize={16}
          style={{lineHeight: 24, textAlign: 'center'}}
          // fontFamily={'Oxygen-Regular'}
          >
          Please upload a selfie of you with a neutral expression and make sure
          your whole face is visible, centred, and your eyes are open.
        </Txt>
      </View>
      <View style={{marginTop: 10}}>
        {selfiePhotoObject?.content ? (
          <View style={{position: 'relative'}}>
            <DeleteButton onDelete={deletePhoto} />
            <Image
              source={{uri: selfiePhotoObject?.content}}
              style={{height: 345, width: 260, borderRadius: 8}}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Image source={ImageSelfied} />
        )}
      </View>
    </View>
  );
};

export default Form1;

const styles = StyleSheet.create({});
