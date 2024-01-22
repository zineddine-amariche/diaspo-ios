import illusphone from '../../../Assets/Img/illusphone.png';
import illusErr from '../../../Assets/Img/illusErr.png';
import {Image, StyleSheet, View} from 'react-native';
import {Head, Txt} from '../../utils';
import {PaleGreyButton} from '../../Buttons';
import {COLORS} from '../../../theme';
import {useSelector} from 'react-redux';
import React  from 'react';


export const BodyModel = ({onDissmis}) => {
  const {amount} = useSelector(state => state.transaction);
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusphone} style={{width: '100%'}} />

        <Head
          //  fontFamily={"Poppins-Bold"}
          style={{padding: 20, textAlign: 'center'}}>
          Transfered successfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            //fontFamily: "Poppins-SemiBold",
          }}>
          <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
            {amount} euro
          </Txt>{' '}
          has been transfered successfully
          {/* to
            <Txt Bold={'700'} color={COLORS.black} fontSize={17}>
              {' '}
              Faith Felicity (+44 7538 110953).
            </Txt>
            You can check in your account
            <Txt Bold={'400'} color={COLORS.orangeYellow} fontSize={17}>
              {' '}
              transaction history.
            </Txt>
            . */}
        </Txt>

        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
      </View>
    </>
  );
};
export const BodyModelErr = ({onDissmis}) => {
  return (
    <>
      <View style={styles.ModelContainer}>
        <Image source={illusErr} style={{width: '100%'}} />

        <Head
          //  fontFamily={"Poppins-Bold"}
          style={{padding: 20, textAlign: 'center'}}
          color={COLORS.coral}>
          Topped up unsuccessfully
        </Head>
        <Txt
          color={COLORS.slateGrey}
          style={{
            paddingHorizontal: 10,
            textAlign: 'center',
            //fontFamily: "Poppins-SemiBold",
          }}>
          Sorry, something went wrong. Please try agian.
        </Txt>

        <PaleGreyButton onPress={onDissmis}>close</PaleGreyButton>
      </View>
    </>
  );
};


const styles = StyleSheet.create({});
