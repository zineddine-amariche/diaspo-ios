import {useRef, useState} from 'react';
import {Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  filterTransactions,
  getAllTransactions,
  handleSelect,
} from '../../../../redux/Features/Transactions/Slice';

export function useDateDebut(info) {
  const {accountId, userId} = info;
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);

  const [showDate, setShowDate] = useState(false);
  const [text, settext] = useState('MM-DD-YYYY');
  const [showTimeAndroid, setshowTimeAndroid] = useState(false);
  const [time, setTime] = useState(new Date());

  const [Disabled, setDisabled] = useState(true);

  const modalRef = useRef(null);

  const onErrorAction = () => {
    console.log('error');
  };

  const onOpen = () => {
    if (Platform.OS == 'ios') {
      modalRef.current?.open();
    } else {
      setShowDate(true);
    }
  };

  const ResetDate = () => {
    settext('MM-DD-YYYY');
    setDate(new Date());
    setTime(new Date());
    setShowTime(false);
    setShowTime(false);
    setshowTimeAndroid(false);
    setTimeout(() => {
      dispatch(handleSelect(true));
    }, 500);

    let object = {
      onErrorAction,
      accountId,
      userId,
    };

    dispatch(getAllTransactions(object));
  };

  const handleCloseModal = object => {
    if (showTime) {
      // modalRef.current?.close();
      // setShowTime(false);
      dispatch(filterTransactions(object));
      setTimeout(() => {
        setShowTime(false);
      }, 300);
    } else {
      setShowTime(true);
    }
  };

  const onChangeIos = (event, selectedDate) => {
    const currenDate = selectedDate || date;
    setDate(currenDate);
    let tempDate = new Date(currenDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    settext(fDate);
  };

  const onChangeAndroid = (event, selectedDate) => {
    const currenDate = selectedDate || date;
    setDate(currenDate);
    setShowDate(false);

    let tempDate = new Date(currenDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    settext(fDate);

    setTimeout(() => {
      setshowTimeAndroid(true);
    }, 400);
  };

  const onChangeTimeIos = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
    setDisabled(false);
    setTimeout(() => {
      dispatch(handleSelect(false));
    }, 500);
  };

  const onChangeTimeAndroid = (event, selectedTime) => {
    setshowTimeAndroid(false);
    const currentTime = selectedTime || time;
    setTime(currentTime);
    dispatch(handleSelect(false));
  };

  return {
    modalRef,
    onOpen,
    showDate,
    text,
    date,
    showTimeAndroid,
    onChangeTimeAndroid,
    time,
    onChangeIos,
    onChangeTimeIos,
    handleCloseModal,
    showTime,
    onChangeAndroid,
    Disabled,
    dispatch,
    ResetDate,
  };
}
