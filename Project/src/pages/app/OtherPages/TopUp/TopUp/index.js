import React, {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Toast from 'react-native-simple-toast';
import Space from '../../../../../components/Space';
import {Txt} from '../../../../../components/utils';
import {COLORS, SIZES} from '../../../../../theme';
import BankAcccounts from './components/Bank Acounts';
import CreditDebit from './components/Card debit';
import PrepaidCard from './components/PrepaidCard';

import BottomSheetSelect from './BottomSheetSelect';
import ReturnHeader from '../../../../../components/Headers/root/ReturnHeader';

const TopUp = ({navigation, navigation: {goBack}, route}) => {
  const bottomSheetModalRef3 = useRef(null);

  const {data} = route.params;


  const data1 = [
    {
      id: 0,
      label: 'Main Account',
      value: 'Main Account',
      price: '**** **** **** 3952',
      currency: '11 / 2022',
      url: require('../../../../../Assets/cartecredit.png'),
    },
    {
      id: 1,
      label: 'Main ',
      value: 'Main ',
      price: '**** **** **** 3651',
      currency: '11 / 2020',
      url: require('../../../../../Assets/Img/cardLogo2-removebg-preview.png'),
    },
    {
      id: 2,
      label: '2nd FX',
      value: '2nd FX',
      price: '**** **** **** 9251',
      currency: '09 / 2021',
      url: require('../../../../../Assets/Img/apple-pay-icon-28-removebg-preview.png'),
    },
  ];
  const data3 = [
    {
      id: 0,
      label: 'Main Account',
      value: 'Main Account',
      price: '**** **** **** 3651',
      currency: '11 / 2020',
      url: require('../../../../../Assets/Img/cardLogo2-removebg-preview.png'),
    },
    {
      id: 1,
      label: '2nd FX',
      value: '2nd FX',
      price: '**** **** **** 9251',
      currency: '09 / 2021',
      url: require('../../../../../Assets/Img/apple-pay-icon-28-removebg-preview.png'),
    },
    {
      id: 3,
      label: '2nd FX',
      value: '2nd FX',
      price: '**** **** **** 9251',
      currency: '09 / 2021',
      url: require('../../../../../Assets/Img/ALIPAye.png'),
    },
  ];
  const data4 = [
    {
      id: 1,
      label: 'MTN',
      value: 'MTN',
      price: '**** **** **** 9251',
      currency: '09 / 2021',
      url: require('../../../../../Assets/mtn.png'),
    },
    {
      id: 3,
      label: 'AliPay',
      value: 'AliPay',
      price: '**** **** **** 9251',
      currency: '09 / 2021',
      url: require('../../../../../Assets/Img/ALIPAye.png'),
    },
  ];
  const data2 = [
    {
      id: 0,
      label: 'Main Account',
      value: 'Main Account',
      price: 'OCBC BANK',
      currency: '8732 6920 8237 7201',
      url: require('../../../../../Assets/Img/cardLogo3.png'),
    },
    {
      id: 1,
      label: '2nd FX',
      value: '2nd FX',
      price: 'standard chartered',
      currency: '8723 6923 7491',
      url: require('../../../../../Assets/Img/card-logo-copy-3.png'),
    },
    {
      id: 2,
      label: '2nd FX',
      value: '2nd FX',
      price: 'eastwest bank',
      currency: '762 351 928 182',
      url: require('../../../../../Assets/Img/cardLogo.png'),
    },

    {
      id: 4,
      label: '2nd FX',
      value: '2nd FX',
      price: 'posb bank',
      currency: '0276 3817 2698',
      url: require('../../../../../Assets/Img/card-logo-copy-3.png'),
    },
  ];

 

  const onSelect = item => {
    if (item.value == 'MTN' || item.value == "Main Account") {
      navigation.navigate('AmountTopup', {item, data});
    } else {
      Toast.show(`Unavailable method`);
    }
  };

  const closeBottomUp3 = useCallback(() => {
    bottomSheetModalRef3.current.close();
  }, []);

  const handlePresentModalSelect = useCallback(() => {
    bottomSheetModalRef3.current?.present();
  }, []);

  return (
    <ReturnHeader
      title={'Top up method'}
      goBack={() => {
        navigation.goBack();
      }}>
      <>
        <ScrollView
          contentContainerStyle={{width: SIZES.width}}
          showsVerticalScrollIndicator={false}>
          <View style={{padding: 20}}>
            <View style={styles.topinuptxt}>
              <Txt lineHeight={20} color={COLORS.slateGrey} fontSize={14}>
                You are topping up your {data?.label} account in euro. Choose a
                top up method below:
              </Txt>
            </View>

            <CreditDebit
              title={'Credit / Debit Cards'}
              data={data1}
              onSelect={onSelect}
            />
            <Space space={20} />
            {/* <BankAcccounts title={"Bank Accounts"} data={data2} /> */}
            {/* <Space space={20} /> */}
            <BankAcccounts
              title={'Mobile payements'}
              data={data4}
              onSelect={onSelect}
            />
            <Space space={20} />
            <CreditDebit title={'Wallets'} data={data3} onSelect={onSelect} />
            <Space space={20} />

            <PrepaidCard
              onPress={handlePresentModalSelect}
              title={'Prepaid Card'}
            />

            <Space space={120} />
          </View>
        </ScrollView>
      </>

      <BottomSheetSelect
        bottomSheetModalRef={bottomSheetModalRef3}
        onPress={handlePresentModalSelect}
        closeBottomUp2={closeBottomUp3}
      />
    </ReturnHeader>
  );
};
export default TopUp;

const styles = StyleSheet.create({
  topinuptxt: {
    padding: 20,
  },
});
