import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {PrimaryButton} from '../../../../../../components/Buttons';
import Space from '../../../../../../components/Space';
import {useNavigation} from '@react-navigation/native';
import { COLORS } from '../../../../../../theme';

const ActivityButton = ({
  projectId,
  asAPayer,
  handlePresentModalPress,
  numberOfPayers,
  tontineProjectInfo,
  onCreate,
  loading
}) => {
  const navigation = useNavigation();
  if (asAPayer) {
    if (numberOfPayers > 1) {
      null;
    } else {
      return (
        <CreateParticipantsButton
          navigation={navigation}
          routeData={tontineProjectInfo}
          handlePresentModalPress={handlePresentModalPress}
          projectId={projectId}
          onCreate={onCreate}
          loading={loading}

          // isNewTontine={tontineProjectInfo?.project ? true : false}
        />
      );
    }
  } else {
    if (numberOfPayers > 1) {
      null;
    } else {
      return (
        <CreateParticipantsButton
          navigation={navigation}
          routeData={tontineProjectInfo}
          handlePresentModalPress={handlePresentModalPress}
          projectId={projectId}
          onCreate={onCreate}
          loading={loading}
          
          // isNewTontine={tontineProjectInfo?.project ? true : false}
        />
      );
    }
  }
};

export default ActivityButton;

const styles = StyleSheet.create({
  buttonsConatiner: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingTop: 10,
  },
});

const CreateParticipantsButton = ({
  onCreate,
  loading
}) => {
  const dispatch = useDispatch();


  return (
    <View style={styles.buttonsConatiner}>
      <PrimaryButton
        onPress={() => onCreate()}
        loading={loading}>
        CREATE PARTICIPANTS
      </PrimaryButton>
      {/* {Platform.OS == 'ios' ? null : <Space space={20} />} */}
    </View>
  );
};
