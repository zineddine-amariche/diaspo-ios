import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ScreensLayout from '../../../../components/views/Layouts/AppLayout/ScreenLayout/screenLayout';
import {Txt} from '../../../../components/utils';
import Space from '../../../../components/Space';
import {COLORS} from '../../../../theme';

import icon1 from '../../../../Assets/Img/contact.png';
import icon4 from '../../../../Assets/Img/location-tick.png';
import icon3 from '../../../../Assets/Img/personalcard.png';
import icon2 from '../../../../Assets/Img/user-square.png';

import checkedIcon from '../../../../Assets/Img/tick-square.png';
import arrowLeft from '../../../../Assets/Img/chevron_left.png';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {requestReviewInfomations} from '../../../../redux/Features/authentification/ReviewInformations/slice';
import {useDispatch, useSelector} from 'react-redux';
import {onExpiredToken} from '../../../../hooks';

const ReviewOfInformation = ({route}) => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const data = route.params;
  // console.log('alpha', data.data.userId)

  const onPress = () => {
    navigator.goBack();
  };

  const onErrorAction = () => {
    onExpiredToken(navigator, dispatch);
  };
  const onSuccesAction = () => {};

  let obj = {
    onSuccesAction,
    userId: data.data.userId,
    onErrorAction,
  };

  useEffect(() => {
    if (data.data.userId) {
      dispatch(requestReviewInfomations(obj));
    }
  }, [data.data.userId]);

  const {isLoading, result} = useSelector(state => state.reviewInfomations);

  return (
    <ScreensLayout
      Loading={isLoading}
      onPress={onPress}
      existData={result?.Documents.length == 0 ? false : true}>
      <Space space={20} />
      <View style={{width: '100%', alignItems: 'center'}}>
        <Txt lineHeight={25} color={COLORS.TextBody}>
          Your documents are under verification.
        </Txt>
        {/* <Txt lineHeight={25} color={COLORS.TextBody}>
          {' '}
          Please submit these required
        </Txt>
        <Txt lineHeight={25} color={COLORS.TextBody}>
          information and documents bellow to proceed.
        </Txt> */}
      </View>

      <RenderListItems result={result?.Documents} />
    </ScreensLayout>
  );
};

export default ReviewOfInformation;

const styles = StyleSheet.create({});

let data = [
  {
    name: 'Personal infromation ',
    status: 'Good',
    image: <Image source={icon1} />,
    isChecked: true,
  },
  {
    name: 'Take a selfie',
    status: 'Verifying',
    image: <Image source={icon2} />,
    isChecked: false,
  },
  {
    name: 'Upload your ID',
    status: 'Failed to verify',
    image: <Image source={icon3} />,
    isChecked: false,
  },
  {
    name: 'Proof of address ',
    status: 'Good',
    image: <Image source={icon4} />,
    isChecked: true,
  },
];

const RenderListItems = ({result}) => {
  const navigator = useNavigation();

  const firstFour = result?.slice(0, 4);

  const Views = () => {
    return firstFour?.map((i, index) => {
      const linkContent = data[index];

      return (
        <TouchableOpacity
          onPress={() => {
            if (i.status == 'FAILED') {
              navigator.navigate('KycForm');
            }
          }}
          key={index}
          disabled={i.status == 'FAILED' ? false : true}
          style={{
            backgroundColor: COLORS.white,
            width: '90%',
            marginTop: 10,
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  marginRight: 10,
                  backgroundColor: COLORS.blueIcon,
                  padding: 10,
                  borderRadius: 8,
                }}>
                {linkContent?.image}
              </View>
              <View style={{flexDirection: 'column'}}>
                <View>
                  <Txt Bold={'700'} color={COLORS.BlackModal}>
                    {linkContent?.name}
                  </Txt>
                </View>

                <View
                  style={{
                    backgroundColor:
                      i.status === 'VALIDATED'
                        ? COLORS.lightSage
                        : i.status === 'PENDING_REVIEW'
                        ? COLORS.darkSkyBlue02
                        : i.status === 'FAILED'
                        ? COLORS.veryLightPink
                        : COLORS.finished,
                    paddingVertical: 2,
                    alignItems: 'center',
                    marginTop: 9,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                  }}>
                  <Txt
                    color={
                      i.status === 'VALIDATED'
                        ? COLORS.greenishTeal
                        : i.status === 'PENDING_REVIEW'
                        ? COLORS.darkSkyBlue
                        : i.status === 'FAILED'
                        ? COLORS.coral
                        : COLORS.silver
                    }
                    fontSize={12}>
                    {i.status == 'PENDING_REVIEW'
                      ? 'Verifying'
                      : i.status == 'FAILED'
                      ? 'Failed to verify'
                      : i.status == 'VALIDATED'
                      ? 'Good'
                      : ''}
                  </Txt>
                </View>
              </View>
            </View>

            <View>
              {i.status == 'FAILED' ? <Image source={arrowLeft} /> : null}
              {i.status == 'VALIDATED' ? <Image source={checkedIcon} /> : null}
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  // console.log('merger', merger)
  return (
    <View style={{alignItems: 'center'}}>
      <Space space={20} />
      <Views />
    </View>
  );
};
