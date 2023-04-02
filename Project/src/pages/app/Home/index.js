import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import PrimaryHead from '../../../components/Headers/root/PrimaryHead';
import Main from './Components/main';
import WalletsList from '../../../components/views/Rectangle-Price';
import Recent from './Components/Recent';
import Events from './Components/Events';
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
import BottomSheetTopUpAccount from './Components/BottomSheetTopUpAccount';
import BottomSheet from '../../../components/Models/BottomSheet';
import {Modalize} from 'react-native-modalize';
import {COLORS} from '../../../theme';
import {DisableBottomNav} from '../../../redux/Features/App/Appslice';
import ContentRenders from './Components/BottomSheetTopUpAccount/ContentRenders';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const bottomSheetModalRef3 = useRef(null);
  const KycRef = useRef(null);
  const {object, objectUpdate, objectWallet} = UseHome();

  const [price, setPrice] = useState();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalCashIn = useCallback(() => {
    bottomSheetModalRef2.current.present();
  }, []);

  const handlePresentModalSelect = useCallback(() => {
    // bottomSheetModalRef3.current?.present();
  }, []);

  const closeBottomUp2 = useCallback(() => {
    bottomSheetModalRef2.current.forceClose();
  }, []);

  const closeBottomUp3 = useCallback(() => {
    bottomSheetModalRef3.current.close();
  }, []);

  const closeBottomKyc = useCallback(() => {
    KycRef.current.close();
  }, []);

  const closeBottomUp1 = useCallback(() => {
    bottomSheetModalRef.current.forceClose();
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

  // const message = useSelector(state => state.walletAccounts);
  // console.log('message', message)

  useEffect(() => {
    dispatch(updateNotify(objectUpdate));
  }, [objectUpdate.data.deviceToken, objectUpdate.data.deviceOs]);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getUserInformations(object.userId));
  }, [isFocused]);

  const {isLoading} = useSelector(state => state.walletAccounts);

  // console.log('bottomSheetModalRef2', bottomSheetModalRef2);
  useEffect(() => {
    if (userId && token) {
      dispatch(walletAccounts(objectWallet));
    }
  }, [token, userId, isFocused]);
 

 
 

 
  const handleCloseModal = () => {
    modalRef.current?.close();
    dispatch(DisableBottomNav(false));
  };

  const onOpen = () => {
    modalRef.current?.open();
    dispatch(DisableBottomNav(true));
  };

  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <HomeLayout>
          <PrimaryHead
            title={'Diaspo'}
            openDrawer={() => navigation.toggleDrawer()}
            navigation={() => navigation.navigate('Notifications')}
          />
          <ScrollView contentContainerStyle={{}}>
            <Main navigation={navigation} onPress={onOpen} />

            <WalletsList onPress={handlePresentModalSelect} />
            <Space space={17} />
            <Recent
              onPress={() => {
                navigation.navigate('Categories');
              }}
            />
            <Space />
            <Events
              onPress={() => {
                // navigation.navigate("Categories");
              }}
            />

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

          {/* <BottomSheet
            ref={modalRef}
            onClose={closeModal}
            modalType={'modal2'} // or 'modal2', 'modal3', 'modal4'
          /> */}

          <Modalize
            // HeaderComponent={<MyHeader />} headerProps={headerProps}
            snapPoint={800}
            ref={modalRef}
            overlayStyle={{
              backgroundColor: COLORS.blueGreenOpacity9,
            }}
            adjustToContentHeight={false}>
            {/* <UserInfo test={'test'} handleCloseModal={handleCloseModal} /> */}
            {/* {children} */}
            <ContentRenders
              navigation={navigation}
               closeAll={handleCloseModal}
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
