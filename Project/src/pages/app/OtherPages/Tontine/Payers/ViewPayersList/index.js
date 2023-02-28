import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getPayers} from '../../../../../../redux/Features/Tontine/Participants/getPayers/slice';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryTemplate from '../../../../../../components/Template-Pages/PrimaryPage';
import Spiner from '../../../../../../components/spiner';
import EmptyList from './Components/EmptyList';
import {COLORS, SIZES} from '../../../../../../theme';
import {Head, Txt} from '../../../../../../components/utils';
import Imge from '../../../../../../Assets/Img/Model1.png';
import {
  deleteSelectedListPayers,
  resetPayers,
} from '../../../../../../redux/Features/Tontine/ManagePayers';
import Space from '../../../../../../components/Space';
import {useCallback} from 'react';
import BottomSheetReminder from '../PayerList/BottomSheetReminder';
import CreatedSuccess from '../../../../../../components/views/Layouts/AuthLayout/Model';
import HView from '../../../../../../components/views/HView/HView';
import {
  PaleGreyButton,
  PrimaryButton,
  PrimaryButtonLinear,
  WhiteButton,
} from '../../../../../../components/Buttons';
import SimpleSpiner from '../../../../../../components/spiner/SimpleSpiner';

const ViewPayersList = ({navigation, route}) => {
  const {projectId, routeData, isFirstTime} = route.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const bottomSheetModalRef2 = useRef(null);

  const closeModalReminder = useCallback(() => {
    bottomSheetModalRef2.current.close();
  }, []);

  const handlePresentModalReminder = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);

  const [success, setsuccess] = useState(false);
  const [success2, setsuccess2] = useState(false);
  const [success3, setsuccess3] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
    // navToTontine();
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const sendReminder = () => {
    // closeModalReminder();
    onSuccess();
  };
  const startWithparticipants = () => {
    setsuccess2(true);
    closeModalReminder();
  };
  const cancelTontin = () => {
    setsuccess3(true);
    closeModalReminder();
  };

  const {isError, data, isLoading, message} = useSelector(state => ({
    ...state.getpayers,
  }));
  useEffect(() => {
    dispatch(getPayers(projectId));
  }, [projectId, isFocused, dispatch]);

  const [visible, setVisible] = useState(false);

  const { user } = useSelector((state) => ({
    ...state.auth,
  }));
  let object = {
    projectId: projectId,
    token: user?.AccessToken,
  };


  const nav = () => {
    if (!routeData) {
      navigation.navigate('Tontine');
      goBackFun();
    } else {
      setVisible(true);
      setTimeout(() => {
        navigation.navigate('InfoScreenTontine', {
          routeData,
          projectId,
          isFirstTime: false,
          object
        });
        setVisible(false);

      }, 2000);

      goBackFun();
    }
  };

  const goBackFun = () => {
    setTimeout(
      () => dispatch(resetPayers(), dispatch(deleteSelectedListPayers())),
      2000,
    );
  };

  if (message.statusDescription) {
    alert(message.statusDescription);
  }

//  console.log('data.data', data.data)

  return (
    <>
      {visible ? (
        <SimpleSpiner toast={true} visible={visible} />
      ) : (
        <PrimaryTemplate title="Payers List" navigation={nav}>
          {isLoading ? (
            <Spiner />
          ) : data?.data?.payers?.length !== 0 ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  backgroundColor: '#FFF',
                  borderRadius: 8,
                  marginTop: 20,
                }}>
                {data?.data?.payers?.map((item, index) => {
                  return (
                    <View
                      style={[
                        styles.container,
                        {
                          borderBottomWidth:
                            data?.data?.payers.length !== index + 1 ? 1 : 0,
                          borderBottomColor:
                            data?.data?.payers.length !== index + 1
                              ? COLORS.silver
                              : '',
                        },
                      ]}
                      key={index}>
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          // handlePresentModalReminder();
                          sendReminder();
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '70%',
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={Imge}
                            style={{height: 30, width: 30, marginRight: 10}}
                          />
                          <View style={{width: '100%'}}>
                            <Txt
                              color={COLORS.darkBlueGrey}
                              fontSize={17}
                              style={{textTransform: 'capitalize'}}
                              numberOfLines={1}>
                              {item?.payerDetails?.details?.firstName}{' '}
                              {item?.payerDetails?.details?.lastName}
                            </Txt>
                            <Txt fontSize={12} color={COLORS.coolGrey}>
                              {item?.payerDetails?.details?.mobileNumber}
                            </Txt>
                          </View>
                        </View>
                        <View
                          style={{
                            backgroundColor:
                              item?.status === 'PENDING'
                                ? COLORS.iceBlueTwo
                                : item?.status === 'ACCEPTED'
                                ? COLORS.lightSage
                                : COLORS.veryLightPink,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                            borderRadius: 13,
                          }}>
                          <Txt
                            color={
                              item?.status === 'PENDING'
                                ? COLORS.darkSkyBlue
                                : item?.status === 'ACCEPTED'
                                ? COLORS.greenishTeal
                                : COLORS.coral
                            }
                            fontSize={14}>
                            {item?.status}
                          </Txt>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <EmptyList />
          )}

          {/* <BottomSheetReminder
          bottomSheetModalRef={bottomSheetModalRef2}
          close={closeModalReminder}
          sendReminder={sendReminder}
        /> */}
          <CreatedSuccess Visible={success} onDissmis={onDissmis} padding={1}>
            {BodyModel1 ? (
              <BodyModel1 onDissmis={onDissmis}  />
            ) : null}
          </CreatedSuccess>

          {/* <CreatedSuccess
          Visible={success3}
          onDissmis={() => setsuccess2(false)}
          padding={1}
        >
          {BodyModel2 ? (
            <BodyModel2
              onDissmis={() => setsuccess3(false)}
              navToTontine={navToTontine}
            />
          ) : null}
        </CreatedSuccess> */}

          {/* <CreatedSuccess
          Visible={success2}
          onDissmis={() => setsuccess3(false)}
          padding={1}
        >
          {BodyModel3 ? (
            <BodyModel3
              onDissmis={() => setsuccess2(false)}
              navToTontine={navToTontine}
            />
          ) : null}
        </CreatedSuccess> */}
        </PrimaryTemplate>
      )}
    </>
  );
};

export default ViewPayersList;
const BodyModel1 = ({onDissmis, navToTontine}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Space />

        <Head
        //  fontFamily={'Poppins-Bold'}
          style={{paddingHorizontal: 20, textAlign: 'center'}}>
          Send reminder ?
        </Head>
        <Space />

        <View style={{paddingHorizontal: 20, textAlign: 'center'}}>
          <Txt color={COLORS.slateGrey} fontSize={14}>
            The payers and beneficiaries will receive the reminder to repnse to
            you'r invitaion to join this tontine
          </Txt>
        </View>
        <Space />
        <HView spaceBetween>
          <PaleGreyButton
            onPress={() => {
              onDissmis();
              // validate number of payers
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
            SEND
          </PrimaryButtonLinear>
        </HView>
      </View>
    </>
  );
};
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

{
  /* {data?.data?.payers?.length <=1 ||isLoading? null : (
        <View
          style={{
            backgroundColor: COLORS.paleGrey,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <PrimaryButton
            marginVertical={5}
            onPress={() => {
              closeModalReminder();
              // navigation.navigate("Tontine");
              startWithparticipants();
            }}
          >
            START WITH PARTITIAL LIST
          </PrimaryButton>
          <PrimaryButton
            marginVertical={5}
            onPress={() => {
              closeModalReminder();
              // navigation.navigate("Tontine");
              cancelTontin();
            }}
          >
            CANCEL THIS TONTINE
          </PrimaryButton>
        </View>
      )} */
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginVertical: 4,
    padding: 10,
  },
  ModelContainer: {
    padding: 10,
  },
});

// const channelId = () => {
//   PushNotification.createChannel({
//     channelId: "notificationId",
//     channelName: "notifications",
//   });
// };

// useEffect(() => {
//   channelId();
// }, []);

// useEffect(() => {
//   if (nameTontine) {
//     showNotification(
//       " Diapso - Tontine Invitation ",
//       `You has been invited to join “${nameTontine}” as a payer`
//     );
//   }
// }, [nameTontine]);

// const HandleNotify = () => {
//   PushNotification.configure({
//     onRegister: function (token) {
//       if (token) {
//         // dispatch(dispatchToken(token.token))
//         // dispatch(dispatchDeviceOS(Platforms.toUpperCase()))
//         console.log('token', token)
//       }
//     },
//     onNotification: function (notification) {
//       console.log("NOTIFICATION   )):", notification);
//       navigation.navigate("InvitationTontine",{routeData});

//       // notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },

//     onAction: function (notification) {
//       console.log("ACTION:", notification.action);
//       console.log("NOTIFICATION --:", notification);

//     },

//     onRegistrationError: function(err) {
//       console.error(err.message, err);
//     },

//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },

//     popInitialNotification: true,

//     requestPermissions:  Platform.OS === "ios",
//   });
// };

// useEffect(() => {
//   HandleNotify()
// }, []);

// console.log('data', data.data.payers[0].notification) //{"date": "2022-12-25 08:49:23", "notify": true}
// useQuery

// const { token } = useSelector((state) => ({ ...state.token }));

// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };

// const API_URL = `https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app/v1/fund-raising/projects/participants`;

// let url = `${API_URL}/${projectId}/payers`;

// const fetchParticpants = async () => {
//   return  await axios.get(url,config);
// };

//   const { data: res, isSuccess:result } = useQuery("participants", fetchParticpants, {
//     refetchIntervalInBackground:true,
//     refetchInterval:2000
//   });

//   console.log('res', res.data)
