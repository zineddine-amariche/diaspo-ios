import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, useWindowDimensions} from 'react-native';

import Space from '../../../../../../components/Space';
import {TabView} from 'react-native-tab-view';

import Form0 from './Components/Forms/Form0';
import Form1 from './Components/Forms/Form1';

import Img2 from '../../../../../../Assets/Img/paper.png';
import Img3 from '../../../../../../Assets/Img/paper2.png';
import Img1disable from '../../../../../../Assets/Img/paper1NonAcitve.png';
import Img3disable from '../../../../../../Assets/Img/paper3NonAcitve.png';
import {useDispatch, useSelector} from 'react-redux';

import {
  deleteSelectedList,
  resetBeneficaire,
} from '../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare';
import ModelRemove from '../components/Models/Model.Remove';
import TabItems from './Components/RenderItems/Tab.Items';
import BottomConfirmButton from './Components/RenderItems/Bottom.ConfirmButton';

import styles from './styles';
import ModelConfirmCreateParticipants from '../components/Models/Model.ConfirmCreateParticipants';
import SearchLayout from '../../../../../../components/views/Layouts/AppLayout/ScreenLayout/SearchLayout';
import {UseBenef} from '../Hooks/useBenef';

const durationMs = 350;

const Benefeciare = ({navigation, route}) => {
  const dispatch = useDispatch();
  const layout = useWindowDimensions();

  const {onSubmit} = UseBenef();

  const {projectId, type, routeData, title} = route.params;
  const {token} = useSelector(state => ({...state.token}));

  const {isLoading} = useSelector(state => ({
    ...state.createParticipants,
  }));

  const [success, setsuccess] = useState(false);

  const onDissmis = useCallback(() => {
    setsuccess(false);
  }, []);

  const [success2, setsuccess2] = useState(false);

  const onDissmis2 = useCallback(() => {
    setsuccess2(false);
  }, []);
  const onSuccess2 = useCallback(() => {
    setsuccess2(true);
  }, []);

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
  ]);

  const [GlobalBen, setGlobalBen] = useState([]);
  const [GlobalBen2, setGlobalBen2] = useState([]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <Form0 TabIndex={index} setGlobalBen={setGlobalBen} />;
      case 'second':
        return <Form1 setGlobalBen={setGlobalBen2} />;
    }
  };

  return (
    <SearchLayout
      title={title}
      onPress={() => {
        navigation.navigate('Tontine');
        setTimeout(
          () => dispatch(resetBeneficaire(), dispatch(deleteSelectedList())),
          durationMs,
        );
      }}>
      <View style={{flex: 1, width: '100%'}}>
        <View style={styles.Tabs}>
          <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={index => setIndex(index)}
            initialLayout={{width: layout.width}}
            renderTabBar={TabItems}
            removeClippedSubviews={false}
            swipeEnabled
            swipeVelocityImpact={0.2}
            gestureHandlerProps={{
              activeOffsetX: [-30, 30], // To solve swipe problems on Android
            }}
          />
        </View>
        <Space space={5} />
      </View>

      <BottomConfirmButton
        GlobalBen={GlobalBen}
        projectId={projectId}
        GlobalBen2={GlobalBen2}
        loading={isLoading}
        navigation={navigation}
        index={index}
        type={type}
        token={token}
        title={title}
        routeData={routeData}
        showPopUp={onSuccess2}
      />
      <ModelRemove success={success} onDissmis={onDissmis} />

      <ModelConfirmCreateParticipants
        success={success2}
        onDissmis={onDissmis2}
        pressNo={onDissmis2}
        pressYes={ ()=>{
            let props = {
              GlobalBen,
              type,
              projectId,
            };
          onSubmit(props)
        
        }}
      />
    </SearchLayout>
  );
};
export default Benefeciare;

{
  /* <ModelReoder
        success={success2}
        onDissmis={onDissmis2}
        pressNo={pressNo}
        pressYes={pressYes}
      /> */
}

// let ids = participants?.map(el => {
//   return el.participantId;
// });

// let object = {};
// const isFocused = useIsFocused();
// useEffect(() => {
//   if (
//     status === 'success' &&
//     isFocused &&
//     (TypeOfParticipant === 'BENEFICIARY' ||
//       TypeOfParticipant === 'PAYER_AND_BENEFICIARY' ||
//       TypeOfParticipant === 'TONTINE_ORDINARY_TONTINE')
//   ) {
//     console.log('------------- create BENEFICIARY Success  -------------- ');

// if (ids && ids.length > 0) {
//   ids?.forEach(element => {
//     object = {
//       registration_ids: deviceTokenFromConnectedUsers,
//       notification: {
//         body: `You has been invited to join “${routeData?.name}” as a beneficiary`,
//         OrganizationId: '2',
//         content_available: true,
//         priority: 'high',
//         subtitle: 'Dipaso Invitation',
//         title: 'Dipaso - Tontine Invitation ',
//         participantsId: element,
//         projectId,
//       },
//       data: {
//         priority: 'high',
//         sound: 'app_sound.wav',
//         content_available: true,
//         bodyText: `You has been invited to join “${routeData?.name}” as a beneficiary`,
//         organization: 'Dipaso',
//         participantsId: element,
//         projectId,
//         timer: new Date(),
//         for: 'invitation',
//         navigate: 'InvitationTontine',
//         forgroundView: 'Notifications',
//         title: 'Dipaso - Tontine Invitation ',
//       },
//     };
//   });
// }

// dispatch(createNotification(object));

// setsuccess2(false);
//     dispatch(resetSuccesParticipants());
//     navigation.navigate('ViewBenefeciareList', {
//       projectId,
//       routeData, // i get this value from : server
//       title: titree,
//     });

//     setTimeout(() => {
//       dispatch(resetBeneficiaries()), dispatch(deleteSelectedList());
//     }, 2000);
//   } else if (isError) {
//     console.log('isError', isError);
//     setTimeout(
//       () => dispatch(resetBeneficiaries(), dispatch(deleteSelectedList())),
//       2000,
//     );
//   }
// }, [status, TypeOfParticipant]);
