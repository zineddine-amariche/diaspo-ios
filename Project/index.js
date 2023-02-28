/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

import { Platform  } from 'react-native'

// PushNotification.configure({
    // onRegister: function (token) {
      // console.log("TOKEN:", token);
    // },
  
    // onNotification: function (notification) {
    //   console.log("NOTIFICATION:", notification);
  
  
    //   notification.finish(PushNotificationIOS.FetchResult.NoData);
    // },
  
    // onAction: function (notification) {
    //   console.log("ACTION:", notification.action);
    //   console.log("NOTIFICATION:", notification);
  
    // },
  
    // onRegistrationError: function(err) {
    //   console.error(err.message, err);
    // },
  

    // permissions: {
    //   alert: true,
    //   badge: true,
    //   sound: true,
    // },
  
   
    // popInitialNotification: true,
  

    // requestPermissions:  Platform.OS === "ios",
    // requestPermissions:  true,
  // });

AppRegistry.registerComponent(appName, () => App);
