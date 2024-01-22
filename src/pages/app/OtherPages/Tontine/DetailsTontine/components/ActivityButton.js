import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {PrimaryButton} from '../../../../../../components/Buttons';
import {COLORS} from '../../../../../../theme';

const ActivityButton = ({asAPayer, onCreate, loading,
  listOfParticipants

}) => {
  if (asAPayer) {
    if (listOfParticipants >1) {
      null;
    } else {
      return <CreateParticipantsButton onCreate={onCreate} loading={loading} />;
    }
  } else {
    if (listOfParticipants >1) {
      null;
    } else {
      return <CreateParticipantsButton onCreate={onCreate} loading={loading} />;
    }
  }
};

export default ActivityButton;

const styles = StyleSheet.create({
  buttonsConatiner: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS == 'ios' ? 30 : 20,
    backgroundColor: COLORS.white,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
  },
});

const CreateParticipantsButton = ({onCreate, loading}) => {
  return (
    <View style={styles.buttonsConatiner}>
      <PrimaryButton onPress={() => onCreate()} loading={loading}>
        CREATE PARTICIPANTS
      </PrimaryButton>
    </View>
  );
};
