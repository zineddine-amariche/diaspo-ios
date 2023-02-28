import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../../../../theme';
import ViewT1 from '../../../../../../../components/views/CardViewType1';
import {Txt} from '../../../../../../../components/utils';
import Space from '../../../../../../../components/Space';
import HView from '../../../../../../../components/views/HView/HView';
import imgInfo from '../../../../../../../Assets/Img/icon24Info2.png';
import {TouchableOpacity} from 'react-native';
import moment from 'moment';

const DetailsTontine = ({
  tontineProjectInfo,
  onSuccess,
  projectId,
  isFirstTime,
  TextIn
}) => {
  let colorText =
    tontineProjectInfo?.project?.status === 'ACTIVATED'
      ? COLORS.greenishTeal
      : tontineProjectInfo?.project?.status === 'IN PROGRESS'
      ? COLORS.orangeYellow
      : tontineProjectInfo?.project?.status === 'CANCELLED'
      ? COLORS.coral
      : COLORS.silver;

  // console.log('routeData.prject', routeData?.project?.retentionRate)

  //  console.log('tontineProjectInfo', tontineProjectInfo?.payers[0]?.details.firstName)
   
   
   let startDate = moment.unix(tontineProjectInfo?.project?.startAt);
   let formattedDate = startDate.format('lll');
// console.log(formattedDate); // output: 2022-05-12

  return (
    <View style={{paddingHorizontal: 20}}>
      <Space space={30} />

      <ViewT1>
        <Txt fontSize={17}>Tontine Details</Txt>
        <Space space={10} />
        {/* <HView spaceBetween>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            Tontine ID
          </Txt>
          <Txt fontSize={14} color={COLORS.darkBlueGrey}>
            {routeData?.project?.accountId
              ? routeData?.project?.accountId
              : routeData?.accountId}
          </Txt>
        </HView> */}
        <Space space={10} />

        <HView spaceBetween>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            Status
          </Txt>
          <View style={styles.etat}>
            <Txt color={colorText}>
              {TextIn}
            </Txt>
          </View>
        </HView>
        <Space space={10} />

        <HView spaceBetween>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            Created time
          </Txt>
          <Txt fontSize={14} color={COLORS.darkBlueGrey}>
            {moment(tontineProjectInfo?.project?.createdAt).format("lll")}

            
          </Txt>
        </HView>
        <Space space={10} />

        <HView spaceBetween>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            Created by
          </Txt>
          <TouchableOpacity onPress={onSuccess}>
            <HView>
              <Image source={imgInfo} style={styles.img} />
              <Txt fontSize={14} color={COLORS.darkBlueGrey} lineHeight={20}>
                {tontineProjectInfo?.payers[0]?.details?.firstName} {tontineProjectInfo?.payers[0]?.details?.lastName}
              </Txt>
            </HView>
          </TouchableOpacity>
        </HView>
        <Space space={10} />

        <HView spaceBetween>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            Amount per person
          </Txt>
          <Txt fontSize={14} color={COLORS.darkBlueGrey}>
            {tontineProjectInfo?.project?.amount} euro
          </Txt>
        </HView>
        <Space space={10} />

        <HView spaceBetween>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            Retention rate
          </Txt>
          <Txt fontSize={14} color={COLORS.darkBlueGrey}>
            {tontineProjectInfo?.project?.retentionRate} %
          </Txt>
        </HView>
        <Space space={10} />

        <HView spaceBetween>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            Frequency of payment
          </Txt>
          <Txt fontSize={14} color={COLORS.darkBlueGrey}>
            {tontineProjectInfo?.project?.frequencyOfPayment}
          </Txt>
        </HView>
        <Space space={10} />

        <HView spaceBetween>
          <Txt fontSize={14} color={COLORS.coolGrey}>
            Started date
          </Txt>
          <Txt fontSize={14} color={COLORS.darkBlueGrey}>
           {formattedDate}
          </Txt>
        </HView>
      </ViewT1>
      <Space space={10} />
    </View>
  );
};

export default DetailsTontine;

const styles = StyleSheet.create({
  img: {
    marginRight: 10,
  },
});
