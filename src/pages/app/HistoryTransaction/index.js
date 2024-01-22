import React, {useCallback, useEffect} from 'react';
import {View, ScrollView, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Space from '../../../components/Space';
import {Txt} from '../../../components/utils';
import {SIZES} from '../../../theme';
import CardUserHistory from './components/CardUser';
import RectangleTransactionHistory from '../../../components/views/Rectangle-TransactionHistory';

import {useDateDebut} from './Hooks/useDateDebut';
import {useDateFin} from './Hooks/useDateFin';
import {useAmount} from './Hooks';
import UseModalize from './components/useModalize';
import HeaderTransctions from './components/HeaderTransctions/HeaderTransctions';
import {useSelector} from 'react-redux';
import Spiner from '../../../components/spiner';
import moment from 'moment';
import CreatedSuccess from '../../../components/views/Layouts/AuthLayout/Model';
import {BodyModel, BodyModelErr} from '../../../components/Models/payements';
import {filterTransactions} from '../../../redux/Features/Transactions/Slice';

const HistoryTransaction = ({navigation, route}) => {
  const {info} = route.params;

  // console.log('info', info)
  const {
    modalRef,
    onOpen,
    showDate,
    text,
    onChangeAndroid,
    date,
    showTimeAndroid,
    onChangeTimeAndroid,
    time,
    onChangeTimeIos,
    onChangeIos,
    handleCloseModal,
    showTime,
    dispatch,
    ResetDate
  } = useDateDebut(info);

  const {
    showDateFin,
    showTime2,
    date2,
    text2,
    time2,
    onChangeDate2ios,
    handleCloseModal2,
    modalRef2,
    showDateAndroid2,
    onChageAndroid2,
    onChangeTimeAndroid2,
    showTimeAndroid2,
    onChangeTimeIos2,
    ResetDate2
  } = useDateFin(info);

  const localTime = moment.utc(time).local().format('HH:mm:ss');
  const localTime2 = moment.utc(time2).local().format('HH:mm:ss');

  const {onSelcet, selcted, data} = useAmount();

  let {isLoading} = useSelector(state => state.getAllTransactions);

  const onSucces = () => {
    // setsuccess(true)
  };

  const onErrorAction = () => {
    // setError(true)
  };
  const onFilter = () => {
    let object = {
      userId: info.userId,
      accountId: info.accountId,
      type: 'Debit',
      fromDate: `${text} ${localTime}`,
      toDate: text2 == 'MM-DD-YYYY' ? undefined : `${text2} ${localTime2}`,
      page: 1,
      limit: 10,
    };

    let obj = {
      onSucces,
      onErrorAction,
      object,
    };
    handleCloseModal(obj);
  };

  const onFilter2 = () => {
    let object = {
      userId: info.userId,
      accountId: info.accountId,
      type: 'Debit',
      fromDate: `${text} ${localTime}`,
      toDate: `${text2} ${localTime2}`,
      page: 1,
      limit: 10,
    };

    let obj = {
      onSucces,
      onErrorAction,
      object,
    };
    handleCloseModal2(obj);
  };

  let {disable} = useSelector(state => state.getAllTransactions);

  const onFilterAndroid = () => {
    let object = {
      userId: info.userId,
      accountId: info.accountId,
      type: 'Debit',
      fromDate: `${text} ${localTime}`,
      toDate: text2 == 'MM-DD-YYYY' ? undefined : `${text2} ${localTime2}`,
      page: 1,
      limit: 10,
    };

    let obj = {
      onSucces,
      onErrorAction,
      object,
    };

    dispatch(filterTransactions(obj));
  };

  const onFilterAndroid2 = () => {
    let object = {
      userId: info.userId,
      accountId: info.accountId,
      type: 'Debit',
      fromDate: `${text} ${localTime}`,
      toDate: `${text2} ${localTime2}`,
      page: 1,
      limit: 10,
    };

    let obj = {
      onSucces,
      onErrorAction,
      object,
    };

    dispatch(filterTransactions(obj));
  };

  useEffect(() => {
    if (Platform.OS == 'android' && !disable && text !== 'MM-DD-YYYY') {
      onFilterAndroid();
    }
  }, [disable, time]);

  useEffect(() => {
    if (
      Platform.OS == 'android' &&
      !disable &&
      text !== 'MM-DD-YYYY' &&
      text2 !== 'MM-DD-YYYY'
    ) {
      onFilterAndroid2();
    }
  }, [disable, time2]);

  const DeleteAll = () => { 


   }

  return !isLoading ? (
    <HeaderTransctions navigation={navigation}>
      <ScrollView
        contentContainerStyle={{width: SIZES.width}}
        showsVerticalScrollIndicator={false}>
        <RectangleTransactionHistory
          time={time}
          date={text}
          date2={text2}
          time2={time2}
          onOpen={onOpen}
          selcted={selcted}
          onSelcet={onSelcet}
          onOpen2={showDateFin}
          ResetDate={ResetDate}
          ResetDate2={ResetDate2}
        />

        <View style={{paddingHorizontal: 20}}>
          {data?.length ? (
            <>
              {data?.map((i, index) => {
                return (
                  <View key={index}>
                    <CardUserHistory item={i} index={index} />
                  </View>
                );
              })}

              <Space />
            </>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
              }}>
              <Txt>No data</Txt>
            </View>
          )}
        </View>
      </ScrollView>

      <UseModalize
        title={'Select the start date'}
        date={date}
        time={time}
        showTime={showTime}
        modalRef={modalRef}
        showDate={showDate}
        onChage={onChangeIos}
        onChangeTime={onChangeTimeIos}
        handleCloseModal={onFilter}
        text={text}
      />

      <UseModalize
        title={'Select the end date'}
        time={time2}
        date={date2}
        showTime={showTime2}
        modalRef={modalRef2}
        onChage={onChangeDate2ios}
        onChangeTime={onChangeTimeIos2}
        handleCloseModal={onFilter2}
        text={text2}
      />

      {showDate && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display="spinner"
          is24Hour="default"
          testID="dateTimePiker"
          onChange={onChangeAndroid}
        />
      )}

      {showTimeAndroid && (
        <DateTimePicker
          mode="time"
          value={time}
          is24Hour={true}
          display="spinner"
          onChange={onChangeTimeAndroid}
        />
      )}

      {/* fin date android */}

      {showDateAndroid2 && (
        <DateTimePicker
          testID="dateTimePiker"
          value={date2}
          mode={'date'}
          is24Hour="default"
          onChange={onChageAndroid2}
          display="spinner"
        />
      )}

      {showTimeAndroid2 && (
        <DateTimePicker
          value={time2}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={onChangeTimeAndroid2}
        />
      )}
    </HeaderTransctions>
  ) : (
    <Spiner />
  );
};
export default HistoryTransaction;
