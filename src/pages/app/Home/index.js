import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import PrimaryHead from '../../../components/Headers/root/PrimaryHead';
import Main from './Components/main';
import WalletsList from '../../../components/views/Rectangle-Price';
import Recent from './Components/Recent';
import HomeLayout from '../../../components/views/Layouts/AppLayout/HomeLayout';
import Space from '../../../components/Space';
import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheetSelect from './Components/BottomSheetSelect';
import {walletAccounts} from '../../../redux/Features/WalletAccount/Slice';
import {updateNotify} from '../../../redux/Features/Tontine/Participants/updateUserNotify/slice';
import {getUserInformations} from '../../../redux/Features/authentification/User_informations/slice';
import Spiner from '../../../components/spiner';
import BottomSheetKyc from './Components/BottomSheetKYC';
import {useIsFocused} from '@react-navigation/native';
import {UseHome} from './Hooks/useHooks';
import {Modalize} from 'react-native-modalize';
import {COLORS} from '../../../theme';
import ContentRenders from './Components/BottomSheetTopUpAccount/ContentRenders';
import {getAllTransactions} from '../../../redux/Features/Transactions/Slice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const modalRef2 = useRef(null);
  const modalRef3 = useRef(null);
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef3 = useRef(null);
  const KycRef = useRef(null);
  const {object, objectUpdate, objectWallet} = UseHome();

  const [price, setPrice] = useState();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalSelect = useCallback(() => {
    // bottomSheetModalRef3.current?.present();
  }, []);

  const closeBottomUp3 = useCallback(() => {
    bottomSheetModalRef3.current.close();
  }, []);

  const closeBottomKyc = useCallback(() => {
    KycRef.current.close();
  }, []);

  const ChangeAccount = Item => {
    setPrice(Item.balance);
    closeBottomUp3();
  };

  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  let token = user?.AccessToken;
  let userId = user?.userId;

  useEffect(() => {
    dispatch(updateNotify(objectUpdate));
  }, [objectUpdate.data.deviceToken, objectUpdate.data.deviceOs]);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getUserInformations(object.userId));
  }, [isFocused]);

  const {isLoading, accountId} = useSelector(state => state.walletAccounts);

  useEffect(() => {
    if (userId && token) {
      dispatch(walletAccounts(objectWallet));
    }
  }, [token, userId, isFocused]);

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  const onOpen = ty => {
    if (ty == 'cashout') {
      modalRef.current?.open();
    } else if (ty == 'cashin') {
      modalRef2.current?.open();
    } else {
      modalRef3.current?.open();
    }
  };

  const onErrorAction = () => {
    console.log('error');
  };


  useEffect(() => {
    let object = {
      accountId,
      userId,
      onErrorAction,
    };
    if (accountId) {
      dispatch(getAllTransactions(object));
    }
  }, [accountId, isFocused]);
  const {informationsUser} = useSelector(state => state.userInformations);
  const nav = (to, data) => {
    navigation.navigate(to, data);
  };

  let obje = {
    accountId,
    userId,
  };
  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <HomeLayout>
          <PrimaryHead
            title={`Welcome ${informationsUser?.data?.walletAccountUser?.firstName} ${informationsUser?.data?.walletAccountUser?.lastName}`}
            openDrawer={() => navigation.toggleDrawer()}
            navigation={() => navigation.navigate('Notifications')}
          />
          <ScrollView contentContainerStyle={{}}>
            <Main navigation={navigation} onPress={onOpen} />

            <WalletsList onPress={handlePresentModalSelect} />
            <Space space={17} />
            <Recent
              onPress={() => {
                navigation.navigate('HistoryTransaction',{info:obje});
              }}
            />
            <Space />
            {/* <Events
              onPress={() => {
                // navigation.navigate("Categories");
              }}
            /> */}

            <Space space={140} />
          </ScrollView>

          {/* Account */}
          {/* <BottomSheetTopUpAccount
            bottomSheetModalRef={bottomSheetModalRef}
            bottomSheetModalRef2={bottomSheetModalRef2}
            onPress={handlePresentModalPress}
            navigation={navigation}
            closeBottomUp1={closeBottomUp1}
            closeBottomUp2={closeBottomUp2}
          /> */}

          {/* Select Type */}
          {/* <BottomSheetCashIn
            bottomSheetModalRef={bottomSheetModalRef2}
            onPress={handlePresentModalCashIn}
            onPress2={handlePresentModalPress}
            closeBottomUp2={closeBottomUp2}
            closeBottomUp1={closeBottomUp1}
            navigation={navigation}
          /> */}

          {/* Select Diaspo Account */}
          {/* ! TO DELETE */}
          <BottomSheetSelect
            bottomSheetModalRef={bottomSheetModalRef3}
            onPress={handlePresentModalSelect}
            onPress2={handlePresentModalPress}
            closeBottomUp2={closeBottomUp3}
            navigation={navigation}
            ChangeAccount={ChangeAccount}
          />

          {/* CREATE BOTTOM SHEET FOR KYC */}

          <BottomSheetKyc
            bottomSheetModalRef={KycRef}
            navigation={navigation}
            close={closeBottomKyc}
          />

          <Modalize
            snapPoint={800}
            ref={modalRef}
            overlayStyle={{
              backgroundColor: COLORS.blueGreenOpacity9,
            }}
            adjustToContentHeight={false}>
            <ContentRenders
              nav={nav}
              type={'cashin'}
              closeAll={handleCloseModal}
            />
          </Modalize>

          <Modalize
            snapPoint={800}
            ref={modalRef2}
            overlayStyle={{
              backgroundColor: COLORS.blueGreenOpacity9,
            }}
            adjustToContentHeight={false}>
            <ContentRenders
              nav={nav}
              closeAll={handleCloseModal}
              type={'cashout'}
            />
          </Modalize>

          <Modalize
            snapPoint={800}
            ref={modalRef3}
            overlayStyle={{
              backgroundColor: COLORS.blueGreenOpacity9,
            }}
            adjustToContentHeight={false}>
            <ContentRenders
              nav={nav}
              closeAll={handleCloseModal}
              type={'transfert'}
            />
          </Modalize>
        </HomeLayout>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});

const UserInfo = ({test, handleCloseModal}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        onPress={() => {
          console.log('test', test);
        }}>
        <Text>slow motions</Text>
      </TouchableOpacity>
      <Space />
      <TouchableOpacity onPress={handleCloseModal}>
        <Text>close slow motions</Text>
      </TouchableOpacity>
    </View>
  );
};
