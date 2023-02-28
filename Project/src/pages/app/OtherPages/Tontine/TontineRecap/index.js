import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
  PrimaryButton,
  PrimaryButtonLinear,
} from '../../../../../components/Buttons';
import impmodel from '../../../../../Assets/Img/illus2.png';

import {useRef} from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import PasswordModal from './BottomSheetPassword';
import CreatedSuccess from '../../../../../components/views/Layouts/AuthLayout/Model';
import {
  deleteSelectedList,
  resetBeneficaire,
} from '../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare';
import {useDispatch, useSelector} from 'react-redux';
import {getSpecificParticipant} from '../../../../../redux/Features/Tontine/Participants/getSpecificParticipant/slice';
import {getTontinesProjectInfo} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import moment from 'moment';

import imgInfo from '../../../../../Assets/Img/icon24Info2.png';

const TontineRecap = ({navigation, route}) => {
  const durationMs = 350;
  const {projectId, title, routeData, confirmbtn} = route.params;

  // console.log("projectId", projectId);
  // console.log("title", title);
  // console.log("routeData", routeData);
  const dispatch = useDispatch();
  const bottomSheetModalRef4 = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  let object = {
    projectId,
    token: user.AccessToken,
  };

  useEffect(() => {
    dispatch(getTontinesProjectInfo(object));
  }, []);

  const {tontineProjectInfo, isError, isSuccess, isLoading, message} =
    useSelector(state => ({
      ...state.tontines,
    }));

  // console.log(
  //   'tontineProjectInfo',
  //   tontineProjectInfo.currentToReceive.beneficiaryDetails.details.firstName,
  // );

  const openDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handlePresentModalPress4 = useCallback(() => {
    bottomSheetModalRef4.current?.present();
    openDrawer();
  }, []);

  const closeDrawer = useCallback(() => {
    bottomSheetModalRef4.current?.close();
    setOpen(false);
  }, []);

  const [success, setsuccess] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
    navToTontine();
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const navToTontine = () => {
    navigation.navigate('Tontine');

    // setTimeout(
    //   () => dispatch(resetBeneficaire(),
    //    dispatch(deleteSelectedList())),
    //   durationMs
    // );
  };

  let TextIn =
    tontineProjectInfo?.project?.status === 'ACTIVATED'
      ? 'Activated'
      : tontineProjectInfo?.project?.status === 'IN PROGRESS'
      ? 'Pending'
      : tontineProjectInfo?.project?.status === 'CANCELLED'
      ? 'Cancelled'
      : 'Finished';

  let iObj = {
    projectId: tontineProjectInfo?.project?.projectId,
    token: user.AccessToken,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ImageBackground style={styles.ImageBackground} source={ImgBack} />

      <SecondaryHeader
        goBack={() => {
          navigation.navigate('Tontine', {
            routeData,
            projectId: tontineProjectInfo?.project?.projectId,
            isFirstTime: false,
            object: iObj,
          });
          // console.log('first', tontineProjectInfo?.project?.projectId)
        }}
        title={'Tontine Recap'}
        Cancel="Return"
      />
      <Space space={20} />

      <ScrollView contentContainerStyle={{}}>
        <View style={{padding: 20}}>
          <Head color={COLORS.darkBlueGrey}>
            You has been invited to join “{tontineProjectInfo?.project?.name}”
            as a{' '}
            {tontineProjectInfo?.project?.asAPayer === 'true'
              ? 'Payer'
              : 'Participant'}
          </Head>
          <Space />
          <Txt fontSize={12} color={COLORS.darkSkyBlue}>
            {tontineProjectInfo?.project?.createdAt}
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
            //  fontFamily={'Muli-ExtraBold'}
              Bold="700">
              Tontine Details
            </Txt>

            <Space />
            {/* <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Tontine ID</Txt>
              <Txt fontSize={14} color={COLORS.darkBlueGrey}> {tontineProjectInfo?.project?.accountId}</Txt>
            </HView> */}
            <Space />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Status</Txt>
              <View
                style={{
                  backgroundColor: COLORS.offWhite,
                  paddingVertical: 4,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                }}>
                <Txt color={COLORS.orangeYellow}>{TextIn}</Txt>
              </View>
            </HView>
            <Space />

            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Created time</Txt>
              <Txt fontSize={14} color={COLORS.darkBlueGrey}>
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
                {tontineProjectInfo?.project?.retentionRate}%
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

            {/* <HView spaceBetween>
              <Txt color={COLORS.coolGrey}></Txt>
               <Txt color={COLORS.orangeYellow}>View payer list</Txt> 
            </HView> */}
            <Space space={10} />
            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}>Beneficiaries</Txt>
              <Txt color={COLORS.darkBlueGrey}>
                {tontineProjectInfo?.numberOfBeneficiaries}{' '}
                {tontineProjectInfo?.numberOfBeneficiaries == 1
                  ? 'beneficiarie'
                  : 'beneficiaries'}
              </Txt>
            </HView>


            <Space space={10} />

            <HView spaceBetween>
              <Txt fontSize={14} color={COLORS.coolGrey}>
                Current to recieve 
              </Txt>
              <TouchableOpacity onPress={onSuccess}>
                <HView>
                  <Image
                    source={imgInfo}
                    style={{
                      marginRight: 10,
                    }}
                  />
                  <Txt
                    fontSize={14}
                    color={COLORS.darkBlueGrey}
                    lineHeight={20}>
                    {
                      tontineProjectInfo?.currentToReceive?.beneficiaryDetails
                        ?.details?.firstName
                    }{' '}
                    {
                      tontineProjectInfo?.currentToReceive?.beneficiaryDetails
                        ?.details?.lastName
                    }
                  </Txt>
                </HView>
              </TouchableOpacity>
            </HView>
            <Space space={10} />

            <HView spaceBetween>
              <Txt fontSize={14} color={COLORS.coolGrey}>
                Next beneficiary
              </Txt>
              <TouchableOpacity onPress={onSuccess}>
                <HView>
                  <Image
                    source={imgInfo}
                    style={{
                      marginRight: 10,
                    }}
                  />
                  <Txt
                    fontSize={14}
                    color={COLORS.darkBlueGrey}
                    lineHeight={20}>
                    {
                      tontineProjectInfo?.nextToReceived?.beneficiaryDetails
                        ?.details?.firstName
                    }{' '}
                    {
                      tontineProjectInfo?.nextToReceived?.beneficiaryDetails
                        ?.details?.lastName
                    }
                  </Txt>
                </HView>
              </TouchableOpacity>
            </HView>

            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}></Txt>
              {/* <Txt color={COLORS.darkBlueGrey}>
                11 accepted, 1 denied, 2 awaiting
              </Txt> */}
            </HView>

            <HView spaceBetween>
              <Txt color={COLORS.coolGrey}></Txt>
              {/* <Txt color={COLORS.orangeYellow}>View beneficiary list</Txt> */}
            </HView>
          </View>
        </View>
        <HView style={{alignSelf: 'center'}}>
          <Image source={icon24Info2} style={{marginRight: 6}} />
          <Txt>Policies and instructions</Txt>
        </HView>
        <Space space={149} />
      </ScrollView>
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
        <PrimaryButtonLinear
          width={'100%'}
          disabled={true}
          onPress={() => {
            // handlePresentModalPress4();
            onSuccess();
          }}>
          Confirm
        </PrimaryButtonLinear>
      </View>
      <PasswordModal
        bottomSheetModalRef={bottomSheetModalRef4}
        closeDrawer={closeDrawer}
        onSuccess={onSuccess}
      />

      <CreatedSuccess Visible={success} onDissmis={onDissmis} padding={1}>
        {BodyModel ? (
          <BodyModel onDissmis={onDissmis} navToTontine={navToTontine} />
        ) : null}
      </CreatedSuccess>
    </SafeAreaView>
  );
};

export default TontineRecap;

const BodyModel = ({onDissmis, navToTontine}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        {/* <Image source={illusphone} style={{ width: "100%" }} /> */}

        <Image source={impmodel} style={{width: '100%'}} />
        <Space space={20} />
        <Head
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            //fontFamily: 'Poppins-SemiBold',
          }}>
          Your invitation has been sent to selected payers and beneficiaries
        </Head>

        <Space space={10} />
        <View style={{paddingHorizontal: 20, width: '100%'}}>
          <Txt style={{textAlign: 'center'}}>
            Now we are waiting for acceptance from all payers and beneficiaries
            before creating this tontine.
          </Txt>
          <Space space={10} />

          <PaleGreyButton
            width={'100%'}
            onPress={() => {
              onDissmis();
              navToTontine();
            }}>
            back to tontine listing
          </PaleGreyButton>
        </View>
        <Space space={20} />
      </View>
    </>
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
