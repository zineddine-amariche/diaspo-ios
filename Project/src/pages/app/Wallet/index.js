import {Alert, Linking, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import WalletLayout from '../../../components/views/Layouts/AppLayout/walletLayout';
import Space from '../../../components/Space';
import BottomSheetTopUpAccount from './Models/BottomSheetTopUpAccount';
import {useRef} from 'react';
import BottomSheetSelect from './Models/BottomSheetSelect';
import WalletHead from '../../../components/Headers/root/WalletHeader';
import ActiveTontine from './Components/2 - ActiveTontine';
import WalletConnection from './Components/1 - WalletConnection';
import AccountsBox from './Components/0 - AccountBox/components/RectangleAccount';
import {UseWallets} from './Hooks';
import {useIsFocused} from '@react-navigation/native';
import {getTontines} from '../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import {useSelector} from 'react-redux';
import Spiner from '../../../components/spiner';

const dataAccounts = [
  {
    name: 'Diaspo Account',
    price: '32,097.89',
  },
  {
    name: 'Tontine Account',
    price: '2,097.89',
  },
  {
    name: '2ad Account',
    price: '89,097.89',
  },
];

const Wallet = ({navigation}) => {
  const isFocused = useIsFocused();

  const {tontines, isLoading, message} = useSelector(state => ({
    ...state.tontines,
  }));

  const {object, dispatch} = UseWallets();
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef3 = useRef(null);

  const [Change, setChange] = useState();
  const [price, setPrice] = useState();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalSelect = useCallback(() => {
    bottomSheetModalRef3.current?.present();
  }, []);

  const closeBottomUp3 = useCallback(() => {
    bottomSheetModalRef3.current.close();
  }, []);

  const closeBottomUp1 = useCallback(() => {
    bottomSheetModalRef.current.close();
  }, []);

  const ChangeAccount = Item => {
    setChange(Item.label);
    setPrice(Item.price);
    closeBottomUp3();
  };

  useEffect(() => {
    dispatch(getTontines(object));
  }, [isFocused]);

  return (
    <>
      {isLoading ? (
        <Spiner/>
      ) : (
        <WalletLayout>
          <WalletHead
            title={'My Wallet'}
            openDrawer={() => navigation.toggleDrawer()}
          />

          <ScrollView contentContainerStyle={{}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{flexDirection: 'row', paddingRight: 20}}>
              {dataAccounts.map((item, index) => {
                return (
                  <View key={index}>
                    <AccountsBox
                      onPress={handlePresentModalSelect}
                      Change={Change}
                      price={price}
                      item={item}
                      handlePresentModalPress={handlePresentModalPress}
                    />
                  </View>
                );
              })}
            </ScrollView>

            <WalletConnection navigation={navigation} />
            <Space space={20} />
            <ActiveTontine navigation={navigation} />
            <Space space={20} />
            {/* <RecentTransaction navigation={navigation} /> */}
            <Space space={70} />
          </ScrollView>

          {/* Account */}
          <BottomSheetTopUpAccount
            bottomSheetModalRef={bottomSheetModalRef}
            onPress={handlePresentModalPress}
            closeBottomUp1={closeBottomUp1}
            navigation={navigation}
          />

          {/* Select Diaspo Account */}
          <BottomSheetSelect
            bottomSheetModalRef={bottomSheetModalRef3}
            onPress={handlePresentModalSelect}
            onPress2={handlePresentModalPress}
            closeBottomUp2={closeBottomUp3}
            navigation={navigation}
            ChangeAccount={ChangeAccount}
          />
        </WalletLayout>
      )}
    </>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
