import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Txt} from '../../../../../../components/utils';
import {COLORS} from '../../../../../../theme';
import HView from '../../../../../../components/views/HView/HView';
import perssone from '../../../../../../Assets/Img/icon24CustomerDefault.png';
import pdate from '../../../../../../Assets/Img/icon16CalendarDefault.png';
import {Image} from 'react-native';
import Space from '../../../../../../components/Space';
import moment from 'moment';
const Item = ({item}) => {
  // console.log('item', item)
  return (
    <HView
      spaceBetween
      style={{
        backgroundColor: COLORS.paleGreyTwo,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 6,
        marginVertical: 5,
      }}>
      <View style={{ }}>
        <HView>
          <Txt numberOfLines={1} color={COLORS.darkBlueGrey}>
            {item.name}
          </Txt>
        </HView>
        <Space space={5} />
        <HView>
          <Image source={perssone} style={styles.img} />
          <Txt fontSize={12} color={COLORS.coolGrey}>
            {item.listOfParticipants.length}{' '}
            {item.listOfParticipants.length > 1 ? 'payers' : 'payer'}
          </Txt>
        </HView>
        <Space space={3} />

        <HView>
          <Image source={pdate} style={styles.img} />
          <Txt fontSize={12} color={COLORS.coolGrey}>
            {moment(item?.createdAt).format('lll')}
          </Txt>
        </HView>
      </View>
      <View
        style={{
          backgroundColor: COLORS.lightSage,
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 8,
        }}>
        <Txt fontSize={17} color={COLORS.greenishTeal} Bold="700">
          {item.status}
        </Txt>
      </View>
    </HView>
  );
};

export default Item;

const styles = StyleSheet.create({
  img: {
    marginRight: 7,
  },
});
