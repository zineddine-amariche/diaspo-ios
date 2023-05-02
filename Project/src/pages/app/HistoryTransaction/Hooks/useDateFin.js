import {useDispatch} from 'react-redux';
import {useRef, useState} from 'react';
import {Platform} from 'react-native';
import {
  filterTransactions,
  getAllTransactions,
} from '../../../../redux/Features/Transactions/Slice';

export function useDateFin(info) {

  const {accountId, userId} = info;

  const modalRef2 = useRef(null);
  const [showDateAndroid2, setshowDateAndroid2] = useState(false);
  const [showTimeAndroid2, setshowTimeAndroid2] = useState(false);

  const [showTime2, setShowTime2] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [time2, setTime2] = useState(new Date());
  const [text2, settext2] = useState('MM-DD-YYYY');

  const showDateFin = () => {

    if (Platform.OS == 'ios') {
      modalRef2.current?.open();
    } else {
      setshowDateAndroid2(true);
    }
  };

  const dispatch = useDispatch();

  const handleCloseModal2 = object => {
    if (showTime2) {
      dispatch(filterTransactions(object));
      setTimeout(() => {
        setShowTime2(false);
      }, 300);
    } else {
      setShowTime2(true);
    }
  };

  const onChangeDate2ios = (event, selectedDate) => {
    const currenDate = selectedDate || date2;
    setDate2(currenDate);
    let tempDate = new Date(currenDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    settext2(fDate);
  };

  const onChageAndroid2 = (event, selectedDate) => {
    const currenDate = selectedDate || date2;
    setDate2(currenDate);
    setshowDateAndroid2(false);

    let tempDate = new Date(currenDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    settext2(fDate);

    setTimeout(() => {
      setshowTimeAndroid2(true);
    }, 400);
  };

  const onChangeTimeIos2 = (event, selectedTime) => {
    const currentTime = selectedTime || time2;
    setTime2(currentTime);
  };

  const onChangeTimeAndroid2 = (event, selectedTime) => {
    setshowTimeAndroid2(false);
    const currentTime = selectedTime || time2;
    setTime2(currentTime);
  };

  const onErrorAction = () => {
    console.log('error');
  };

  const ResetDate2 = () => {
    settext2('MM-DD-YYYY');
    setDate2(new Date());
    setTime2(new Date());
    setShowTime2(false);
    setshowTimeAndroid2(false);

    let object = {
      onErrorAction,
      accountId,
      userId,
    };
    dispatch(getAllTransactions(object));
  };
  return {
    modalRef2,
    showDateFin,
    showTime2,
    date2,
    text2,
    time2,
    handleCloseModal2,
    onChageAndroid2,
    showDateAndroid2,
    showTimeAndroid2,
    onChangeDate2ios,
    onChangeTimeAndroid2,
    onChangeTimeIos2,
    ResetDate2,
  };
}
