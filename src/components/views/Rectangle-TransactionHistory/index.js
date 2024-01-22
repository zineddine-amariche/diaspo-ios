import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HView from '../HView/HView';
import {COLORS} from '../../../theme';
import {Txt} from '../../utils';
import Space from '../../Space';
import CustomPikerTransaction from './CustomPiker';
import {useSelector} from 'react-redux';

const RectangleTransactionHistory = ({
  selcted,
  date2,
  onOpen,
  onOpen2,
  date,
  time,
  time2,
  onSelcet,
  ResetDate,
  ResetDate2,
}) => {
  return (
    <View style={styles.container}>
      <SelectForms
        onOpen={onOpen}
        date={date}
        date2={date2}
        onOpen2={onOpen2}
        time={time}
        time2={time2}
        ResetDate={() => {
          ResetDate();
          ResetDate2();
        }}
        ResetDate2={ResetDate2}
      />
      <Filters selcted={selcted} onSelcet={onSelcet} />
    </View>
  );
};

export default RectangleTransactionHistory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    shadowColor: '#122',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
    zIndex: -1,
    width: '92%',
    alignSelf: 'center',
  },
});

const SelectForms = ({
  onOpen,
  onOpen2,
  time2,
  time,
  date2,
  date,
  ResetDate,
  ResetDate2,
}) => {
  let {disable} = useSelector(state => state.getAllTransactions);
  return (
    <>
      <HView spaceBetween>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <CustomPikerTransaction
            onOpen={onOpen}
            date={date}
            time={time}
            title={'Start date'}
            disabled={false}
            ResetDate={ResetDate}
          />
          <Bare />
          <CustomPikerTransaction
            onOpen={onOpen2}
            date={date2}
            time={time2}
            title={'to date'}
            disabled={disable}
            ResetDate={ResetDate2}
          />
        </View>
      </HView>
      <Space />
    </>
  );
};

const Filters = ({selcted, onSelcet}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={{
            width: 90,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderBottomWidth: 3,
            borderBottomColor: selcted === '' ? COLORS.blueGreen : COLORS.white,
          }}
          onPress={() => {
            onSelcet('');
          }}>
          <Txt>All</Txt>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 90,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 3,
            borderBottomColor:
              selcted === 'CREDIT' ? COLORS.blueGreen : COLORS.white,
          }}
          onPress={() => {
            onSelcet('CREDIT');
          }}>
          <Txt>Cash In</Txt>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 90,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 3,
            borderBottomColor:
              selcted === 'DEBIT' ? COLORS.blueGreen : COLORS.white,
          }}
          onPress={() => {
            onSelcet('DEBIT');
          }}>
          <Txt>Cash Out</Txt>
        </TouchableOpacity>
      </View>
    </>
  );
};

const Bare = () => {
  return (
    <View style={{height: 44, width: 1, backgroundColor: COLORS.silverTwo}} />
  );
};
