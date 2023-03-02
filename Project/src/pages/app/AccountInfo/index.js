import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Txt} from '../../../components/utils';
import {COLORS, SIZES} from '../../../theme';
import Line from '../../../components/views/line';
import AccoutBackground from '../../../Assets/Img/AccoutBackground.png';
import Return from '../../../Assets/Img/icon24ChevronLeftDefault.png';
import rectangleCopy3 from '../../../Assets/Img/ContactsUser.png';
import icon24ChevronRightDefault from '../../../Assets/Img/icon24ChevronRightDefault.png';
import Space from '../../../components/Space';
import HView from '../../../components/views/HView/HView';

import verified from '../../../Assets/Img/verified.png';
import {PaleGreyButton, WhiteButton} from '../../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../../redux/Features/authentification/Login/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const List = [
  {
    fullname: 'Bravo Bessa',
    Gender: 'Male',
    phoneNumber: '+44 7538 110953',
    Email: 'bravobessa@diaspora.com',
    verifed: 'Not verified.',
    Address: '91 Western Road, Brighton, East Sussex, England',
    proof: 'Upload now.',
    prood_address: 'Verified',
    url: require('../../../Assets/Img/im.png'),
  },
];

const AccountInfo = ({navigation}) => {
  const {informationsUser} = useSelector(state => state.userInformations);

  const dispatch = useDispatch();
  const clearAsyncStorage = async () => {
    dispatch(Logout());
    AsyncStorage.clear();
  };

 

  let info = informationsUser?.data?.walletAccountUser;
  return (
    <ScrollView style={styles.conatiner}>
      <ImageBackground
        style={styles.ImageBackground}
        source={AccoutBackground}
      />
      <Space space={40} />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={Return} style={{marginHorizontal: 20}} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        <View style={styles.box}>
          <View style={styles.imageContainer}>
            <Image source={rectangleCopy3} style={{
              borderRadius:16, overflow:"hidden"
            }} />
          </View>
          <Txt fontSize={24} color={COLORS.white} lineHeight={35}>
            {info?.firstName} {info?.lastName}
          </Txt>
          <Txt
            color={COLORS.white}
            fontSize={14}
            style={{opacity: 0.7}}
            //fontFamily="Poppins-SemiBold"
            Bold={'400'}
            lineHeight={28}>
            {info?.email}
          </Txt>
          <Txt
            color={COLORS.white}
            fontSize={14}
            style={{opacity: 0.7}}
            //fontFamily="Poppins-SemiBold"
            >
            {info?.mobileNumber}
          </Txt>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#FFF',
          width: '90%',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 8,
        }}>
        <Edit navigation={navigation} />
        <ListInformation info={info} />

        <Space space={20} />
        <PaleGreyButton>change password</PaleGreyButton>
        <WhiteButton onPress={clearAsyncStorage}>logout</WhiteButton>
      </View>
      <Space space={30} />
      {/* <Line width={'30%'} height={3} color={COLORS.lightNavy} /> */}
      {/* <Space space={6} /> */}
    </ScrollView>
  );
};

export default AccountInfo;

const Edit = ({navigation}) => {
  return (
    <View style={styles.containerRectangle}>
      <HView spaceBetween>
        <Txt>Personal Information</Txt>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditAccount');
          }}
          style={[styles.row, {alignItems: 'center'}]}>
          <Txt fontSize={12} color={COLORS.yellow}>
            Edit{' '}
          </Txt>
          <Image source={icon24ChevronRightDefault} />
        </TouchableOpacity>
      </HView>
    </View>
  );
};

const ListInformation = ({info}) => {
  // console.log('{info.address}', info.address);

  // console.log('typeof item ', typeof info.email);
  return (
    <View style={styles.conatinerList}>
      <View>
        <RenderItem
          item={`${info?.firstName} ${info?.lastName}`}
          title="Full name"
        />
        {/* <RenderItem item={item.Gender} title="Gender" /> */}
        <RenderItem item={info?.mobileNumber} title="Phone number" notVerifed />
        <RenderItem item={info?.email} title="Email" verifed />
        <RenderItem item={info?.address} title="Address" />
        {/* <RenderItem item={info.verifed} title="Proof of ID" /> */}
        {/* <RenderItem
          item={infoinfo.prood_address}
          title="Proof of address"
          line
          url={info.url}
          verifed
        /> */}
      </View>
    </View>
  );
};

const RenderItem = ({item, title, verifed, line, url, notVerifed}) => {
 
  return (
    <>
      <View
        style={[
          styles.row,
          {
            justifyContent: 'space-between',
            marginVertical: 10,
            overflow: 'hidden',
            flexDirection: 'row',
          },
        ]}>
        <View style={{width: title == 'Address' ? '30%' : 'auto'}}>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            {title}
          </Txt>
        </View>

        <View style={{width: '70%', alignItems: 'flex-end'}}>
          <HView>
            {verifed && (
              <Image
                source={verified}
                style={{height: 16, width: 16, marginRight: 6}}
              />
            )}
            {typeof item === 'object' ? (
              <>
                <Txt
                  style={{paddingRight: 0}}
                  fontSize={14}
                  lineHeight={20}
                  Bold={'500'}
                  color={COLORS.darkBlueGrey}>
                  {item.streetNumber} {" "}{item.streetName} ,{item.state}
                  ,{item.country},
                </Txt>
              </>
            ) : (
              <Txt numberOfLines={2} fontSize={14} color={COLORS.darkBlueGrey}>
                {item}
              </Txt>
            )}
          </HView>

          {notVerifed && (
            <HView>
              <Txt style={{textAlign: 'center'}} fontSize={12}>
                Not verified.{' '}
              </Txt>
              <Txt color={COLORS.yellow} fontSize={12}>
                Verify now.{' '}
              </Txt>
            </HView>
          )}
        </View>
      </View>
      {!line ? (
        <Line
          width={'80%'}
          color={COLORS.silverTwo}
          style={{paddingHorizontal: 15}}
          height={1}
        />
      ) : null}

      {url && <Image source={url} style={{width: '100%'}} />}
    </>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  conatinerList: {
    paddingHorizontal: 10,
  },
  containerRectangle: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 15,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    borderBottomEndRadius: 15,
    overflow: 'hidden',
    borderBottomStartRadius: 15,
    height: 380,
  },
  box: {
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 15,
    
  },
});
