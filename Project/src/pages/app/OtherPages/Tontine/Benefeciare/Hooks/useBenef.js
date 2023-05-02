import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {deleteSelectedList} from '../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare';
import {resetBeneficiaries} from '../../../../../../redux/Features/Tontine/Participants/getBeneficiaires/slice';
import {createNotification} from '../../../../../../redux/Features/Tontine/Participants/SendNotify/slice';
import {createParticipants} from '../../../../../../redux/Features/Tontine/Participants/create/slice';

export function UseBenef() {
  const navigation = useNavigation();
  const {TypeOfParticipant} = useSelector(state => ({
    ...state.createParticipants,
  }));

  let titree =
    TypeOfParticipant === 'PAYER_AND_BENEFICIARY'
      ? 'Participants List'
      : 'Beneficiaries List';

  const {selectedconnectUser} = useSelector(state => ({
    ...state.beneficaire,
  }));

  const dispatch = useDispatch();

  const {token} = useSelector(state => ({...state.token}));

  const deviceTokenFromConnectedUsers = selectedconnectUser?.map(i => {
    return i?.device?.deviceToken
      ? i?.device?.deviceToken
      : i?.device[0]?.deviceToken;
  });

  const onSuccesAction = data => {
    const {participants, projectId, nameTontine, routeData} = data;
    console.log('nameTontine onSuccesAction benef', nameTontine);
    let ids = participants?.map(el => {
      return el.participantId;
    });
    let object = {};

    if (ids && ids.length > 0) {
      ids?.forEach(element => {
        object = {
          registration_ids: deviceTokenFromConnectedUsers,
          notification: {
            body: `You has been invited to join “${nameTontine}” as a beneficiary`,
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
            bodyText: `You has been invited to join “${nameTontine}” as a beneficiary`,
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
    }

    const onNotifySuccess = () => {
      navigation.navigate('ViewBenefeciareList', {
        projectId,
        routeData, // i get this value from : server
        title: titree,
      });
      dispatch(resetBeneficiaries());
      dispatch(deleteSelectedList());
    };

    const onNotifyError = () => {
      Toast.show('send notification failed.');
    };

    let dataObject = {
      object,
      onNotifySuccess,
      onNotifyError,
    };

    dispatch(createNotification(dataObject));
  };

  const onErrorAction = () => {
    dispatch(resetBeneficiaries());
    dispatch(deleteSelectedList());
  };

  const onSubmit = props => {
    const {GlobalBen, type, nameTontine, projectId} = props;

    if (selectedconnectUser.length == 0) {
      Toast.show('choose connected users');
    } else {
      let ARR = [];
      GlobalBen.map(i => {
        return ARR.push(i.userId);
      });

      let obj = {
        appUsers: ARR,
        noneAppUsers: [],
        projectId,
        token,
        type,
        nameTontine,
      };

      let object = {
        onSuccesAction,
        onErrorAction,
        obj,
      };
      dispatch(createParticipants(object));
    }
  };

  return {
    onSubmit,
    dispatch,
  };
}
