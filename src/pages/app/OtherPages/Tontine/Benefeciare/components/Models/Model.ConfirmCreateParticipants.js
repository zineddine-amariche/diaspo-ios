import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CreatedSuccess from '../../../../../../../components/views/Layouts/AuthLayout/Model';
import HView from '../../../../../../../components/views/HView/HView';
import {Head} from '../../../../../../../components/utils';
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../../../components/Buttons';

const ModelConfirmCreateParticipants = ({success, onDissmis, pressNo, pressYes}) => {
  return (
    <CreatedSuccess
      Visible={success}
      onDissmis={() => {
        // onDissmis();
        // pressNo();
        return
      }}>
      {BodyModelConfirmToCreate ? (
        <BodyModelConfirmToCreate
          onDissmis={onDissmis}
          pressNo={pressNo}
          pressYes={pressYes}
        />
      ) : null}
    </CreatedSuccess>
  );
};

export default ModelConfirmCreateParticipants;

const styles = StyleSheet.create({});

const BodyModelConfirmToCreate = ({onDissmis, pressNo, pressYes}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Head
          //fontFamily={'Poppins-Bold'}
          style={{padding: 20, textAlign: 'center'}}>
          Do you want to confirm creation of the list ?
        </Head>

        <HView spaceBetween>
          <PaleGreyButton
            onPress={() => {
              onDissmis();
              pressNo();
            }}
            width={'48%'}>
            no
          </PaleGreyButton>
          <PrimaryButtonLinear
            disabled={true}
            width={'48%'}
            onPress={() => {
              onDissmis();
              pressYes();
            }}>
            yes
          </PrimaryButtonLinear>
        </HView>
      </View>
    </>
  );
};
