import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {createParticipants, resetSuccesParticipants} from '../../../../../../redux/Features/Tontine/Participants/create/slice';
import {deleteSelectedListPayers, resetPayers} from '../../../../../../redux/Features/Tontine/ManagePayers';
import {deleteSelectedList} from '../../../../../../redux/Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare';
import {resetBeneficiaries} from '../../../../../../redux/Features/Tontine/Participants/getBeneficiaires/slice';
import {createNotification} from '../../../../../../redux/Features/Tontine/Participants/SendNotify/slice';

export function UsePayers() {
  const navigation = useNavigation();
  const {selectedconnectUser} = useSelector(state => ({
    ...state.payers,
  }));

  const {TypeOfParticipant} = useSelector(state => ({
    ...state.createParticipants,
  }));
  const dispatch = useDispatch();

  const onSubmit = async data => {
    console.log('data', data);
  };

  const {token} = useSelector(state => ({...state.token}));

  const createPayers = props => {
    const {selectedconnectUser, GlobalBen, type, projectId} = props;

    if (selectedconnectUser.length == 0) {
      Toast.show('choose connected users');
    } else {
      const userId = GlobalBen.map(i => {
        return i.userId ? i.userId : null;
      });

      let obj = {
        appUsers: userId,
        noneAppUsers: [],
        projectId,
        token,
        type,
      };

      let object = {
        onSuccesAction,
        onErrorAction,
        obj,
      };

      dispatch(createParticipants(object));
    }
  };


  const createBenef = (props)=>{
    const {selectedconnectUser, GlobalBen, projectId} = props;

    if (selectedconnectUser.length == 0) {
      Toast.show('choose connected users');
    } else {
      const userId = GlobalBen.map(i => {
        return i.userId ? i.userId : null;
      });

      let obj = {
        appUsers: userId,
        noneAppUsers: [],
        projectId,
        token,
        type: 'PAYER_AND_BENEFICIARY',
      };

      let object = {
        onSuccesAction,
        onErrorAction,
        obj,
      };

      dispatch(createParticipants(object));
    }
  }

  const deviceTokenFromConnectedUsers = selectedconnectUser?.map(i => {
    return i?.device?.deviceToken
      ? i?.device?.deviceToken
      : i?.device[0]?.deviceToken;
  });

  const onSuccesAction = data => {
    const {participants, projectId,routeData} = data;
    let ids = participants?.map(el => {
      return el.participantId;
    });

    let object = {};

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

      const onNotifySuccess = () => {
        let obje = {
          projectId: projectId,
          token,
        };
        if (TypeOfParticipant === 'PAYER') {
          navigation.navigate('ViewPayersList', {
            projectId,
            routeData: 'null',
            object: obje,
          }),
            dispatch(resetSuccesParticipants());
          dispatch(deleteSelectedListPayers());
        } else {
          dispatch(resetSuccesParticipants()),
            navigation.navigate('ViewBenefeciareList', {
              projectId,
              routeData: 'null',
              object: obje,
            });

          dispatch(resetBeneficiaries());
          dispatch(deleteSelectedList());
        }
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
    }
  };
  const onErrorAction = () => {
    dispatch(resetSuccesParticipants());
    dispatch(resetPayers());
    dispatch(deleteSelectedListPayers());
  };

  return {
    onSubmit,
    dispatch,
    createPayers,
    createBenef
  };
}
