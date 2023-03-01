import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryTemplate from '../../../../../../components/Template-Pages/PrimaryPage';
import Spiner from '../../../../../../components/spiner';
import EmptyList from './Components/EmptyList';
import {COLORS} from '../../../../../../theme';
import {Head, Txt} from '../../../../../../components/utils';
import Imge from '../../../../../../Assets/Img/Model1.png';
import {getBeneficiaries} from '../../../../../../redux/Features/Tontine/Participants/getBeneficiaires/slice';
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../../components/Buttons';
import {useRef} from 'react';
import {useCallback} from 'react';
import CreatedSuccess from '../../../../../../components/views/Layouts/AuthLayout/Model';
import HView from '../../../../../../components/views/HView/HView';
import Space from '../../../../../../components/Space';
import Line from '../../../../../../components/views/line';
import {resetSuccesParticipants} from '../../../../../../redux/Features/Tontine/Participants/create/slice';
import SimpleSpiner from '../../../../../../components/spiner/SimpleSpiner';
import { deleteSelectedList, resetBeneficaire } from '../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare';
import { getTontinesProjectInfo } from '../../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
const ViewBenefeciareList = ({navigation, navigation: {goBack}, route}) => {
  const {projectId, routeData, title, isFirstTime} = route.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(true);

  const {isSuccess, isError, data, isLoading, message} = useSelector(state => ({
    ...state.benef,
  }));


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
    } else {
      setVisible(true);
      if(object){

        setTimeout(() => {
          navigation.navigate('InfoScreenTontine', {
            routeData,
            projectId,
            isFirstTime: false,
            object
          });
          setVisible(false);
        }, 2000);
      }else{
        setVisible(false);

      }
      goBackFun();

    }
  };

 

  

 
  const goBackFun = () => {
    setTimeout(
      () => dispatch(resetBeneficaire(), dispatch(deleteSelectedList())),
      2000,
    );
  };



  const [success, setsuccess] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const sendReminder = () => {
    onSuccess();
  };

// console.log('isFocused', isFocused)
  useEffect(() => {
    dispatch(getBeneficiaries(projectId));
  }, [projectId, isFocused, dispatch,visible]);
  return (
    <>
      {visible ? (
        <SimpleSpiner toast={true} visible={visible} />
      ) : (
        <>
          <PrimaryTemplate
            visible={visible}
            title={title ? title : 'Participants List'}
            navigation={nav}>
            {isLoading ? (
              <Spiner />
            ) : data?.data?.beneficiaries?.length !== 0 ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    backgroundColor: '#FFF',
                    borderRadius: 8,
                    marginTop: 20,
                  }}>
                  {data?.data?.beneficiaries?.map((item, index) => {
                    return (
                      <View
                        style={{
                          backgroundColor: '#FFF',
                          marginVertical: 4,
                          padding: 10,
                          borderBottomWidth:
                            data?.data?.beneficiaries.length !== index + 1
                              ? 1
                              : 0,
                          borderBottomColor:
                            data?.data?.beneficiaries.length !== index + 1
                              ? COLORS.silver
                              : '',
                        }}
                        key={index}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                          onPress={() => {
                            //  handlePresentModalReminder();
                            sendReminder();
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={Imge}
                              style={{height: 30, width: 30, marginRight: 10}}
                            />
                            <View style={{alignItems: 'center'}}>
                              <Txt
                                color={COLORS.darkBlueGrey}
                                fontSize={17}
                                style={{textTransform: 'capitalize'}}>
                                {item?.beneficiaryDetails?.details?.firstName}{' '}
                                {item?.beneficiaryDetails?.details?.lastName}
                              </Txt>
                              <Txt fontSize={12} color={COLORS.coolGrey}>
                                {
                                  item?.beneficiaryDetails?.details
                                    ?.mobileNumber
                                }
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

            <CreatedSuccess Visible={success} onDissmis={onDissmis} padding={1}>
              {BodyModel1 ? <BodyModel1 onDissmis={onDissmis} /> : null}
            </CreatedSuccess>
          </PrimaryTemplate>

          <ReorderButton
            resetSuccesParticipants={resetSuccesParticipants}
            navigation={navigation}
            projectId={projectId}
          />
        </>
      )}
    </>
  );
};

export default ViewBenefeciareList;

const BodyModel1 = ({onDissmis}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Space />

        <Head
          //fontFamily={'Poppins-Bold'}
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
            }}
            width={'48%'}>
            SEND
          </PrimaryButtonLinear>
        </HView>
      </View>
    </>
  );
};
// const BodyModel2 = ({onDissmis, navToTontine}) => {
//   return (
//     <>
//       <View style={styles.ModelContainer}>
//         <Space />

//         <Head
//           //fontFamily={'Poppins-Bold'}
//           style={{paddingHorizontal: 20, textAlign: 'center'}}>
//           Cancel this Tontine ?
//         </Head>
//         <Space />

//         <View style={{paddingHorizontal: 20, textAlign: 'center'}}>
//           <Txt fontSize={14} color={COLORS.slateGrey}>
//             Are you sur to cancel this tontine
//           </Txt>
//         </View>
//         <Space />
//         <HView spaceBetween>
//           <PaleGreyButton
//             onPress={() => {
//               onDissmis();
//             }}
//             width={'48%'}>
//             NO
//           </PaleGreyButton>
//           <PrimaryButtonLinear
//             disabled={true}
//             onPress={() => {
//               onDissmis();
//               navToTontine();
//             }}
//             width={'48%'}>
//             YES
//           </PrimaryButtonLinear>
//         </HView>
//       </View>
//     </>
//   );
// };
// const BodyModel3 = ({onDissmis, navToTontine}) => {
//   return (
//     <View style={styles.ModelContainer}>
//       <Space />

//       <Head
//         //fontFamily={'Poppins-Bold'}
//         style={{paddingHorizontal: 20, textAlign: 'center'}}>
//         Start with particial list
//       </Head>
//       <Space />

//       <View style={{paddingHorizontal: 20, textAlign: 'center'}}>
//         <Txt color={COLORS.slateGrey} fontSize={14}>
//           Please confir to start the tontine with the partial of accepted payers
//           and beneficiaries, You will need to wait for these payers and
//           beneficiaries to accept this change before starting the tontine anyway
//         </Txt>
//       </View>
//       <Space />
//       <HView spaceBetween>
//         <PaleGreyButton
//           onPress={() => {
//             onDissmis();
//           }}
//           width={'48%'}>
//           Cancel
//         </PaleGreyButton>
//         <PrimaryButtonLinear
//           disabled={true}
//           onPress={() => {
//             onDissmis();
//             navToTontine();
//           }}
//           width={'48%'}>
//           CONFIRM
//         </PrimaryButtonLinear>
//       </HView>
//     </View>
//   );
// };

const ReorderButton = ({resetSuccesParticipants, navigation, projectId}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.containerButton}>
      <PrimaryButtonLinear
        disabled={true}
        onPress={() => {
          dispatch(resetSuccesParticipants());
          navigation.navigate('BenefeciareListReorder', {
            projectId: projectId,
            title: 'Set Beneficiary Order',
            confirmbtn: true,
          });
        }}
        width={'100%'}>
        Reorder Beneficiaries
      </PrimaryButtonLinear>
      {/* <Space space={20} /> */}
      {/* <Line color={COLORS.black} /> */}
      {/* {Platform.OS == 'ios' ? <Space/>:null  } */}
    </View>
  );
};

{
  /* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:"#212" }}> */
}
{
  /* <TouchableOpacity onPress={() => {
        setVisible(true);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Successful',
          text2: 'Toast message',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 50
        });
      }}>
      </TouchableOpacity>
      */
}
{
  /* </View> */
}

const styles = StyleSheet.create({
  ModelContainer: {
    padding: 10,
  },
  containerButton: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    // height: 110,
    paddingVertical: 20,
    // position: 'absolute',
    // bottom: 0,
  },
});
