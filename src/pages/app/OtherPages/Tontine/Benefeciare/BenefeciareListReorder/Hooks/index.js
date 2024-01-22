import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useCallback} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {createNotification} from '../../../../../../../redux/Features/Tontine/Participants/SendNotify/slice';
import {updateListReorder} from '../../../../../../../redux/Features/Tontine/ManageBenefeciare/PostListReorder/slice';
import Toast from 'react-native-simple-toast';

export function useReoder() {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);
  const HandlehidePass = () => {
    setHidePass(!hidePass);
  };

  const state = {
    name: 'Main account',
    amount: 20,
    frequencyOfPayment: 'WEEKLY',
    currency: 'EUR',
    accountType: 'personal',
    startAt: '',
    endAt: '',
    status: 'IN PROGRESS',
    asAPayer: true,
    retentionRate: '4',
  };

  let schema = Yup.object().shape({
    amount: Yup.string()
      .max(
        20,
        'Amount per person is too long - must be no more than 2 characters.',
      )
      .required('Amount per person  is required'),
    name: Yup.string()
      .max(20, 'Amount is too long - must be no more than 2 characters.')
      .min(4, 'Amount is too short - must be at least 2 characters.')
      .required('Name of totine is required'),

    startAt: Yup.string().required('start date  is required'),
    endAt: Yup.string().required('End date  is required'),
    retentionRate: Yup.string().required('retentionRate is required'),
    frequencyOfPayment: Yup.string().required('Frequency is required'),
    currency: Yup.string().required('Currency is required'),
    status: Yup.string().required('status is required'),
    accountType: Yup.string().required('accountType is required'),
    asAPayer: Yup.string(),
  });

  const [success2, setsuccess2] = useState(false);
  const {ListToReorder} = useSelector(state => state.beneficaire);

  const onDissmis2 = useCallback(() => {
    setsuccess2(false);
  }, []);
  const onSuccess2 = useCallback(() => {
    setsuccess2(true);
  }, []);

  const pressNo = () => {
    onDissmis2();
  };
  const {token} = useSelector(state => ({...state.token}));

  const pressYes = (navigation, projectId) => {
    // navigation.navigate('TontineRecap', {projectId});
    // make request to reorder
    // console.log('ListToReorder', ListToReorder)

    let obj = ListToReorder.map((item, i) => {
      return {participantId: item.participantId, position: i + 1};
    });

    const OnResult = res => {
      if (res) {
        navigation.navigate('TontineRecap', {projectId});
      }
    };

    // console.log('object', obj)
    let object = {
      projectId,
      data: obj,
      token,
      OnResult,
    };
    dispatch(updateListReorder(object));
  };

  return {
    state,
    schema,
    success2,
    onDissmis2,
    onSuccess2,
    pressNo,
    pressYes,
    dispatch,
  };
}
