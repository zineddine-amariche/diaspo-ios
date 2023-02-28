import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {StatusBar} from 'react-native';
import {ImageBackground} from 'react-native';
import SecondaryHeader from '../../../../../components/Headers/root/SecondaryHeader';
import {COLORS, SIZES} from '../../../../../theme';
import ImgBack from '../../../../../Assets/Img/HomeBack.png';
import Space from '../../../../../components/Space';
import {Head, Txt} from '../../../../../components/utils';
import HView from '../../../../../components/views/HView/HView';
import icon24Info2 from '../../../../../Assets/Img/icon24Info2.png';

import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../components/Buttons';
import {useDispatch, useSelector} from 'react-redux';
import SimpleSpiner from '../../../../../components/spiner/SimpleSpiner';
import {getTontinesProjectInfo} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import {
  resetUpdateStatusParticipant,
  updateStatusParticipant,
} from '../../../../../redux/Features/Tontine/Participants/updateStatus/slice';
import {useIsFocused} from '@react-navigation/native';
import {resetInvitaions} from '../../../../../redux/Features/Notifications/Slice';
import moment from 'moment';

const InvitationTontine = ({navigation, route}) => {
  const {data, isBackground} = route.params;

  // console.log('data.data', data.data.projectId)
  const dispatch = useDispatch();
  const {user} = useSelector(state => ({
    ...state.auth,
  }));
  if (isBackground) {
    console.log('[FCM Data isBackground ]:', data);
    // console.log("[FCM Data] : projectId", data.data.projectId);
  } else {
    console.log('[FCM Data not isBackground ]:', data);
  }

  let object = {
    projectId: data.data.projectId,
    token: user.AccessToken,
  };

  useEffect(() => {
    if (data.data.projectId) {
      // console.log('egte-------------------------------',)
      dispatch(getTontinesProjectInfo(object));
    }
  }, [data.data.projectId, user.AccessToken]);

  // ParticipantInfo
  const {tontineProjectInfo, isLoading, message} = useSelector(state => ({
    ...state.tontines,
  }));

  // console.log("tontineProjectInfo", message);
  // console.log('message', message)

  // console.log('tontineProjectInf-------------------------------o', tontineProjectInfo)
  // const Accepte = ()=>{
  //   console.log('data', data?.data?.participantsId)
  // }

  const Accepte = () => {
    let objet = {
      participantId: data?.data?.participantsId,
      token: user.AccessToken,
      data: {
        status: 'ACCEPTED',
      },
    };

    dispatch(updateStatusParticipant(objet));
  };
  const {result, isError, isSuccess, Loading} = useSelector(state => ({
    ...state.statusParticipant,
  }));

  const Decliner = () => {
    let objet = {
      participantId: data?.data?.participantsId,
      token: user.AccessToken,
      data: {
        status: 'DECLINED',
      },
    };

    dispatch(updateStatusParticipant(objet));
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isSuccess === 'success' && isFocused) {
      console.log(' ----------- invitations  : Accepted :  ----------- ');

      navigation.navigate('Tontine');
      dispatch(resetUpdateStatusParticipant());
      dispatch(resetInvitaions());
    } else if (isError) {
      console.log('isError', isError);
    }
  }, [isLoading, isSuccess]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />

      <SecondaryHeader
        goBack={() => {
          navigation.goBack();
        }}
        title={`to join : ${tontineProjectInfo?.project?.name}`}
        Cancel="Return"
      />
      <Space space={20} />

      <ScrollView contentContainerStyle={{}}>
        <RedenerTontineDetails data={data} />
        <Space space={149} />
      </ScrollView>
      <CustomButtons Accepte={Accepte} Decliner={Decliner} />
    </SafeAreaView>
  );
};

export default InvitationTontine;

const RedenerTontineDetails = ({data, isBackground}) => {
  const {tontineProjectInfo, isLoading, message} = useSelector(state => ({
    ...state.tontines,
  }));
  const {Loading} = useSelector(state => ({
    ...state.statusParticipant,
  }));

  let obj = {
    beneficiaries: [
      {
        accountDetails: [Object],
        details: [Object],
        fundReceiveDate: 0,
        fundReceived: false,
        position: 1,
      },
      {
        accountDetails: [Object],
        details: [Object],
        fundReceiveDate: 0,
        fundReceived: false,
        position: 1,
      },
      {
        accountDetails: [Object],
        details: [Object],
        fundReceiveDate: 0,
        fundReceived: false,
        position: 2,
      },
    ],
    currentToReceive: {
      beneficiaryDetails: {
        accountDetails: [Object],
        details: [Object],
        fundReceiveDate: 0,
        fundReceived: false,
        position: 1,
      },
      originator: {
        originatorId: '63e104f69fd989d8e2aa4a7c',
        originatorType: 'User',
      },
      participantId: '63e1061bc005f58584061d43',
    },
    nextToReceived: {
      beneficiaryDetails: {
        accountDetails: [Object],
        details: [Object],
        fundReceiveDate: 0,
        fundReceived: false,
        position: 1,
      },
      originator: {
        originatorId: '63a742a235c78b71b6b438cf',
        originatorType: 'User',
      },
      participantId: '63e10f0fc1acd950f70f3542',
    },
    numberOfBeneficiaries: 2,
    numberOfPayers: 2,
    payers: [
      {
        accountDetails: [Object],
        details: [Object],
        penalty: [Object],
        thresholdOfTrust: [Object],
      },
      {
        accountDetails: [Object],
        details: [Object],
        penalty: [Object],
        thresholdOfTrust: [Object],
      },
      {
        accountDetails: [Object],
        details: [Object],
        penalty: [Object],
        thresholdOfTrust: [Object],
      },
    ],
    project: {
      accountId: '63e106171647859164a2a7d5',
      amount: 134,
      asAPayer: false,
      createdAt: '2023-02-06 13:52:24',
      currency: 'EUR',
      endAt: 1705482199,
      frequencyOfPayment: 'YEARLY',
      listOfBeneficiaries: [
        '63a742a235c78b71b6b438cf',
        '63e10a4f0f260374fdc9668b',
      ],
      listOfMembers: [],
      listOfParticipants: [
        '63a742a235c78b71b6b438cf',
        '63e10a4f0f260374fdc9668b',
      ],
      listOfPayers: ['63a742a235c78b71b6b438cf', '63e10a4f0f260374fdc9668b'],
      name: 'First 🥇',
      organizations: ['5efdebe5064e66483d893e4a'],
      originator: {
        originatorId: '63e104f69fd989d8e2aa4a7c',
        originatorType: 'User',
      },
      projectId: '63e10618c005f58584061d42',
      retentionRate: '0',
      startAt: 1675691517,
      status: 'IN PROGRESS',
      type: 'TONTINE_ORDINARY_TONTINE',
      updatedAt: '2023-02-06 13:52:24',
    },
  };

  return (
    <>
      {isLoading || Loading ? (
        <SimpleSpiner />
      ) : (
        <View style={{paddingHorizontal: 20}}>
          <Head color={COLORS.darkBlueGrey}>
            You has been invited to join “{tontineProjectInfo?.project?.name}”
            as a{' '}
            {tontineProjectInfo?.project?.asAPayer === 'true'
              ? 'Payer'
              : 'Participant'}
          </Head>
          <Space />
          <Txt fontSize={12} color={COLORS.darkSkyBlue}>
            {data?.sentTime
              ? moment(data?.sentTime, 'YYYYMMDD').fromNow()
              : '11:30 am - Yesterday'}
          </Txt>
          <Space space={20} />
          <Txt fontSize={14} color={COLORS.slateGrey}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam.
          </Txt>
          <Space space={20} />
          <View
            style={{
              backgroundColor: COLORS.white,
              width: '100%',
              borderRadius: 8,
              elevation: 0.2,
              padding: 20,
            }}>
            <Txt
              color={COLORS.blueGreen}
              fontSize={17}
              //fontFamily={'Muli-ExtraBold'}
              Bold="700">
              Tontine Details
            </Txt>

            <Space />
            {/* <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Tontine ID</Txt>
              <Txt fontSize={14} color={COLORS.darkBlueGrey}>
                {tontineProjectInfo?.project?.accountId}
              </Txt>
            </HView> */}
            <Space />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Status</Txt>
              <View
                style={{
                  backgroundColor: COLORS.offWhite,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 20,
                }}>
                <Txt
                  color={COLORS.orangeYellow}
                  style={{textTransform: 'uppercase'}}
                  fontSize={14}>
                  {tontineProjectInfo?.project?.status}
                </Txt>
              </View>
            </HView>
            <Space />

            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Created time</Txt>
              <Txt color={COLORS.darkBlueGrey}>
                {' '}
                {moment(tontineProjectInfo?.project?.createdAt).format('lll')}
              </Txt>
            </HView>
            <Space />

            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Created by</Txt>
              <HView>
                <Image source={icon24Info2} style={{marginRight: 6}} />
                <Txt color={COLORS.darkBlueGrey}>
                  {tontineProjectInfo?.payers[0]?.details?.firstName}{' '}
                  {tontineProjectInfo?.payers[0]?.details?.lastName}
                </Txt>
              </HView>
            </HView>

            <Space />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Amount per person</Txt>
              <Txt color={COLORS.darkBlueGrey}>
                {tontineProjectInfo?.project?.amount} euro
              </Txt>
            </HView>

            <Space />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Retention rate</Txt>
              <Txt color={COLORS.darkBlueGrey}>
                {tontineProjectInfo?.project?.retentionRate} %
              </Txt>
            </HView>
            <Space />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Frequency of payment</Txt>
              <Txt color={COLORS.darkBlueGrey}>
                {tontineProjectInfo?.project?.frequencyOfPayment}
              </Txt>
            </HView>
            <Space space={20} />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.silverTwo,
                alignSelf: 'center',
              }}></View>
            <Space space={20} />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Invited as</Txt>
              <Txt color={COLORS.darkBlueGrey}>
                {' '}
                {tontineProjectInfo?.project?.asAPayer === 'true'
                  ? 'Payer'
                  : 'Participant'}
              </Txt>
            </HView>

            <Space />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Payers</Txt>
              <Txt color={COLORS.darkBlueGrey}>
                {tontineProjectInfo?.numberOfPayers}{' '}
                {tontineProjectInfo?.numberOfPayers == 1 ? 'payer' : 'payers'}
              </Txt>
            </HView>

            {/* <HView spaceBetween>
              <Txt color={COLORS.coolGrey}></Txt>
              <Txt color={COLORS.darkBlueGrey}>
                8 accepted, 3 denied, 3 awaiting
              </Txt>
            </HView> */}

            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}></Txt>
              <Txt color={COLORS.orangeYellow}>View payer list</Txt>
            </HView>
            <Space space={20} />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Beneficiaries</Txt>
              <Txt color={COLORS.darkBlueGrey}>
                {tontineProjectInfo?.numberOfBeneficiaries} beneficiaries
                {tontineProjectInfo?.numberOfBeneficiaries == 1
                  ? 'beneficiarie'
                  : 'beneficiaries'}
              </Txt>
            </HView>

            {/* <HView spaceBetween>
              <Txt color={COLORS.coolGrey}></Txt>
              <Txt color={COLORS.darkBlueGrey}>
                11 accepted, 1 denied, 2 awaiting
              </Txt>
            </HView> */}

            {/* <HView spaceBetween>
              <Txt color={COLORS.coolGrey}></Txt>
              <Txt color={COLORS.orangeYellow}>View beneficiary list</Txt>
            </HView> */}
          </View>
          <Space space={20} />
          <HView style={{alignSelf: 'center'}}>
            <Image source={icon24Info2} style={{marginRight: 6}} />
            <Txt>Policies and instructions</Txt>
          </HView>
        </View>
      )}
    </>
  );
};

const CustomButtons = ({Accepte, Decliner}) => {
  const {isLoading} = useSelector(state => ({
    ...state.tontines,
  }));

  const {Loading} = useSelector(state => ({
    ...state.statusParticipant,
  }));

  return Loading || isLoading ? null : (
    <View
      style={{
        backgroundColor: COLORS.white,
        height: 110,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <PaleGreyButton
        width={'48%'}
        disabled={false}
        onPress={Decliner}
        loading={Loading}>
        decline
      </PaleGreyButton>

      <PrimaryButtonLinear
        width={'48%'}
        disabled={true}
        onPress={Accepte}
        loading={Loading}>
        accept
      </PrimaryButtonLinear>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: 'center',
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    borderBottomEndRadius: 15,
    overflow: 'hidden',
    borderBottomStartRadius: 15,
    height: 110,
  },
});
