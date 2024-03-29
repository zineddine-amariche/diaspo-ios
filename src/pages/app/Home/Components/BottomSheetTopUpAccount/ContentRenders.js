import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HView from '../../../../../components/views/HView/HView';
import {Head, Txt} from '../../../../../components/utils';
import {COLORS} from '../../../../../theme';
import Space from '../../../../../components/Space';
import {WhiteButton} from '../../../../../components/Buttons';
import {useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import Intl from 'intl';
import 'intl';
import 'intl/locale-data/jsonp/en';

const ContentRenders = ({nav, type, closeAll}) => {
  const {walletAccount} = useSelector(state => state.walletAccounts);

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          padding: 16,
        }}>
        <Head style={styles.Head}>Select a account to {type}</Head>
        <ScrollView>
          {walletAccount?.walletAccounts?.map((i, ind) => {
            const formattedNumber = new Intl.NumberFormat('en-US', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(i?.balance / 100);
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => {
                  // closeAll();
                  // setTimeout(() => {
                  if (type == 'cashout') {
                    nav('TopUp', {data: i});
                  } else if (type == 'cashin') {
                    nav('CashOut', {data: i});
                  } else {
                    nav('Transfer', {data: i});
                  }
                  // }, 1000);
                }}
                disabled={i.accountType == 'tontine' ? true : false}>
                <View
                  spaceBetween
                  style={[
                    styles.item,
                    {
                      backgroundColor:
                        i.accountType == 'tontine'
                          ? COLORS.opacity1
                          : COLORS.paleGreyTwo,
                    },
                  ]}>
                  <HView>
                    <View
                      style={[
                        styles.Point,
                        {
                          backgroundColor:
                            i.accountType == 'tontine'
                              ? COLORS.gray
                              : COLORS.orangeYellow,
                        },
                      ]}></View>
                    <Txt
                      fontSize={17}
                      color={
                        i.accountType == 'tontine'
                          ? COLORS.gray
                          : COLORS.orangeYellow
                      }>
                      {i.name}
                    </Txt>
                  </HView>
                  <View>
                    <Txt
                      color={
                        i.accountType == 'tontine'
                          ? COLORS.gray
                          : COLORS.blueGreen
                      }
                      style={{lineHeight: 40, fontSize: 17}}>
                      {i.price}
                    </Txt>
                    <Txt
                      color={
                        i.accountType == 'tontine'
                          ? COLORS.gray
                          : COLORS.greyblue
                      }
                      style={{
                        lineHeight: 24,
                        fontSize: 16,
                        alignSelf: 'flex-end',
                      }}>
                      {formattedNumber == 0.0 ? '£ 0' : ` £ ${formattedNumber}`}
                    </Txt>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <WhiteButton
          onPress={() => {
            closeAll();
          }}>
          cancel
        </WhiteButton>
        <Space space={90} />
      </View>
    </>
  );
};

export default ContentRenders;

const styles = StyleSheet.create({
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 3,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    height: 80,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  Head: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
});
