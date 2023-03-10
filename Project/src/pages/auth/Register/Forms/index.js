import {View, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../../../../theme';
import {MultiStep} from './Steps/MultipleSteps';

const Form = ({
  step,
  setStep,
  navigation,
  IsTouched,
  setIsTouched,
  IsTouchedNationality,
  setIsTouchedNationality,
  onSuccess,
  onErrorAction,
  onUserExist
}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <MultiStep
        step={step}
        setStep={setStep}
        navigation={navigation}
        setIsTouched={setIsTouched}
        IsTouched={IsTouched}
        IsTouchedNationality={IsTouchedNationality}
        setIsTouchedNationality={setIsTouchedNationality}
        onSuccess={onSuccess}
        onErrorAction={onErrorAction}
        onUserExist={onUserExist}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  space: {
    height: 20,
  },

  Input: {
    color: COLORS.Noir,
    fontSize: 16,
    // fontFamily: 'Roboto-Bold',
    flex: 1,
    paddingLeft: 2,
  },

  line: {
    height: 3,
    width: '110%',
    backgroundColor: COLORS.blueGreen,
    position: 'absolute',
    bottom: -17,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    alignSelf: 'center',
  },
  Tabs: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  rowButtons: {
    paddingTop: 15,
  },
  tabBar: {
    backgroundColor: COLORS.white,
    height: 2,
  },
  indicatorStyle: {
    backgroundColor: COLORS.blueGreen,
    height: 4.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: -1,
  },
  lineVertical: {
    height: 45,
    width: 1,
    backgroundColor: COLORS.lightBlueGrey,
  },
  ViewStyle: {
    backgroundColor: '#000',
  },
  ViewStyleActive: {
    backgroundColor: '#FFF2',
  },
});
