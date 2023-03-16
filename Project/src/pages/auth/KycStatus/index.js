import React from 'react';
import {StyleSheet} from 'react-native';
import UseStatusPage from './components/useStatusPage';
import UseStatusPageFailed from './components/useStatusPageFailed';

const KycStatusPage = ({navigation, route}) => {
  const data = route.params;

  const onClose = () => {
    navigation.navigate('login');
  };
  
  return (
    <>
      {data.obj === 'PENDING_REVIEW' ? (
        <UseStatusPage onClose={onClose} data={data.id} />
      ) : (
        <UseStatusPageFailed onClose={onClose} />
      )}
    </>
  );
};

export default KycStatusPage;

const styles = StyleSheet.create({});
