import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
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
import { useNavigation } from '@react-navigation/native';

const ReviewOfInformation = () => {
const navigator = useNavigation()
  const onPress=()=>{
    navigator.goBack()
  }

  return (
    <ScreensLayout onPress={onPress}>
      <Space space={20} />
      <View style={{width: '100%', alignItems: 'center'}}>
        <Txt lineHeight={25} color={COLORS.TextBody}>
          We need to verify your information.
        </Txt>
        <Txt lineHeight={25} color={COLORS.TextBody}>
          {' '}
          Please submit these required
        </Txt>
        <Txt lineHeight={25} color={COLORS.TextBody}>
          information and documents bellow to proceed.
        </Txt>
      </View>
      <RenderListItems />
    </ScreensLayout>
  );
};

export default ReviewOfInformation;

const styles = StyleSheet.create({});

let data = [
  {
    name: 'personal infromation ',
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

const RenderListItems = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Space space={20} />
      {data.map((i, index) => {
        return (
          <TouchableOpacity
            key={index}
            disabled={i.isChecked ? true : false}
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
                  {i.image}
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View>
                    <Txt>{i.name}</Txt>
                  </View>

                  <View
                    style={{
                      backgroundColor:
                        i.status === 'Good'
                          ? COLORS.lightSage
                          : i.status === 'Verifying'
                          ? COLORS.offWhite
                          : i.status === 'Failed to verify'
                          ? COLORS.veryLightPink
                          : COLORS.finished,
                      paddingVertical: 2,
                      alignItems: 'center',
                      marginTop: 9,
                      borderRadius: 20,
                    }}>
                    <Txt
                      color={
                        i.status === 'Good'
                          ? COLORS.greenishTeal
                          : i.status === 'Verifying'
                          ? COLORS.orangeYellow
                          : i.status === 'Failed to verify'
                          ? COLORS.coral
                          : COLORS.silver
                      }
                      fontSize={12}>
                      {' '}
                      {i.status}
                    </Txt>
                  </View>
                </View>
              </View>

              <View>
                {i.isChecked == false ? (
                  <Image source={arrowLeft} />
                ) : (
                  <Image source={checkedIcon} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
