import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import ImgBack from '../../../../../Assets/headerImg/background.png';
import SecondaryHeader from '../../../../../components/Headers/root/SecondaryHeader';
import {COLORS, SIZES} from '../../../../../theme';
import DetailsTontine from './components/DetailsTontine/DetailsTontine';
import Toast from 'react-native-simple-toast';

import {
  PaleGreyButton,
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
import Activity from './components/Activity';
import ActivityButton from './components/ActivityButton';

const InfoScreenTontine = ({navigation, route}) => {
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const isFocused = useIsFocused();


  const {consult, object, isFirstTime} = route.params;

  const [success2, setsuccess2] = useState(false);
  const [success3, setsuccess3] = useState(false);
  const [loading, setloading] = useState(false);


  const {tontineProjectInfo, isLoading} = useSelector(state => ({
    ...state.tontines,
  }));
  const {user} = useSelector(state => ({
    ...state.auth,
  }));


  const onOpenInfomationDetails = useCallback(() => {
    dispatch(getSpecificParticipant(tontineProjectInfo?.project?.projectId));
    bottomSheetModalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetModalRef.current.close();
  }, []);
  const startWithparticipants = () => {
    setsuccess2(true);
  };
  const cancelTontin = () => {
    setsuccess3(true);
  };
  const navToTontine = () => {
    let obje = {
      projectId: tontineProjectInfo?.project?.projectId,
      token: user?.AccessToken,
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
    let object = {
      projectId: tontineProjectInfo?.project?.projectId,
      token: user?.AccessToken,
      data: {
        status: 'CANCELLED',
      },
    };
    dispatch(updateTontine(object));
    setTimeout(() => {
      navigation.navigate('Tontine');
    }, 1000);
  };

  const closeSelect = useCallback(() => {
    bottomSheetModalRef2.current?.close();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);



  let TextIn =
    tontineProjectInfo?.project?.status === 'ACTIVATED'
      ? 'Activated'
      : tontineProjectInfo?.project?.status === 'IN PROGRESS'
      ? 'Pending'
      : tontineProjectInfo?.project?.status === 'CANCELLED'
      ? 'Cancelled'
      : 'Finished';


  useEffect(() => {
    if (object) {
      dispatch(getTontinesProjectInfo(object));
    }
  }, [object, isFirstTime, isFocused]);


  const onCreate = () => {
    {
      if (tontineProjectInfo?.project?.type === 'TONTINE_ORDINARY_TONTINE') {
        setloading(true);
        dispatch(createTypeParticipants('TONTINE_ORDINARY_TONTINE'));

        setTimeout(() => {
          navigation.navigate('Béneféciare', {
            projectId:tontineProjectInfo?.project?.projectId,
            type: 'PAYER_AND_BENEFICIARY',
            routeData:tontineProjectInfo,
            title: 'Select participants',
          });
          setloading(false);
        }, 1000);
      } else if (tontineProjectInfo?.project?.type === 'TONTINE_CUSTOM_TONTINE') {
        setloading(true);
        handlePresentModalPress();
        setTimeout(() => {
          setloading(false);
        }, 10000);
      } else {
        Toast.showWithGravity(
          ' Error type tontine !',
          Toast.SHORT,
          Toast.CENTER,
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
          TextIn={TextIn}
        />

        <>
          <ScrollView
            contentContainerStyle={{width: SIZES.width}}
            showsVerticalScrollIndicator={false}>
            <>
              <DetailsTontine
                tontineProjectInfo={tontineProjectInfo}
                onSuccess={onOpenInfomationDetails}
                closeModal={closeModal}
                isFirstTime={isFirstTime}
                projectId={tontineProjectInfo?.project?.projectId}
                bottomSheetModalRef={bottomSheetModalRef}
                TextIn={TextIn}
              />

              <Activity
                asAPayer={tontineProjectInfo?.project?.asAPayer}
                numberOfPayers={tontineProjectInfo?.numberOfPayers}
                projectId={tontineProjectInfo?.project?.projectId}
                consult={consult}
                onSuccess={onOpenInfomationDetails}
                closeModal={closeModal}
                isFirstTime={isFirstTime}
                startWithparticipants={startWithparticipants}
                cancelTontin={cancelTontin}
                bottomSheetModalRef={bottomSheetModalRef}
                tontineProjectInfo={tontineProjectInfo}
              />
            </>
          </ScrollView>
          <ActivityButton
            asAPayer={tontineProjectInfo?.project.asAPayer}
            numberOfPayers={tontineProjectInfo?.numberOfPayers}
            tontineProjectInfo={tontineProjectInfo}
            handlePresentModalPress={handlePresentModalPress}
            projectId={tontineProjectInfo?.project?.projectId}
            loading={loading}
            onCreate={onCreate}
          />
        </>

        <BottomInfo
          bottomSheetModalRef={bottomSheetModalRef}
          onSuccess={onOpenInfomationDetails}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: 'center',
    flex: 1,
  },
  ImageBackground: {
    width: SIZES.width,
    zIndex: 99,
    position: 'absolute',
    top: Platform.OS == 'android' ? -40 : 0,
  },

  ModelContainer: {
    padding: 10,
  },
});
