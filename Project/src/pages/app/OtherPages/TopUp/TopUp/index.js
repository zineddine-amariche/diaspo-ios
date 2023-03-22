import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, ScrollView, Image, Platform} from 'react-native';

import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../components/Buttons';
import Space from '../../../../../components/Space';
import {Head, Txt} from '../../../../../components/utils';
import CreatedSuccess from '../../../../../components/views/Layouts/AuthLayout/Model';
import {COLORS, SIZES} from '../../../../../theme';
import BankAcccounts from './components/Bank Acounts';
import CreditDebit from './components/Card debit';
import PrepaidCard from './components/PrepaidCard';
import ViewT1 from '../../../../../components/views/CardViewType1';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {Formik} from 'formik';
import {useAmount} from './Hooks';
import PrimaryInput from '../../../../../components/Input';

import illusphone from '../../../../../Assets/Img/illusphone.png';
import illusErr from '../../../../../Assets/Img/illusErr.png';
import BottomSheetSelect from './BottomSheetSelect';
import ReturnHeader from '../../../../../components/Headers/root/ReturnHeader';

const TopUp = ({navigation, navigation: {goBack}, route}) => {
  const bottomSheetModalRef3 = useRef(null);

  const {data} = route.params;
  // console.log("data", data);
  const [success, setsuccess] = useState(false);
  const [error, setError] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);


  const onDissmisError = useCallback(() => {
    setError(false);
  }, []);
  const onError = useCallback(() => {
    setError(true);
  }, []);

  const data1 = [
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
    navigation.navigate('AmountTopup', {item,data});
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
                You are topping up your {data.label} account in euro. Choose a
                top up moethod below:
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
            <BankAcccounts title={'Mobile payements'} data={data4} onSelect={onSelect}/>
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

      <CreatedSuccess Visible={success} onDissmis={onDissmis} top={90}>
        {BodyModel ? <BodyModel onDissmis={onDissmis} /> : null}
      </CreatedSuccess>

      <CreatedSuccess Visible={error} onDissmis={onDissmisError} top={90}>
        {BodyModel ? <BodyModelErr onDissmis={onDissmisError} /> : null}
      </CreatedSuccess>
    </ReturnHeader>
  );
};
export default TopUp;

const BodyModel = ({onDissmis}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusphone} style={{width: '100%'}} />

        <Head
          //  fontFamily={"Poppins-Bold"}
          style={{padding: 20, textAlign: 'center'}}>
          Transfered successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            //fontFamily: "Poppins-SemiBold",
          }}>
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            12,000 euro
          </Txt>{' '}
          has been transfered successfully to
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            {' '}
            Faith Felicity (+44 7538 110953).
          </Txt>
          You can check in your account
          <Txt Bold={'400'} color={COLORS.orangeYellow} fontSize={17}>
            {' '}
            transaction histopy.
          </Txt>
          .
        </Txt>

        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
      </View>
    </>
  );
};
const BodyModelErr = ({onDissmis}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusErr} style={{width: '100%'}} />

        <Head
          //  fontFamily={"Poppins-Bold"}
          style={{padding: 20, textAlign: 'center'}}
          color={COLORS.coral}>
          Topped up unsuccessfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            //fontFamily: "Poppins-SemiBold",
          }}>
          Sorry, something went wrong. Please try agian.
        </Txt>

        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  topinuptxt: {
    padding: 20,
  },
 
});


 