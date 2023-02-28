import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import CreatedSuccess from "../../../../../../../../components/views/Layouts/AuthLayout/Model";
// import { Head } from "../../../../../../../../components/utils";
// import HView from "../../../../../../../../components/views/HView/HView";
// import { PaleGreyButton, PrimaryButtonLinear } from "../../../../../../../../components/Buttons";
import CreatedSuccess from '../../../../../../../components/views/Layouts/AuthLayout/Model';
import HView from '../../../../../../../components/views/HView/HView';
import {Head} from '../../../../../../../components/utils';
import {
  PaleGreyButton,
  PrimaryButtonLinear,
} from '../../../../../../../components/Buttons';
import {createTypeParticipants} from '../../../../../../../redux/Features/Tontine/Participants/create/slice';
import {useDispatch} from 'react-redux';

const ModelUseAsBeneficiary = ({
  success2,
  onDissmis2,
  NavToCnfBenef,
  NavToCnfPayer,
}) => {
  return (
    <CreatedSuccess
      Visible={success2}
      onDissmis={() => {
        return;
      }}>
      {BodyModel2 ? (
        <BodyModel2
          onDissmis={onDissmis2}
          NavToCnfBenef={NavToCnfBenef}
          NavToCnfPayer={NavToCnfPayer}
        />
      ) : null}
    </CreatedSuccess>
  );
};

export default ModelUseAsBeneficiary;

const styles = StyleSheet.create({});

const BodyModel2 = ({onDissmis, NavToCnfPayer, NavToCnfBenef}) => {
  const dispatch = useDispatch();

  return (
    <>
      <View style={styles.ModelContainer}>
        <Head
        //  fontFamily={'Poppins-Bold'}
          style={{padding: 20, textAlign: 'center'}}>
          Do you want to use the list of payers as beneficaries?
        </Head>

        <HView spaceBetween>
          <PaleGreyButton
            onPress={() => {
              onDissmis();
              NavToCnfPayer();
            }}
            width={'48%'}>
            no
          </PaleGreyButton>
          <PrimaryButtonLinear
            disabled={true}
            onPress={() => {
              dispatch(createTypeParticipants('PAYER_AND_BENEFICIARY'));

              onDissmis();

              // NavToCnfPayer(); //send to payer function create payers
              NavToCnfBenef(); //send to beneficiary function create to create a benefeciary & payers
            }}
            width={'48%'}>
            yes
          </PrimaryButtonLinear>
        </HView>
      </View>
    </>
  );
};
