import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import SplashScreen from '../../pages/auth/SplashScreen';
import SwiperBoard from '../../pages/auth/OnBording';
import Forgot from '../../pages/auth/ForgotPassword';
import CreatPassword from '../../pages/auth/CreatePassword';
import ConfirmPhoneNum from '../../pages/auth/ConfirmNumberPhone';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from '../../redux/Features/AppToken/GetToken';
import KycForm from '../../pages/auth/KycForm';
import KycStatusPage from '../../pages/auth/KycStatus';
import Identity from '../../pages/auth/Identity';
import ReviewOfInformation from '../../pages/auth/KycStatus/pages/ReviewOfInformation';

const RootStack = createNativeStackNavigator();

function SwitchHome({navigation}) {
  const dispatch = useDispatch();

  const {token} = useSelector(state => ({...state.token}));

  // console.log('token', token)
  useEffect(() => {

    dispatch(getToken());

  }, [token]);

  if (token) {
    setTimeout(() => {
      navigation.replace('SwiperBoard');
    }, 500);
  }

  return <SplashScreen />;
}
const AuthStackScreen = ({navigation}) => (
  <RootStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <RootStack.Screen name="SplashScreen" component={SwitchHome} />
    <RootStack.Screen name="SwiperBoard" component={SwiperBoard} />
    <RootStack.Screen name="login" component={Login} />
    <RootStack.Screen name="KycForm" component={KycForm} />
    <RootStack.Screen name="KycStatusPage" component={KycStatusPage} />
    <RootStack.Screen name="Register" component={Register} />
    <RootStack.Screen name="Forgot" component={Forgot} />
    <RootStack.Screen name="CreatPassword" component={CreatPassword} />
    <RootStack.Screen name="ConfirmPhoneNum" component={ConfirmPhoneNum} />
    <RootStack.Screen name="Identity" component={Identity} />
    <RootStack.Screen name="ReviewOfInformation" component={ReviewOfInformation} />
    
  </RootStack.Navigator>
);

export default AuthStackScreen;
