import {Image, Platform, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Head, Txt} from '../../../../components/utils';
import {COLORS} from '../../../../theme';
import Space from '../../../../components/Space';

import account_verified from '../../../../Assets/Kyc/account_verified.png';
import {PrimaryButton} from '../../../../components/Buttons';
import HeaderView from './headerView';
import {useNavigation} from '@react-navigation/native';

const Form = () => {
  const [next, setnext] = useState(false);
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}>
      <HeaderView />
      {!next ? (
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View
            style={{
              position: 'relative',
              flex: 1,
            }}>
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
                Diaspora is committed to building a safe and accountable place,
                which requires our users to submit documents for verification.
                Your personal data will be protected and only shared with
                MONEYTRANS to administer your account or for regulatory
                compliance.
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
            <View
              style={{
                padding: 20,
                position: 'absolute',
                bottom: Platform.OS == 'ios' ? 10 : -20,
                width: '100%',
              }}>
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
          </View>
        </ScrollView>
      ) : (
        <>
          <ScrollView contentContainerStyle={{}}>
            <>
              <View style={{padding: 20}}>
                <Head>Why my information is shared with Moneytrans</Head>
                <Space space={10} />

                <Txt color={'#798395'} style={{lineHeight: 24}}>
                  MONEYTRANS est le responsable du traitement des données
                  personnelles récoltées au sujet des personnes physiques
                  faisant usage de ses services financiers et s’engage à traiter
                  les données concernées conformément aux règlementations en
                  vigueur, et en particulier au Règlement (UE) 2016/679 du 27
                  avril 2016 relatif à la protection des personnes physiques à
                  l’égard du traitement des données à caractère personnel et à
                  la libre circulation de ces données (« Règlement Général sur
                  la Protection des Données »), ainsi qu’aux lois nationales
                  complémentant les termes du Règlement précité.
                </Txt>
                <Space space={10} />

                <Txt color={'#798395'} style={{lineHeight: 24}}>
                  NBK en tant qu’agent de Moneytrans est un sous-traitant
                  agissant sous la politique de confidentialité de Moneytrans
                  disponible sous le lien suivant:
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
              </View>
            </>
          </ScrollView>

          <View
            style={{
              width: '90%',
              bottom: Platform.OS == 'ios' ? 20 : 0,
              alignSelf: 'center',
            }}>
            <PrimaryButton
              width={'100%'}
              marginVertical={5}
              onPress={() => {
                navigation.navigate('Identity');
              }}>
              Close
            </PrimaryButton>
          </View>
        </>
      )}
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({});
