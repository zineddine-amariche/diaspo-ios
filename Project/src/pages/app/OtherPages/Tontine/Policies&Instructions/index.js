import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import Line from '../../../../../components/views/line';

import ImgBack from '../../../../../Assets/Img/HomeBack.png';
import {PrimaryLinearOption} from '../../../../../components/Buttons';
import SecondaryHeader from '../../../../../components/Headers/root/SecondaryHeader';
import Space from '../../../../../components/Space';
import {Txt} from '../../../../../components/utils';

import {COLORS, SIZES} from '../../../../../theme';

import {useAmount} from './Hooks';
import SquareCheckBox from '../../../../../components/checkBox/useSquareCheck';
import {useDispatch, useSelector} from 'react-redux';

import {useEffect} from 'react';
import {
  createTontine,
  resetcreateTontine,
} from '../../../../../redux/Features/Tontine/ManageTontine/Slices/tontineSlice';
import Toast from 'react-native-simple-toast';

const PoliciesInstructions = ({navigation, navigation: {goBack}, route}) => {
  const {data} = route.params;
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
  const {state, schema, onSubmit} = useAmount();
  const [checked, setChecked] = useState(true);
  const onCheck = () => {
    setChecked(!checked);
  };
  const dispatch = useDispatch();
  // const { tontines, isLoading, message, isSuccess } = useSelector((state) => ({
  //   ...state.tontines,
  // }));
  const {selectedTontine} = useSelector(state => ({
    ...state.tontines,
  }));

  const {tontines, isLoading, message, TontineCreated, isSuccess, isError} =
    useSelector(state => ({
      ...state.tontines,
    }));

  const {user} = useSelector(state => ({
    ...state.auth,
  }));

  let token = user?.AccessToken;
  let userId = user?.userId;
  let object = {
    token,
    userId,
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

  useEffect(() => {
    if (isError || isSuccess === 'error') {
      // alert(message?.StatusDescription);
      Toast.show('Create tontine Failed !' );
      navigation.navigate('CreateTontine', {ind: 0, type: null});
      console.log('error on Create tontine', message?.StatusDescription);
      dispatch(resetcreateTontine());
    } else if (isSuccess === 'success') {
      let object = {
        projectId: TontineCreated?.data?.project?.projectId,
        token: user?.AccessToken,
      };
      Toast.show('tontine created successfully !');
      navigation.navigate('InfoScreenTontine', {
        routeData: TontineCreated?.data,
        isFirstTime: true,
        object,
      });
      dispatch(resetcreateTontine());
    }
  }, [isSuccess, isError]);

  // console.log('isSuccess', isSuccess)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Image
        style={styles.ImageBackground}
        source={ImgBack}
        resizeMode="stretch"
      />
      <SecondaryHeader
        goBack={goBack}
        title={'Policies and Instructions'}
        Cancel="Return"
      />

      <>
        <ScrollView
          contentContainerStyle={{width: SIZES.width}}
          showsVerticalScrollIndicator={false}>
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
              • Pay your contribution into the tontine pot for participating
              tontine participants
            </Txt>
            <Space space={10} />
            <Txt color={COLORS.slateGrey} fontSize={14}>
              Any funds in your Diaspo account that have not been committed to a
              particular tontine pot will be held as electronic money. The
              electronic money is issued to you (and held) under the Terms and
              Conditions (the “Terms”) of MoneyTrans, a company registered in
              Belgium under the registered number 0449 356 557 and whose office
              is located at 77 Boulevard de Waterloo, Box1, 1000, Brussels.
            </Txt>
            <Space space={10} />
        

            <Txt color={COLORS.slateGrey} fontSize={14}>
              MoneyTrans is authorised by the European Banking Authority to
              issue electronic money and provide payment services. Diaspo BV
              acts as an agent of MoneyTrans to manage the processing and
              settlement of the tontine contributions.
            </Txt>

            <Space space={10} />

            <Txt color={COLORS.slateGrey} fontSize={14}>
              Your Diaspo account is not a bank account. Any electronic money in
              your Diaspo account is held by MoneyTrans in segregated accounts.
            </Txt>

            <Space space={10} />

            <Txt color={COLORS.slateGrey} fontSize={14}>
              Diaspo BV does not hold or process any of your money. We do not
              issue or hold electronic money or provide payments services but
              distributes and redeems electronic money on behalf of MoneyTrans.
              Any obligations owed to you under these Terms or under financial
              services regulation relating to the issue or holding of electronic
              money, the provision of payment services are owed by MoneyTrans
              and not Diaspo BV.
            </Txt>

            <Space space={10} />

            <Txt color={COLORS.slateGrey} fontSize={14}>
              As such, Diaspo declines all responsibility to any disputes which
              may arise between the participants of an active tontine whether it
              be relating to:
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
              Diaspo provides the tontine Services “as is”. You use them at your
              own risk and discretion. That means they do not come with any
              warranty whether expressed or implied. No implied warranty of
              merchantability, fitness for a particular purpose, availability,
              security, title or non-infringement.
            </Txt>

            <Space space={10} />
            <Txt color={COLORS.slateGrey} fontSize={14}>
              The tontine manager (the “Manager”) is solely responsible for the
              organisation within the tontine group. The Manager is responsible
              for:
            </Txt>

            <Space space={10} />

            <Txt color={COLORS.slateGrey} fontSize={14}>
              • selecting of the tontine participants;
            </Txt>
            <Txt color={COLORS.slateGrey} fontSize={14}>
              • resolving disputes within the tontine group;
            </Txt>
            <Txt color={COLORS.slateGrey} fontSize={14}>
              • legal claims, including breach of contracts, tort or any other
              loss
            </Txt>

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
                // console.log('object', object)
              }}
              disabled={checked}
              loading={isLoading}>
              confirm
            </PrimaryLinearOption>
          </View>
        </ScrollView>

        <View style={styles.containerButton}>
          <Line color={COLORS.black} />
        </View>
      </>
    </SafeAreaView>
  );
};
export default PoliciesInstructions;

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
    paddingHorizontal: 20,
    backgroundColor: COLORS.transparent,
  },
  boxPolicies: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});
