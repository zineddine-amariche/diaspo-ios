import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import ImgBack from '../../../../../../Assets/Img/HomeBack.png';
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../../components/Buttons';
import SecondaryHeader from '../../../../../../components/Headers/root/SecondaryHeader';
import Space from '../../../../../../components/Space';
import * as _ from '../../../../../../components/utils';
import CreatedSuccess from '../../../../../../components/views/Layouts/AuthLayout/Model';
import {COLORS, SIZES} from '../../../../../../theme';

import HView from '../../../../../../components/views/HView/HView';
import {useDispatch, useSelector} from 'react-redux';
import thumbnailPath from '../../../../../../Assets/Img/ContactsUser.png';
import Rectangle from '../../../../../../components/views/Rectangle';

import {useEffect} from 'react';
import Line from '../../../../../../components/views/line';
import {TouchableOpacity} from 'react-native';
import UseCheckBoxElements from '../../../../../../components/checkBox/useCheckBoxElements';
import {
  createParticipants,
  resetSuccesParticipants,
} from '../../../../../../redux/Features/Tontine/Participants/create/slice';
import {deleteSelectedListPayers, resetPayers} from '../../../../../../redux/Features/Tontine/ManagePayers';
import {createNotification} from '../../../../../../redux/Features/Tontine/Participants/SendNotify/slice';
import {resetBeneficiaries} from '../../../../../../redux/Features/Tontine/Participants/getBeneficiaires/slice';
import {useIsFocused} from '@react-navigation/native';
import ModelConfirmCreatePayers from '../Components/models/Model.ConfirmCreatePayers';
import ModelUseAsBeneficiary from '../Components/models/Model.useAsBeneficiary';

const ListPayer = ({navigation, navigation: {goBack}, route}) => {
  const {
    GlobalBen,
    GlobalBen2,
    GlobalBen3,
    ind,
    ARR,
    projectId,
    type,
    routeData,
    deviceTokenFromConnectedUsers,
  } = route.params;

  const [success, setsuccess] = useState(false);
  const {token} = useSelector(state => ({...state.token}));

  const {
    data,
    isError,
    status,
    isLoading,
    message,
    participants,
    nonAppUserParticipants,
    TypeOfParticipant,
  } = useSelector(state => ({
    ...state.createParticipants,
  }));

  const dispatch = useDispatch();
  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const NavToCnfPayer = () => {
    const userId = GlobalBen.map(i => {
      return i.userId ? i.userId : null;
    });

    let obj = {
      appUsers: userId,
      noneAppUsers: GlobalBen3,
      projectId,
      token,
      type,
    };

    dispatch(createParticipants(obj));
  };
  const NavToCnfBenef = () => {
    let ARR = [];
    GlobalBen.map(i => {
      return ARR.push(i.userId);
    });
    GlobalBen3;

    let obj = {
      appUsers: ARR,
      noneAppUsers: GlobalBen3,
      projectId,
      token,
      type: 'PAYER_AND_BENEFICIARY',
    };
    dispatch(createParticipants(obj));
  };
  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  let ids = participants?.map(el => {
    return el.participantId;
  });

  let object = {};

  const isFocused = useIsFocused();
  useEffect(() => {
    if (  status === 'success' &&
    isFocused &&
    (TypeOfParticipant === 'PAYER' ||
      TypeOfParticipant === 'PAYER_AND_BENEFICIARY')) {
      console.log(' ----------- Payers List : Success ----------- ');

      if (ids && ids.length > 0) {
        ids?.forEach(element => {
          object = {
            registration_ids: deviceTokenFromConnectedUsers,
            notification: {
              body: `You has been invited to join “${routeData?.name}” as a payer`,
              OrganizationId: '2',
              content_available: true,
              priority: 'high',
              subtitle: 'Dipaso Invitation',
              title: 'Dipaso - Tontine Invitation ',
              participantsId: element,
              projectId,
            },
            data: {
              priority: 'high',
              sound: 'app_sound.wav',
              content_available: true,
              bodyText: `You has been invited to join “${routeData?.name}” as a payer`,
              organization: 'Dipaso',
              participantsId: element,
              projectId,
              timer: new Date(),
              for: 'invitation',
              navigate: 'InvitationTontine',
              forgroundView: 'Notifications',
              title: 'Dipaso - Tontine Invitation ',
            },
          };
        });
      }

      dispatch(createNotification(object));

      let obje = {
        projectId: projectId,
        token: user.AccessToken,
      };
 
      if (TypeOfParticipant === 'PAYER') {
        dispatch(resetSuccesParticipants()),

        navigation.navigate('ViewPayersList', {
          projectId,
          routeData: 'null',
          object: obje,
        });
      } else {
        dispatch(resetSuccesParticipants()),
        navigation.navigate('ViewBenefeciareList', {
          projectId,
          routeData: 'null',
          object: obje,
        });
      }
      setTimeout(
        () => dispatch(resetPayers(), dispatch(deleteSelectedListPayers())),

        5000,
      );
    } else if (isError) {
      console.log('isError', isError);
      // ToastAndroid.show(
      //   isError,
      //   ToastAndroid.SHORT
      // );
      dispatch(resetSuccesParticipants());
      setTimeout(
        () => dispatch(resetPayers(), dispatch(deleteSelectedListPayers())),
        2000,
      );
    }
  }, [status]);

  const [showModelUseAsbenef, setshowModelUseAsbenef] = useState(false);

  const closeModelUseAsbenef = useCallback(() => {
    setshowModelUseAsbenef(false);
  }, []);

  const openModelConfirmCreatePayers = useCallback(() => {
    setshowModelUseAsbenef(true);
  }, []);

  const handleOnPressYes = () => {
    setshowModelUseAsbenef(false);
    onSuccess();
  };


    useEffect(() => {
    if (message) {
      Alert.alert(
        message?.status,
        message?.statusDescription
          ? message?.statusDescription
          : 'Error getting information',
        [
          {
            text: 'Cancel',
            onPress: () => {
              if (
                message?.statusDescription == 'Expired token' ||
                message?.statusDescription == 'Wrong number of segments'
              ) {
                clearAsyncStorage();
              } else {
                dispatch(resetTontine());
              }
            },

            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              if (message?.statusDescription == 'Expired token') {
                clearAsyncStorage();
              } else {
                dispatch(resetTontine());
              }
            },
          },
        ],
      );
    }
  }, [message]);

  // useEffect(() => {
  //   // alert(message)
  //   alert(message)
  // }, [message,status])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />

      <>
        <SecondaryHeader
          goBack={() => {
            navigation.navigate('Payer', {projectId, type});
          }}
          title={'Selected Payers'}
          sousTitre={`${ARR?.length} people selected`}
          Cancel="Return"
        />

        <ScrollView
          contentContainerStyle={{width: SIZES.width}}
          showsVerticalScrollIndicator={false}>
          <Space space={15} />
          <View style={{paddingHorizontal: 20}}>
            <Rectangle width="100%" style={{paddingVertical: 10}}>
              <Content1 GlobalBen={GlobalBen} GlobalBen2={GlobalBen2} />
              <Content3 GlobalBen3={GlobalBen3} GlobalBen2={GlobalBen2} />
              <Content2 GlobalBen2={GlobalBen2} />
            </Rectangle>
            <Space />
          </View>
        </ScrollView>
        <Space space={120} />
      </>

      <View style={styles.containerButton}>
        <PrimaryButtonLinear
          disabled={true}
          onPress={() => {
            openModelConfirmCreatePayers();
          }}
          width={'100%'}
          loading={isLoading}>
          confirm
        </PrimaryButtonLinear>
        <Space space={25} />
        <Line color={COLORS.black} />
      </View>
      {/* <CreatedSuccess Visible={success} onDissmis={onDissmis}>
        {BodyModel ? (
          <BodyModel
            onDissmis={onDissmis}
            NavToCnfPayer={NavToCnfPayer}
            NavToCnfBenef={NavToCnfBenef}
          />
        ) : null}
      </CreatedSuccess> */}

      <ModelUseAsBeneficiary
        success2={success}
        onDissmis2={onDissmis}
        NavToCnfBenef={NavToCnfBenef}
        NavToCnfPayer={NavToCnfPayer}
      />

      <ModelConfirmCreatePayers
        success={showModelUseAsbenef}
        onDissmis={closeModelUseAsbenef}
        pressNo={closeModelUseAsbenef}
        pressYes={handleOnPressYes}
      />
    </SafeAreaView>
  );
};
export default ListPayer;

const BodyModel = ({onDissmis, NavToCnfPayer, NavToCnfBenef}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <_.Head
        //  fontFamily={'Poppins-Bold'}
          style={{padding: 20, textAlign: 'center'}}>
          Do you want to use the list of payers as beneficaries?
        </_.Head>

        <HView spaceBetween>
          <PaleGreyButton
            onPress={() => {
              onDissmis();
              NavToCnfPayer();
              // validate number of payers
            }}
            width={'48%'}>
            no
          </PaleGreyButton>
          <PrimaryButtonLinear
            disabled={true}
            onPress={() => {
              onDissmis();
              NavToCnfBenef();
            }}
            width={'48%'}>
            yes
          </PrimaryButtonLinear>
        </HView>
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
    height: 110,
  },
  topinuptxt: {
    padding: 20,
  },
  containerButton: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: 110,
    paddingTop: 15,
    position: 'absolute',
    bottom: 0,
  },
  BoxInfoTextYellow: {
    justifyContent: 'center',
  },
  textInfo: {
    marginLeft: 8,
  },
  Input: {
    color: COLORS.darkBlueGrey,
    fontSize: 20,
    //fontFamily: 'Roboto-Bold',
    flex: 1,
    paddingLeft: 2,
  },
  Container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
  },
});

const Content1 = ({GlobalBen, GlobalBen2}) => {
  return GlobalBen?.map((i, index) => {
    return (
      <View key={index}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              // handleOnChange(index, item);
            }}>
            <View>
              <Image
                source={thumbnailPath}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '57%'}}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}>
                {i.firstName} {i.lastName}
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {i.mobileNumber}
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen?.length - 1 && !GlobalBen2.length ? null : (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.silverTwo,
              }}></View>
          )}
        </>
      </View>
    );
  });
};

const Content3 = ({GlobalBen3, GlobalBen2}) => {
  return GlobalBen3?.map((i, index) => {
    return (
      <View key={index}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              // handleOnChange(index, item);
            }}>
            <View>
              <Image
                source={thumbnailPath}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '57%'}}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}>
                Pippa Rachel
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {i.mobileNumber}
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen3?.length - 1 && !GlobalBen2.length ? null : (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.silverTwo,
              }}></View>
          )}
        </>
      </View>
    );
  });
};

const Content2 = ({GlobalBen2}) => {
  return GlobalBen2?.map((i, index) => {
    return (
      <View key={index}>
        <>
          <TouchableOpacity
            style={styles.Container}
            onPress={() => {
              // console.log('index' , index)
              handleOnChange(index, item);
            }}>
            <View>
              <Image
                source={thumbnailPath}
                style={styles.Img}
                resizeMode="contain"
              />
            </View>
            <View style={{width: '57%'}}>
              <_.Head
                fontSize={17}
                color={COLORS.darkBlueGrey}
                numberOfLines={1}>
                {i.displayName}
              </_.Head>

              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                {i.mobileNumber}
                {/* {i?.phoneNumbers[0]?.number} */}
              </_.Txt>
              <_.Txt fontSize={12} color={COLORS.coolGrey}>
                jonathan-joseph@diaspo.com
              </_.Txt>
            </View>

            <UseCheckBoxElements index={index} isCheck={true} />
          </TouchableOpacity>
          {index === GlobalBen2?.length - 1 ? null : (
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.silverTwo,
              }}></View>
          )}
        </>
      </View>
    );
  });
};
