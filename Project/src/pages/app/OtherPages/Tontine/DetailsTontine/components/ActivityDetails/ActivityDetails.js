import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ViewT1 from '../../../../../../../components/views/CardViewType1';
import {Txt} from '../../../../../../../components/utils';
import Space from '../../../../../../../components/Space';
import {COLORS} from '../../../../../../../theme';
import HView from '../../../../../../../components/views/HView/HView';
import Divider from '../../../../../../../components/Divider/Divider';
import imgInfo from '../../../../../../../Assets/Img/icon24Info2.png';
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../../../components/Buttons';
import {TouchableOpacity} from 'react-native';
import BottomSheetSelect from '../../BottomSheetSelect';
import {useRef} from 'react';
import {useCallback} from 'react';
import {resetSuccesParticipants} from '../../../../../../../redux/Features/Tontine/Participants/create/slice';
import {useDispatch} from 'react-redux';

const ActivityDetails = ({
  navigation,
  onSuccess,
  routeData,
  projectId,
  isFirstTime,
  startWithparticipants,
  cancelTontin,
}) => {
  const bottomSheetModalRef2 = useRef(null);

  const closeSelect = useCallback(() => {
    bottomSheetModalRef2.current?.close();
  }, []);

 
  return (
    <View style={{paddingHorizontal: 20}}>
      <ViewT1>
        <DetailsInformations
          onSuccess={onSuccess}
          navigation={navigation}
          projectId={projectId}
          routeData={routeData}
          isFirstTime={isFirstTime}
        />

        {routeData?.project?.status === 'CANCELLED' ||
        routeData?.status === 'COMPLETED' ||
        routeData?.project?.status === 'COMPLETED' ||
        routeData?.project?.status === 'ACTIVATED' ? null : (
          <>
            <>
              {routeData?.project?.listOfBeneficiaries.length > 0 ? (
                <ReorderButton projectId={projectId} navigation={navigation} />
              ) : null}
              <Divider />
              <StartTontineButton
                startWithparticipants={startWithparticipants}
              />
              <CancelTontineButton cancelTontin={cancelTontin} />
            </>
          </>
        )}
      </ViewT1>

      <BottomSheetSelect
        projectId={projectId}
        closeSelect={closeSelect}
        bottomSheetModalRef={bottomSheetModalRef2}
        navigation={navigation}
        routeData={routeData}
      />
      <Space space={20} />
    </View>
  );
};

export default ActivityDetails;

const ReorderButton = ({navigation, projectId}) => {
  const dispatch = useDispatch();

  return (
    <>
      <PaleGreyButton
        onPress={() => {
          dispatch(resetSuccesParticipants());
          navigation.navigate('BenefeciareListReorder', {
            projectId: projectId,
            title: 'Set Beneficiary Order',
            confirmbtn: true,
          });
        }}>
        REORDER BENEFICIARIES
      </PaleGreyButton>
    </>
  );
};

// const SendReminderButton = () => {
//   return (
//     <>
//       <Space />
//       <PaleGreyButton>SEND REMINDER</PaleGreyButton>
//     </>
//   );
// };

const StartTontineButton = ({startWithparticipants}) => {
  return (
    <>
      <Space />
      <PaleGreyButton onPress={startWithparticipants}>
        START WITH PARTITIAL LIST
      </PaleGreyButton>
    </>
  );
};

const CancelTontineButton = ({cancelTontin}) => {
  return (
    <>
      <Space />
      <PrimaryButtonLinear onPress={cancelTontin} disabled={true}>
        Cancel TONTINE
      </PrimaryButtonLinear>
    </>
  );
};

const DetailsInformations = ({
  onSuccess,
  navigation,
  projectId,
  routeData,
  isFirstTime,
}) => {
  //  console.log('routeData', routeData.nextToReceived)
  return (
    <>
      <Txt fontSize={17}>Activity Details</Txt>
      <Space space={10} />
      <HView spaceBetween>
        <Txt fontSize={14} color={COLORS.coolGrey}>
          Joining as
        </Txt>
        <Txt fontSize={14} color={COLORS.darkBlueGrey}>
          Creator, Payer, Beneficiary
        </Txt>
      </HView>
      <Divider />
      <Space space={10} />

      <HView spaceBetween>
        <Txt fontSize={14} color={COLORS.coolGrey}>
          Payment status
        </Txt>
        <View style={{width: '40%'}}>
          <Txt fontSize={14} color={COLORS.darkBlueGrey} numberOfLines={2}>
            Paid 5 circles Next payment on 14 April
          </Txt>
        </View>
      </HView>
      <Space space={10} />

      <HView spaceBetween>
        <Txt fontSize={14} color={COLORS.coolGrey}>
          Payers
        </Txt>
        <View style={{width: '40%', alignItems: 'flex-end'}}>
          <Txt fontSize={14} color={COLORS.darkBlueGrey} lineHeight={20}>
            {routeData?.numberOfPayers} payers
          </Txt>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPayersList', {
                projectId,
                routeData,
                isFirstTime,
              });
            }}>
            <Txt fontSize={14} color={COLORS.orangeYellow} lineHeight={20}>
              View payer list
            </Txt>
          </TouchableOpacity>
        </View>
      </HView>
      <Divider />
      <Space space={10} />

      <HView spaceBetween>
        <Txt fontSize={14} color={COLORS.coolGrey}>
          Receiving status
        </Txt>
        <Txt fontSize={14} color={COLORS.darkBlueGrey}>
          Received on 14 Jan
        </Txt>
      </HView>
      <Space space={10} />

      <HView spaceBetween>
        <Txt fontSize={14} color={COLORS.coolGrey}>
          Next beneficiary
        </Txt>
        <TouchableOpacity onPress={onSuccess}>
          <HView>
            <Image source={imgInfo} style={styles.img} />
            <Txt fontSize={14} color={COLORS.darkBlueGrey} lineHeight={20}>
              {
                routeData?.nextToReceived?.beneficiaryDetails?.details
                  ?.firstName
              }{' '}
              {routeData?.nextToReceived?.beneficiaryDetails?.details?.lastName}
            </Txt>
          </HView>
        </TouchableOpacity>
      </HView>
      <Space space={10} />
      <HView spaceBetween>
        <Txt fontSize={14} color={COLORS.coolGrey}>
          Frequency of payment
        </Txt>
        <View style={{width: '40%', alignItems: 'flex-end'}}>
          <Txt fontSize={14} color={COLORS.darkBlueGrey} lineHeight={20}>
            {routeData?.numberOfBeneficiaries} beneficiaries
          </Txt>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewBenefeciareList', {
                projectId,
                routeData,
                title: 'Beneficiaries List',
              });
            }}
            disabled={routeData?.numberOfBeneficiaries == 0 ? true : false}>
            <Txt
              fontSize={14}
              color={
                routeData?.numberOfBeneficiaries == 0
                  ? COLORS.silver
                  : COLORS.orangeYellow
              }
              lineHeight={20}>
              View beneficiary list
            </Txt>
          </TouchableOpacity>
        </View>
      </HView>
      <Space space={10} />
    </>
  );
};

const styles = StyleSheet.create({
  img: {
    marginRight: 10,
  },
});

{
  /* <PaleGreyButton 
          onPress={() => {
            navigation.navigate("ViewBenefeciareList", {
              projectId,
              routeData

            });
          }}
        >
          Consult
        </PaleGreyButton> */
}
