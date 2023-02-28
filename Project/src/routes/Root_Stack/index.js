import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import DrawerScreen from "../App_stack/Drawer_Nav";
import AuthStackScreen from "../Auth_stack";
import PushNotification from "react-native-push-notification";
import {
  dispatchDeviceOS,
  dispatchToken,
} from "../../redux/Features/authentification/Register/Slice";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { FcmService } from "../../services/Notifications/FCMService";
import { localNotificationService } from "../../services/Notifications/LocalNotificationsService";
import Toast from "react-native-simple-toast";
import { updateInvitations } from "../../redux/Features/Notifications/Slice";
 



const RootStack = createNativeStackNavigator();

const Root = () => {
  const { user ,isAuth} = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const channelId = () => {
    PushNotification.createChannel({
      channelId: "notificationId",
      channelName: "notifications",
    });
  };

  useEffect(() => {
    channelId();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     PushNotification.localNotification({
  //       channelId: "notificationId",
  //       message: remoteMessage.data.bodyText,
  //       title: remoteMessage.data.title,
  //       vibrate: true,
  //     });
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    FcmService.CheckPermission();
    FcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  }, []);

  const onRegister = (token) => {
    dispatch(dispatchToken(token));
    dispatch(dispatchDeviceOS(Platform.OS.toUpperCase()));
  };

  const onNotification = (notify) => {
    console.log("onNotification", notify);
    const options = {
      soundName: "default",
      playSound: true,
    };
    localNotificationService.showNotification(
      "notificationId",
      notify.data.title,
      notify.data.bodyText,
      notify,
      options
    );
  };
  const { invitations } = useSelector((state) => ({
    ...state.storeNotifications,
  }));

  const onOpenNotification = async (notify) => {
    dispatch(updateInvitations(...invitations ,notify))
    // console.log("onOpenNotification", notify);
    // navigation.navigate("InvitationTontine", { data: notify.data ,isBackground:false});
    Toast.show("new invitation", Toast.LONG, Toast.TOP);
  };



  // console.log('invitations', invitations) 
  if (isAuth) {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen
          name="DrawerScreen"
          component={DrawerScreen}
          screenOptions={{
            headerShown: false,
          }}
        />
      </RootStack.Navigator>
    );
  } else {
    return (
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen
          name="AuthStackScreen"
          component={AuthStackScreen}
          options={{
            animationEnabled: false,
          }}
        />
      </RootStack.Navigator>
    );
  }
};
// };
export default Root;

// useEffect(() => {
// Assume a message-notification contains a "type" property in the data payload of the screen to open
// messaging().onNotificationOpenedApp((remoteMessage) => {
//   // console.log(
//   //   'Notification caused app to open from background state:',
//   //   remoteMessage.notification,
//   // );
//   navigation.navigate(remoteMessage.data.type);
//   console.log("onNotificationOpened", remoteMessage);
// });
// messaging()
// .getInitialNotification()
// .then((remoteMessage) => {
//   if (remoteMessage) {
//     console.log(
//       "Notification caused app to open from quit state:",
//       remoteMessage.notification
//     );
//     // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
//     // console.log("remoteMessage--------------------", remoteMessage);
//     navigation.navigate("InvitationTontine");
//   }
// });
// }, []);

// if (notify.data) {
// if (focus) {
// navigation.navigate("InvitationTontine", { data: notify.data });
// }
// console.log("enetr");
// }

// const handleDynamicLink = link => {
//   // Handle dynamic link inside your own application

//   console.log('link', link)
//   if (link.url === 'https://invertase.io/offer') {
//     // ...navigate to your offers screen
//   }
// };

// const onOpenNotification = async (notify) => {
//   console.log("onOpenNotification", notify);
// };

// let Platforms = Platform.OS;

// const get = async () => {
//   await messaging().registerDeviceForRemoteMessages();
//   const token = await messaging().getToken();

//   if (token) {
//     dispatch(dispatchToken(token));
//     dispatch(dispatchDeviceOS(Platforms.toUpperCase()));
//   }
// };

// useEffect(() => {
//   get();
// }, []);

// const getDeviceToken = () => {
//   PushNotification.configure({
//     onRegister: function (token) {
//       if (token) {
//         dispatch(dispatchToken(token.token))
//         dispatch(dispatchDeviceOS(Platforms.toUpperCase()))

//       }
//     },
//     // onNotification: function (notification) {
//       // console.log("NOTIFICATION   )):", notification);
//       // navigation.navigate(remoteMessage.data.type);
//       // navigation.navigate(remoteMessage.data.type);

//       // notification.finish(PushNotificationIOS.FetchResult.NoData);
//     // },

//     // onAction: function (notification) {
//     //   console.log("ACTION:", notification.action);
//     //   console.log("NOTIFICATION --:", notification);

//     // },

//     // onRegistrationError: function(err) {
//     //   console.error(err.message, err);
//     // },

//     // permissions: {
//     //   alert: true,
//     //   badge: true,
//     //   sound: true,
//     // },

//     // popInitialNotification: true,

//     // requestPermissions:  Platform.OS === "ios",
//   });
// };
// useEffect(() => {
//   getDeviceToken();

// }, []);
