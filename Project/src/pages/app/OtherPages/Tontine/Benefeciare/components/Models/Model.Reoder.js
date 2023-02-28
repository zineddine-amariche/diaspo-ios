import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CreatedSuccess from '../../../../../../../../components/views/Layouts/AuthLayout/Model';
import HView from '../../../../../../../../components/views/HView/HView';
import {Head} from '../../../../../../../../components/utils';
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../../../../components/Buttons';

const ModelReoder = ({success, onDissmis, pressNo, pressYes}) => {
  return (
    <CreatedSuccess
      Visible={success}
      onDissmis={() => {
        // onDissmis();
        // pressNo();
        return
      }}>
      {BodyModelConfirmToReorder ? (
        <BodyModelConfirmToReorder
          onDissmis={onDissmis}
          pressNo={pressNo}
          pressYes={pressYes}
        />
      ) : null}
    </CreatedSuccess>
  );
};

export default ModelReoder;

const styles = StyleSheet.create({});

const BodyModelConfirmToReorder = ({onDissmis, pressNo, pressYes}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Head
          //fontFamily={'Poppins-Bold'}
          style={{padding: 20, textAlign: 'center'}}>
          Do you want to define the beneficary positions?
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
