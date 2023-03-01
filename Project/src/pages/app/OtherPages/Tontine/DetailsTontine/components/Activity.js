import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ActivityDetails from './ActivityDetails/ActivityDetails';

const Activity = ({
  asAPayer,
  bottomSheetModalRef,
  numberOfPayers,
  startWithparticipants,
  projectId,
  isFirstTime,
  onSuccess,
  closeModal,
  tontineProjectInfo,
  consult,
  cancelTontin
}) => {
  const navigation = useNavigation();
  if (asAPayer) {
    if (numberOfPayers > 1) {
      return (
        <ActivityDetails
          navigation={navigation}
          onSuccess={onSuccess}
          closeModal={closeModal}
          bottomSheetModalRef={bottomSheetModalRef}
          projectId={projectId}
          routeData={tontineProjectInfo}
          consult={consult}
          isFirstTime={isFirstTime}
          startWithparticipants={startWithparticipants}
          cancelTontin={cancelTontin}
        />
      );
    } else {
      null;
    }
  } else {
    if (numberOfPayers > 0) {
      return (
        <ActivityDetails
          navigation={navigation}
          onSuccess={onSuccess}
          closeModal={closeModal}
          bottomSheetModalRef={bottomSheetModalRef}
          projectId={projectId}
          routeData={tontineProjectInfo}
          consult={consult}
          isFirstTime={isFirstTime}
          startWithparticipants={startWithparticipants}
          cancelTontin={cancelTontin}
        />
      );
    } else {
      null;
    }
  }
};

export default Activity;

const styles = StyleSheet.create({});
