import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {PrimaryLinearOption} from '../../../../../components/Buttons';
import Space from '../../../../../components/Space';
import {Txt} from '../../../../../components/utils';

import {COLORS, SIZES} from '../../../../../theme';

import SquareCheckBox from '../../../../../components/checkBox/useSquareCheck';
import {useDispatch, useSelector} from 'react-redux';

import {
  createTontine,
  resetcreateTontine,
} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {resetToken} from '../../../../../redux/Features/AppToken/GetToken';
import {resetCode} from '../../../../../redux/Features/ConfirmAccount/CodeSlice';
import {Logout} from '../../../../../redux/Features/authentification/Login/Slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReturnHeader from '../../../../../components/Headers/root/ReturnHeader';

const PoliciesInstructions = ({navigation: {goBack}, route}) => {
  const {data} = route.params;

  return (
    <ReturnHeader
      goBack={goBack}
      title={'Policies and Instructions'}
      Cancel="Return">
      <ScrollView
        contentContainerStyle={{width: SIZES.width}}
        showsVerticalScrollIndicator={false}>
        <Instructions />
        <ConfirmButton data={data} />
      </ScrollView>
    </ReturnHeader>
  );
};
export default PoliciesInstructions;

const Instructions = () => {
  return (
    <>
      <View style={styles.boxPolicies}>
        <Space space={10} />
        <Txt color={COLORS.darkBlueGrey} fontSize={17}>
          DIASPO APP DISCLAIMER
        </Txt>
        <Space space={4} />
        <Txt color={COLORS.darkSkyBlue} fontSize={12}>
          You can use your Diaspo account:
        </Txt>
        <Space space={10} />
        <Txt color={COLORS.slateGrey} fontSize={14}>
          • Hold, send or receive electronic money
        </Txt>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          • Pay your contribution into the tontine pot for participating tontine
          participants
        </Txt>
        <Space space={10} />
        <Txt color={COLORS.slateGrey} fontSize={14}>
          Any funds in your Diaspo account that have not been committed to a
          particular tontine pot will be held as electronic money. The
          electronic money is issued to you (and held) under the Terms and
          Conditions (the “Terms”) of MoneyTrans, a company registered in
          Belgium under the registered number 0449 356 557 and whose office is
          located at 77 Boulevard de Waterloo, Box1, 1000, Brussels.
        </Txt>
        <Space space={10} />

        <Txt color={COLORS.slateGrey} fontSize={14}>
          MoneyTrans is authorised by the European Banking Authority to issue
          electronic money and provide payment services. Diaspo BV acts as an
          agent of MoneyTrans to manage the processing and settlement of the
          tontine contributions.
        </Txt>

        <Space space={10} />

        <Txt color={COLORS.slateGrey} fontSize={14}>
          Your Diaspo account is not a bank account. Any electronic money in
          your Diaspo account is held by MoneyTrans in segregated accounts.
        </Txt>

        <Space space={10} />

        <Txt color={COLORS.slateGrey} fontSize={14}>
          Diaspo BV does not hold or process any of your money. We do not issue
          or hold electronic money or provide payments services but distributes
          and redeems electronic money on behalf of MoneyTrans. Any obligations
          owed to you under these Terms or under financial services regulation
          relating to the issue or holding of electronic money, the provision of
          payment services are owed by MoneyTrans and not Diaspo BV.
        </Txt>

        <Space space={10} />

        <Txt color={COLORS.slateGrey} fontSize={14}>
          As such, Diaspo declines all responsibility to any disputes which may
          arise between the participants of an active tontine whether it be
          relating to:
        </Txt>

        <Space space={10} />

        <Txt color={COLORS.slateGrey} fontSize={14}>
          • The number of participants;
        </Txt>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          • The order or frequency of payment;
        </Txt>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          • The duration of the rotation;
        </Txt>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          • The amount of the contributions;
        </Txt>

        <Space space={10} />

        <Txt color={COLORS.slateGrey} fontSize={14}>
          Or for any other reason.
        </Txt>

        <Space space={10} />

        <Txt color={COLORS.slateGrey} fontSize={14}>
          Diaspo provides the tontine Services “as is”. You use them at your own
          risk and discretion. That means they do not come with any warranty
          whether expressed or implied. No implied warranty of merchantability,
          fitness for a particular purpose, availability, security, title or
          non-infringement.
        </Txt>

        <Space space={10} />
        <Txt color={COLORS.slateGrey} fontSize={14}>
          The tontine manager (the “Manager”) is solely responsible for the
          organisation within the tontine group. The Manager is responsible for:
        </Txt>

        <Space space={10} />

        <Txt color={COLORS.slateGrey} fontSize={14}>
          • selecting of the tontine participants;
        </Txt>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          • resolving disputes within the tontine group;
        </Txt>
        <Txt color={COLORS.slateGrey} fontSize={14}>
          • legal claims, including breach of contracts, tort or any other loss
        </Txt>
      </View>
    </>
  );
};

const ConfirmButton = ({data}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {selectedTontine} = useSelector(state => ({
    ...state.tontines,
  }));

  const [checked, setChecked] = useState(true);
  const onCheck = () => {
    setChecked(!checked);
  };
  const {isLoading} = useSelector(state => ({
    ...state.tontines,
  }));

  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  const onSuccess = props => {
    let {nameTontine} = props;
    Toast.show('tontine created successfully !');
    navigation.navigate('InfoScreenTontine', {
      routeData: null,
      isFirstTime: true,
      object: props,
      nameTontine,
    });
    dispatch(resetcreateTontine());
  };

  const onErrorAction = async () => {
    dispatch(resetToken());
    dispatch(resetCode());
    dispatch(Logout());
    await AsyncStorage.clear();
  };

  const {
    name,
    amount,
    frequencyOfPayment,
    currency,
    startAt,
    endAt,
    status,
    asAPayer,
    retentionRate,
    typeTontine,
  } = data;

  let token = user?.AccessToken;
  let userId = user?.userId;
  let object = {
    token,
    userId,
    onErrorAction,
    onSuccess,
    data: {
      name,
      amount,
      frequencyOfPayment,
      currency,
      startAt,
      endAt,
      status,
      asAPayer,
      retentionRate,
      typeTontine,
      type: selectedTontine,
    },
  };
  return (
    <View style={styles.containerButton}>
      <Space space={20} />
      <SquareCheckBox
        title={'i agree all terms and conditions'}
        checked={checked}
        onPress={onCheck}
        fontSize={17}
      />
      <Space space={20} />

      <PrimaryLinearOption
        width={'100%'}
        onPress={() => {
          dispatch(createTontine(object));
        }}
        disabled={checked}
        loading={isLoading}>
        confirm
      </PrimaryLinearOption>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.paleGrey,
    alignItems: 'center',
    flex: 1,
  },
  ImageBackground: {
    ...StyleSheet.absoluteFillObject,
    width: SIZES.width,
    height: 110,
  },

  containerButton: {
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.transparent,
  },
  boxPolicies: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
