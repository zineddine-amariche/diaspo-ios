import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../../theme';
import {Txt} from '../../../components/utils';
import Form from './Form/Index';
import AuthLayout from '../../../components/views/Layouts/AuthLayout';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';
import Spiner from '../../../components/spiner';
import { stopLoader } from '../../../redux/Features/authentification/Login/Slice';

const Login = ({navigation, navigation: {goBack}}) => {
  const {isLoading, message} = useSelector(state => state.auth);
  const dispatch = useDispatch()
  return (
    <AuthLayout Title={'Login'} goBack={()=>{goBack()
    
      dispatch(stopLoader())
    }}>
      <View style={styles.space}>
        {isLoading ? (
          <Spiner />
        ) : (
          <KeyboardAwareScrollView extraHeight={160} enabledOnAndroid>
            <Form navigation={navigation} />
          </KeyboardAwareScrollView>
        )}
      </View>
      <View style={styles.text}>
        <Txt color={COLORS.white}>Here for the first time ?</Txt>
        <TouchableOpacity
          onPress={() => {
               navigation.navigate('Register');
            //  navigation.navigate("KycForm");
            //  navigation.navigate("ConfirmPhoneNum",{userName:"userName"});
          }}>
          <Txt color={COLORS.yellow} style={styles.sign}>
            Sign Up
          </Txt>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
};

export default Login;

const styles = StyleSheet.create({
  space: {
    height: 20,
    flex: 1,
  },
  text: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  sign: {
    textDecorationLine: 'underline',
    paddingLeft: 10,
  },
});

 
