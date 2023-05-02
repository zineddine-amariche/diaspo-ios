import {View, StyleSheet} from 'react-native';
import React from 'react';
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
  onUserExist,
  refSubmit,
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
        refSubmit={refSubmit}
      />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({});
