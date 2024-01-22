import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Head, Txt} from '../../../../../components/utils';
import {COLORS} from '../../../../../theme';

const CardUserHistory = ({item, index}) => {
  const date = new Date(item?.datetime * 1000);

  let price = item.type =='DEBIT' ? `${item?.amount / 100} ${' £'}` : `+${item?.amount / 100} ${' £'} `
  return (
    <TouchableOpacity activeOpacity={0.9}>
      <View style={styles.Container}>
        <View style={{width: '40%'}}>
          <Head fontSize={14} color={COLORS.darkBlueGrey} numberOfLines={1}>
            {item.description}
          </Head>

          <Txt fontSize={12} color={COLORS.coolGrey}>
            {date.toDateString()}
          </Txt>
        </View>
        <View>
          <Txt fontSize={17} color={item.type =='DEBIT' ?COLORS.peachyPink :COLORS.greenishTeal}>
           {price}
          </Txt>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardUserHistory;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    width: '100%',
    padding: 15,
    justifyContent: 'space-between',
    borderRadius: 4,
    shadowColor: '#122',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  Img: {
    borderRadius: 5,
    height: 40,
    width: 40,
    marginRight: 20,
  },
});
