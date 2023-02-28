import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import Line from '../../../../../components/views/line';
import ImgBack from '../../../../../Assets/Img/HomeBack.png';
import SecondaryHeader from '../../../../../components/Headers/root/SecondaryHeader';
import {COLORS, SIZES} from '../../../../../theme';
import DetailsTontine from './components/DetailsTontine/DetailsTontine';
import ActivityDetails from './components/ActivityDetails/ActivityDetails';
import {
  PaleGreyButton,
  PrimaryButton,
  PrimaryButtonLinear,
} from '../../../../../components/Buttons';
import BottomInfo from './BottomSheetInfo';
import {useRef} from 'react';
import {useCallback} from 'react';
import {getSpecificParticipant} from '../../../../../redux/Features/Tontine/Participants/getSpecificParticipant/slice';
import {useDispatch, useSelector} from 'react-redux';
import {
  createTypeParticipants,
  resetSuccesParticipants,
} from '../../../../../redux/Features/Tontine/Participants/create/slice';
import {Head, Txt} from '../../../../../components/utils';
import Space from '../../../../../components/Space';
import HView from '../../../../../components/views/HView/HView';
import CreatedSuccess from '../../../../../components/views/Layouts/AuthLayout/Model';
import {updateTontine} from '../../../../../redux/Features/Tontine/Participants/updateTontine/slice';
import BottomSheetSelect from './BottomSheetSelect';
import {getTontinesProjectInfo} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import Spiner from '../../../../../components/spiner';
import {useIsFocused} from '@react-navigation/native';
// import { Toast, durations } from 'react-native-toast-message'
const InfoScreenTontine = ({navigation, route}) => {
  const {consult, object, isFirstTime} = route.params;

  const {tontineProjectInfo, isError, isSuccess, isLoading, message} =
    useSelector(state => ({
      ...state.tontines,
    }));

  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef(null);

  const [success, setsuccess] = useState(false);

  const onSuccess = useCallback(() => {
    dispatch(getSpecificParticipant(tontineProjectInfo?.project?.projectId));
    setsuccess(true);
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current.close();
  }, []);

  //  console.log("routeData---", routeData);

  // Add models

  const [success2, setsuccess2] = useState(false);
  const [success3, setsuccess3] = useState(false);

  const startWithparticipants = () => {
    setsuccess2(true);
  };
  const cancelTontin = () => {
    setsuccess3(true);
  };

  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  const navToTontine = () => {
    // navigation.navigate("Tontine");
    // setTimeout(
    //   () => dispatch(resetBeneficaire(), dispatch(deleteSelectedList())),
    //   durationMs
    // );

    let obje = {
      projectId: tontineProjectInfo?.project?.projectId,
      token: user.AccessToken,
      data: {
        status: 'ACTIVATED',
      },
    };

    dispatch(updateTontine(obje));
    setTimeout(() => {
      navigation.navigate('Tontine');
    }, 1000);
  };

  const cancellTontine = () => {
    // navigation.navigate("Tontine");
    // setTimeout(
    //   () => dispatch(resetBeneficaire(), dispatch(deleteSelectedList())),
    //   durationMs
    // );

    let object = {
      projectId: tontineProjectInfo?.project?.projectId,
      token: user.AccessToken,
      data: {
        status: 'CANCELLED',
      },
    };
    // console.log('object', object)
    dispatch(updateTontine(object));
    setTimeout(() => {
      navigation.navigate('Tontine');
    }, 1000);
  };
  const bottomSheetModalRef2 = useRef(null);

  const closeSelect = useCallback(() => {
    bottomSheetModalRef2.current?.close();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  // console.log('routeData?.project?.name', routeData?.status)

  // console.log('routeData?.project?.projectId', routeData?.project?.projectId);

  // console.log('tontineProjectInfo', tontineProjectInfo);

  let colorText =
    tontineProjectInfo?.project?.status === 'ACTIVATED'
      ? COLORS.greenishTeal
      : tontineProjectInfo?.project?.status === 'IN PROGRESS'
      ? COLORS.orangeYellow
      : tontineProjectInfo?.project?.status === 'CANCELLED'
      ? COLORS.coral
      : COLORS.silver;

  let BackgroundColorText =
    tontineProjectInfo?.project?.status === 'ACTIVATED'
      ? COLORS.lightSage
      : tontineProjectInfo?.project?.status === 'IN PROGRESS'
      ? COLORS.offWhite
      : tontineProjectInfo?.project?.status === 'CANCELLED'
      ? COLORS.veryLightPink
      : COLORS.finished;

  let TextIn =
    tontineProjectInfo?.project?.status === 'ACTIVATED'
      ? 'Activated'
      : tontineProjectInfo?.project?.status === 'IN PROGRESS'
      ? 'Pending'
      : tontineProjectInfo?.project?.status === 'CANCELLED'
      ? 'Cancelled'
      : 'Finished';

  // console.log(
  //   'routeData?.listOfParticipants?.length',
  //   routeData?.listOfParticipants?.length,
  // );
  // console.log(
  //   'routeData?.project?.listOfParticipants?.length ',
  //   routeData?.project,
  // );
  // console.log('isFirstTime', isFirstTime)

  const isFocused = useIsFocused();

  // console.log('isFocused', isFocused)
  // console.log('object', object)

  // console.log('tontineProjectInfo', tontineProjectInfo.project)
  useEffect(() => {
    if (object) {
      dispatch(getTontinesProjectInfo(object));
    }
  }, [object, isFirstTime, isFocused]);

  const Activity = () => {
    if (tontineProjectInfo?.project?.asAPayer) {
      if (tontineProjectInfo?.numberOfPayers > 1) {
        return (
          <ActivityDetails
            navigation={navigation}
            onSuccess={onSuccess}
            closeModal={closeModal}
            bottomSheetModalRef={bottomSheetModalRef}
            projectId={tontineProjectInfo?.project?.projectId}
            routeData={tontineProjectInfo}
            consult={consult}
            isFirstTime={isFirstTime}
            startWithparticipants={startWithparticipants}
            cancelTontin={cancelTontin}
          />
        );
      } else {
        null;
      }
    } else {
      if (tontineProjectInfo?.numberOfPayers > 0) {
        return (
          <ActivityDetails
            navigation={navigation}
            onSuccess={onSuccess}
            closeModal={closeModal}
            bottomSheetModalRef={bottomSheetModalRef}
            projectId={tontineProjectInfo?.project?.projectId}
            routeData={tontineProjectInfo}
            consult={consult}
            isFirstTime={isFirstTime}
            startWithparticipants={startWithparticipants}
            cancelTontin={cancelTontin}
          />
        );
      } else {
        null;
      }
    }
  };

  const ActivityButton = () => {
    if (tontineProjectInfo.project.asAPayer) {
      if (tontineProjectInfo?.numberOfPayers > 1) {
        null;
      } else {
        return (
          <CreateParticipantsButton
            navigation={navigation}
            routeData={tontineProjectInfo}
            handlePresentModalPress={handlePresentModalPress}
            projectId={tontineProjectInfo?.project?.projectId}
            // isNewTontine={tontineProjectInfo?.project ? true : false}
          />
        );
      }
    } else {
      if (tontineProjectInfo?.numberOfPayers > 0) {
        null;
      } else {
        return (
          <CreateParticipantsButton
            navigation={navigation}
            routeData={tontineProjectInfo}
            handlePresentModalPress={handlePresentModalPress}
            projectId={tontineProjectInfo?.project?.projectId}
            // isNewTontine={tontineProjectInfo?.project ? true : false}
          />
        );
      }
    }
  };

  return isLoading ? (
    <>
      <Spiner />
    </>
  ) : (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Image
          style={styles.ImageBackground}
          source={ImgBack}
          resizeMode="stretch"
        />
        <SecondaryHeader
          goBack={() => {
            navigation.navigate('Tontine');
            dispatch(resetSuccesParticipants());
          }}
          title={tontineProjectInfo?.project?.name}
          sousTontine={tontineProjectInfo?.project?.status}
          Cancel="Return"
          colorText={colorText}
          TextIn={TextIn}
          BackgroundColorText={BackgroundColorText}
        />

        <>
          <ScrollView
            contentContainerStyle={{width: SIZES.width}}
            showsVerticalScrollIndicator={false}>
            <View>
              <DetailsTontine
                tontineProjectInfo={tontineProjectInfo}
                onSuccess={onSuccess}
                closeModal={closeModal}
                isFirstTime={isFirstTime}
                projectId={tontineProjectInfo?.project?.projectId}
                bottomSheetModalRef={bottomSheetModalRef}
                TextIn={TextIn}
              />

              {/* {tontineProjectInfo?.numberOfPayers ==
              0 && !tontineProjectInfo.project.asAPayer ? null : (
                <ActivityDetails
                  navigation={navigation}
                  onSuccess={onSuccess}
                  closeModal={closeModal}
                  bottomSheetModalRef={bottomSheetModalRef}
                  projectId={tontineProjectInfo?.project?.projectId}
                  routeData={tontineProjectInfo}
                  consult={consult}
                  isFirstTime={isFirstTime}
                  startWithparticipants={startWithparticipants}
                  cancelTontin={cancelTontin}
                />
              )} */}

              <Activity />
            </View>
          </ScrollView>
          {/* <TransactionHistory navigation={navigation} /> */}

          {/* <CreateParticipantsButton
            navigation={navigation}
            routeData={tontineProjectInfo}
            handlePresentModalPress={handlePresentModalPress}
            projectId={tontineProjectInfo?.project?.projectId}
            // isNewTontine={tontineProjectInfo?.project ? true : false}
          /> */}
          <ActivityButton />
        </>

        <BottomInfo
          bottomSheetModalRef={bottomSheetModalRef}
          onSuccess={onSuccess}
          closeModal={closeModal}
        />

        <CreatedSuccess
          Visible={success3}
          onDissmis={() => setsuccess2(false)}
          padding={1}>
          {BodyModel2 ? (
            <BodyModel2
              onDissmis={() => setsuccess3(false)}
              navToTontine={cancellTontine}
            />
          ) : null}
        </CreatedSuccess>

        <CreatedSuccess
          Visible={success2}
          onDissmis={() => setsuccess3(false)}
          padding={1}>
          {BodyModel3 ? (
            <BodyModel3
              onDissmis={() => setsuccess2(false)}
              navToTontine={navToTontine}
            />
          ) : null}
        </CreatedSuccess>

        <BottomSheetSelect
          projectId={tontineProjectInfo?.project?.projectId}
          closeSelect={closeSelect}
          bottomSheetModalRef={bottomSheetModalRef2}
          navigation={navigation}
          tontineProjectInfo={tontineProjectInfo}
        />
      </SafeAreaView>
    </>
  );
};
export default InfoScreenTontine;

const BodyModel2 = ({onDissmis, navToTontine}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Space />

        <Head
          //  fontFamily={'Poppins-Bold'}
          style={{paddingHorizontal: 20, textAlign: 'center'}}>
          Cancel this Tontine ?
        </Head>
        <Space />

        <View style={{paddingHorizontal: 20, textAlign: 'center'}}>
          <Txt fontSize={14} color={COLORS.slateGrey}>
            Are you sur to cancel this tontine
          </Txt>
        </View>
        <Space />
        <HView spaceBetween>
          <PaleGreyButton
            onPress={() => {
              onDissmis();
            }}
            width={'48%'}>
            NO
          </PaleGreyButton>
          <PrimaryButtonLinear
            disabled={true}
            onPress={() => {
              onDissmis();
              navToTontine();
            }}
            width={'48%'}>
            YES
          </PrimaryButtonLinear>
        </HView>
      </View>
    </>
  );
};
const BodyModel3 = ({onDissmis, navToTontine}) => {
  return (
    <View style={styles.ModelContainer}>
      <Space />

      <Head
        //  fontFamily={'Poppins-Bold'}
        style={{paddingHorizontal: 20, textAlign: 'center'}}>
        Start with particial list
      </Head>
      <Space />

      <View style={{paddingHorizontal: 20, textAlign: 'center'}}>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          Please confir to start the tontine with the partial of accepted payers
          and beneficiaries, You will need to wait for these payers and
          beneficiaries to accept this change before starting the tontine anyway
        </Txt>
      </View>
      <Space />
      <HView spaceBetween>
        <PaleGreyButton
          onPress={() => {
            onDissmis();
          }}
          width={'48%'}>
          Cancel
        </PaleGreyButton>
        <PrimaryButtonLinear
          disabled={true}
          onPress={() => {
            onDissmis();
            navToTontine();
          }}
          width={'48%'}>
          CONFIRM
        </PrimaryButtonLinear>
      </HView>
    </View>
  );
};

const TransactionHistory = ({navigation}) => {
  return (
    <View style={styles.buttonsConatiner}>
      <PrimaryButton
        onPress={() => {
          navigation.navigate('TransactionHistory');
        }}>
        View Transaction History
      </PrimaryButton>
      <Line color={COLORS.black} />
    </View>
  );
};

const CreateParticipantsButton = ({
  routeData,
  navigation,
  handlePresentModalPress,
  projectId,
}) => {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);

  // console.log('first', first)
  // console.log('projectId---', projectId);
  // console.log('routeData', routeData);

  return (
    <View style={styles.buttonsConatiner}>
      <PrimaryButton
        onPress={() => {
          if (routeData?.project?.type === 'TONTINE_ORDINARY_TONTINE') {
            setloading(true);
            dispatch(createTypeParticipants('TONTINE_ORDINARY_TONTINE'));
            setTimeout(() => {
              navigation.navigate('Béneféciare', {
                projectId,
                type: 'PAYER_AND_BENEFICIARY',
                routeData,
                title: 'Select participants',
              });
              setloading(false);
            }, 1000);
          } else if (routeData?.project?.type === 'TONTINE_CUSTOM_TONTINE') {
            setloading(true);
            handlePresentModalPress();
            setTimeout(() => {
              setloading(false);
            }, 10000);
          }
        }}
        loading={loading}>
        CREATE PARTICIPANTS
      </PrimaryButton>
      {/* <Line color={COLORS.black} /> */}
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
    height: 190,
  },

  buttonsConatiner: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 110,
    position: 'absolute',
    bottom: 0,
  },
  ModelContainer: {
    padding: 10,
  },
});
