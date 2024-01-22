import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import HView from '../../../../../components/views/HView/HView';
import {Head, Txt} from '../../../../../components/utils';
import {COLORS} from '../../../../../theme';
import Space from '../../../../../components/Space';

import account_verified from '../../../../../Assets/Kyc/account_verified.png';
import {
  PaleGreyButton,
  PrimaryButton,
  WhiteButton,
} from '../../../../../components/Buttons';
import {ButtonGroup} from 'react-native-elements';

const data = [
  {
    id: 0,
    label: 'Main Account',
    value: 'Main Account',
    price: '32,589.50',
    currency: 'euro',
  },
  {
    id: 1,
    label: '2nd FX',
    value: '2nd FX',
    price: '12,089.50',
    currency: 'USD',
  },
  {
    id: 2,
    label: '2rd FX',
    value: '2rd FX',
    price: '32,099.50',
    currency: 'AUD',
  },
];

const ContentRenders = ({
  onPress,
  navigation,
  closeBottomUp2,
  onPress2,
  close,
  closeBottomUp1,
}) => {
  const [next, setnext] = useState(false);

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
        }}>
        <ScrollView>
          {!next ? (
            <>
              <Space space={20} />
              <Image source={account_verified} style={{width: '100%'}} />
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                <Space space={20} />

                <Head Bold={'700'}>Identity Verification</Head>
                <Space space={10} />

                <Txt fontSize={14} color={'#798395'} style={{lineHeight: 24}}>
                  Diaspora is committed to building a safe and accountable
                  place, which requires our users to submit documents for
                  verification. Your personal data will be protected and only
                  shared with MONEYTRANS to administer your account or for
                  regulatory compliance.
                </Txt>
              </View>
              <View style={{paddingHorizontal: 20}}>
                <Txt fontSize={16} color={'#576071'} style={{lineHeight: 24}}>
                  It only takes 5 minutes to complete the submission.
                </Txt>
              </View>
              <Space space={40} />
              <View style={{alignSelf: 'center', width: '80%'}}>
                <Txt
                  style={{textAlign: 'center', lineHeight: 24}}
                  color={COLORS.orangeYellow}>
                  Why my information is shared with Moneytrans
                </Txt>
              </View>
              <View style={{padding: 20}}>
                <PrimaryButton
                  marginVertical={5}
                  onPress={() => {
                    // navigation.navigate("Request");
                    // closeBottomUp2();
                    // closeBottomUp1()
                    setnext(true);
                  }}>
                  Start now
                </PrimaryButton>
              </View>
              {/* <PrimaryButton
            marginVertical={5}
            onPress={() => {
              // closeBottomUp2();
              closeBottomUp1()
              onPress2();
            }}
          >
            TOP UP

          </PrimaryButton> */}
            </>
          ) : (
            <View style={{padding: 20}}>
              <Space space={10} />
              <Head>Why my information is shared with Moneytrans</Head>
              <Space space={10} />

              <Txt color={'#798395'} style={{lineHeight: 24}}>
                MONEYTRANS est le responsable du traitement des données
                personnelles récoltées au sujet des personnes physiques faisant
                usage de ses services financiers et s’engage à traiter les
                données concernées conformément aux règlementations en vigueur,
                et en particulier au Règlement (UE) 2016/679 du 27 avril 2016
                relatif à la protection des personnes physiques à l’égard du
                traitement des données à caractère personnel et à la libre
                circulation de ces données (« Règlement Général sur la
                Protection des Données »), ainsi qu’aux lois nationales
                complémentant les termes du Règlement précité.
              </Txt>
              <Space space={10} />

              <Txt color={'#798395'} style={{lineHeight: 24}}>
                NBK en tant qu’agent de Moneytrans est un sous-traitant agissant
                sous la politique de confidentialité de Moneytrans disponible
                sous le lien suivant:
              </Txt>
              <Space space={10} />

              <Txt color={'#457DF5'} style={{lineHeight: 24}}>
                https://www.moneytrans.eu/belgium/protection-des-donnees-privee
              </Txt>
              <Space space={10} />

              <Txt color={'#798395'} style={{lineHeight: 24}}>
                Pour toute question, modification ou supression de données,
                merci de contacter MoneyTrans:
              </Txt>
              <Space space={10} />

              <Txt color={'#457DF5'}>onlinesupport@moneytrans.eu</Txt>
              <Space space={20} />
              <PrimaryButton
                marginVertical={5}
                onPress={() => {
                  navigation.replace('Identity');
                  // closeBottomUp2();
                  close()
                  // setnext(true);
                }}>
                Close
              </PrimaryButton>
            </View>
          )}
        </ScrollView>
        {/* <WhiteButton onPress={onPress}>cancel</WhiteButton> */}
        <View style={{padding: 20}}></View>
        <Space space={10} />
      </View>
    </>
  );
};

export default ContentRenders;

const styles = StyleSheet.create({
  Point: {
    height: 7,
    width: 7,
    borderRadius: 8,
    backgroundColor: COLORS.orangeYellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginTop: 3,
  },
  item: {
    backgroundColor: COLORS.paleGreyTwo,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    height: 80,
    justifyContent: 'space-between',
    width: '100%',
  },
  Head: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
});
