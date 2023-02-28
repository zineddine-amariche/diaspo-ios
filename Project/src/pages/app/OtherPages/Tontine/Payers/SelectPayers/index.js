import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Image,
  useWindowDimensions,
  ToastAndroid,
} from 'react-native';

import ImgBack from '../../../../../../Assets/Img/HomeBack.png';
import Space from '../../../../../../components/Space';
import BottomSheetAddTontine from './BottomSheetAdd';

import Form0 from './Components/Forms/Form0';
import Form1 from './Components/Forms/Form1';
import Form2 from './Components/Forms/Form2';

import Img2 from '../../../../../../Assets/Img/paper.png';
import Img3 from '../../../../../../Assets/Img/paper2.png';
import Img1disable from '../../../../../../Assets/Img/paper1NonAcitve.png';
import Img3disable from '../../../../../../Assets/Img/paper3NonAcitve.png';
import {useSelector} from 'react-redux';
import {TabView} from 'react-native-tab-view';
import BottomSheetEditePayer from './BottomSheetEditePayer';
import SearchHeader from '../../../../../../components/Headers/root/SearchHeader';
import {
  deleteSelectedListPayers,
  resetPayers,
} from '../../../../../../redux/Features/Tontine/ManagePayers';

import {resetSuccesParticipants} from '../../../../../../redux/Features/Tontine/Participants/create/slice';
import {createParticipants} from '../../../../../../redux/Features/Tontine/Participants/create/slice';
import BottomConfirmBTN from './Components/RenderItems/Bottom.ConfirmBTN';
import {useAddNewPersson} from './Hooks';
import TabsItems from './Components/RenderItems/Tabs.Items';
import {createNotification} from '../../../../../../redux/Features/Tontine/Participants/SendNotify/slice';
import {useIsFocused} from '@react-navigation/native';
import styles from './styles';
import ModelRemove from '../Components/models/Model.Remove';
import ModelUseAsBeneficiary from '../Components/models/Model.useAsBeneficiary';
import ModelConfirmCreatePayers from '../Components/models/Model.ConfirmCreatePayers';

const Payer = ({navigation, route}) => {
  const {projectId, type, routeData} = route.params;

  const {
    dispatch,
    selectedconnectUser,
    selectedconnectUserContacts,
    selectedconnectNonUserApp,
    laoder,
    token,
    bottomSheetModalRef,
    bottomSheetModalRef2,
    goBackFun,
  } = useAddNewPersson();

  // const [IsOpen, setIsOpen] = useState(false);
  const [success, setsuccess] = useState(false);
  const [success2, setsuccess2] = useState(false);

  const onDissmis2 = useCallback(() => {
    setsuccess2(false);
  }, []);
  const onSuccess2 = useCallback(() => {
    setsuccess2(true);
  }, []);
  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);
  const onSuccess = useCallback(() => {
    setsuccess(true);
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const closeDrawer = useCallback(() => {}, []);
  const handlePresentEditModal = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const closeEditModal = useCallback(() => {}, []);

  const [GlobalBen, setGlobalBen] = useState([]);
  const [GlobalBen2, setGlobalBen2] = useState([]);
  const [GlobalBen3, setGlobalBen3] = useState([]);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'Connected ',
      sous: 'users',
      img: Img3,
      Imgdisable: Img1disable,
    },
    {
      key: 'second',
      title: 'Your ',
      sous: 'contacts',
      img: Img2,
      Imgdisable: Img3disable,
    },
    // {
    //   key: "third",
    //   title: "Non-app ",
    //   sous: "users",
    //   img: Img1,
    //   Imgdisable: Img2disable,
    // },
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <Form0 index={index} setGlobalBen={setGlobalBen} />;
      case 'second':
        return <Form1 setGlobalBen={setGlobalBen2} />;
      case 'third':
        return (
          <Form2
            onPress={handlePresentModalPress}
            onSuccess={onSuccess}
            onEdit={handlePresentEditModal}
            index={index}
            setGlobalBen={setGlobalBen3}
            GlobalBen={GlobalBen3}
          />
        );
    }
  };

  let ARR =
    !selectedconnectUser ||
    !selectedconnectUserContacts ||
    !selectedconnectNonUserApp
      ? []
      : [
          ...selectedconnectUser,
          ...selectedconnectUserContacts,
          ...selectedconnectNonUserApp,
        ];

  const {loadingPayers, result, isSuccess} = useSelector(state => ({
    ...state.selecetdPayers,
  }));

  const {
    data,
    isError,
    status,
    TypeOfParticipant,
    isLoading,
    message,
    participants,
    nonAppUserParticipants,
  } = useSelector(state => ({
    ...state.createParticipants,
  }));

  const deviceTokenFromConnectedUsers = selectedconnectUser?.map(i => {
    return i?.device?.deviceToken
      ? i?.device?.deviceToken
      : i?.device[0]?.deviceToken;
  });
  let ids = participants?.map(el => {
    return el.participantId;
  });

  let object = {};

  const {user} = useSelector(state => ({
    ...state.auth,
  }));
  const isFocused = useIsFocused();

  useEffect(() => {
    if (
      status === 'success' &&
      isFocused &&
      (TypeOfParticipant === 'PAYER' ||
        TypeOfParticipant === 'PAYER_AND_BENEFICIARY')
    ) {
      console.log(' ----------- Payers List : Success ----------- ');

      if (ids && ids.length > 0) {
        ids?.forEach(element => {
          object = {
            registration_ids: deviceTokenFromConnectedUsers,
            notification: {
              body: `You has been invited to join “${routeData?.name}” as a payer`,
              OrganizationId: '2',
              content_available: true,
              priority: 'high',
              subtitle: 'Dipaso Invitation',
              title: 'Dipaso - Tontine Invitation ',
              participantsId: element,
              projectId,
            },
            data: {
              priority: 'high',
              sound: 'app_sound.wav',
              content_available: true,
              bodyText: `You has been invited to join “${routeData?.name}” as a payer`,
              organization: 'Dipaso',
              participantsId: element,
              projectId,
              timer: new Date(),
              for: 'invitation',
              navigate: 'InvitationTontine',
              forgroundView: 'Notifications',
              title: 'Dipaso - Tontine Invitation ',
            },
          };
        });

        // return object
      }

      dispatch(createNotification(object));
      let obje = {
        projectId: projectId,
        token: user.AccessToken,
      };

      if (TypeOfParticipant === 'PAYER') {
        navigation.navigate('ViewPayersList', {
          projectId,
          routeData: 'null',
          object: obje,
        }),
          dispatch(resetSuccesParticipants());
      } else {
        dispatch(resetSuccesParticipants()),
          navigation.navigate('ViewBenefeciareList', {
            projectId,
            routeData: 'null',
            object: obje,
          });
      }
      setTimeout(
        () => dispatch(resetPayers(), dispatch(deleteSelectedListPayers())),
        2000,
      );
    } else if (isError) {
      console.log('isError', isError);
      // ToastAndroid.show(isError.toString(), ToastAndroid.SHORT);
      dispatch(resetSuccesParticipants());
      setTimeout(
        () => dispatch(resetPayers(), dispatch(deleteSelectedListPayers())),
        2000,
      );
    }
  }, [status, isLoading]);

  // handle model use As beneficiary

  const NavToCnfPayer = () => {
    const userId = GlobalBen.map(i => {
      return i.userId ? i.userId : null;
    });

    let obj = {
      appUsers: userId,
      noneAppUsers: GlobalBen3,
      projectId,
      token,
      type,
    };
    dispatch(createParticipants(obj));
  };

  const NavToCnfBenef = () => {
    let ARR = [];
    GlobalBen.map(i => {
      return ARR.push(i.userId);
    });
    GlobalBen3;

    let obj = {
      appUsers: ARR,
      noneAppUsers: GlobalBen3,
      projectId,
      token,
      type: 'PAYER_AND_BENEFICIARY',
    };
    dispatch(createParticipants(obj));
  };

  // HandleShowModel confirm create the list
  const [showModelUseAsbenef, setshowModelUseAsbenef] = useState(false);

  const closeModelUseAsbenef = useCallback(() => {
    setshowModelUseAsbenef(false);
  }, []);

  const openModelConfirmCreatePayers = useCallback(() => {
    setshowModelUseAsbenef(true);
  }, []);

  const handleOnPressYes = () => {
    setshowModelUseAsbenef(false);
    onSuccess2();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SearchHeader
        Cancel="Return"
        goBack={() => goBackFun(navigation)}
        title={'Select Payers'}
      />

      <View style={styles.Tabs}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={index => setIndex(index)}
          initialLayout={{width: layout.width}}
          renderTabBar={TabsItems}
          removeClippedSubviews={false}
          swipeEnabled
          swipeVelocityImpact={0.2}
          gestureHandlerProps={{
            activeOffsetX: [-30, 30], // To solve swipe problems on Android
          }}
        />
        <Space space={5} />
      </View>

      {/* Button Confirm */}

      <BottomConfirmBTN
        ARR={ARR}
        GlobalBen={GlobalBen}
        GlobalBen2={GlobalBen2}
        GlobalBen3={GlobalBen3}
        index={index}
        projectId={projectId}
        type={type}
        laoder={laoder}
        loadingPayers={isLoading}
        navigation={navigation}
        NavToCnfPayer={NavToCnfPayer}
        routeData={routeData}
        deviceTokenFromConnectedUsers={deviceTokenFromConnectedUsers}
        //handleConfirmButton
        onSuccess2={openModelConfirmCreatePayers}
      />

      {/* Models */}

      <ModelRemove success={success} onDissmis={onDissmis} />
      <ModelUseAsBeneficiary
        success2={success2}
        onDissmis2={onDissmis2}
        NavToCnfBenef={NavToCnfBenef}
        NavToCnfPayer={NavToCnfPayer}
      />

      <ModelConfirmCreatePayers
        success={showModelUseAsbenef}
        onDissmis={closeModelUseAsbenef}
        pressNo={closeModelUseAsbenef}
        pressYes={handleOnPressYes}
      />

      {/* Bottom Sheet Models */}

      <BottomSheetAddTontine
        bottomSheetModalRef={bottomSheetModalRef}
        onSuccess={onSuccess}
        closeDrawer={closeDrawer}
      />

      <BottomSheetEditePayer
        bottomSheetModalRef={bottomSheetModalRef2}
        onSuccess={onSuccess}
        closeDrawer={closeEditModal}
      />
    </SafeAreaView>
  );
};
export default Payer;
