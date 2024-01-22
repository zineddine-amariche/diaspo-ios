import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";
import {localNotificationService} from './LocalNotificationsService'

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.CheckPermission(onRegister);
    this.CreateNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === "ios") {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled();
    }
  };

  CheckPermission = (onRegister) => {
    messaging()
      .hasPermission()
      .then((enabled) => {
        if (enabled) {
          // user has permession
          this.getToken(onRegister);
        } else {
          // user don't have permession
          this.requestPermession(onRegister);
        }
      })
      .catch((error) => {
        console.log("[FCM Service] - error", error);
      });
  };

  getToken = (onRegister) => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log("user does not have device token");
        }
      })
      .catch((error) => {
        // console.log("[FCM Service] - get Token Rejected", error);
      });
  };

  requestPermession = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        console.log("[FCM Service] - Request Permission Rejected", error);
      });
  };

  deleteToken = () => {
    console.log("[FCM Service] - Delet Token ");

    messaging()
      .deleteToken()
      .catch((error) => {
        console.log("[FCM Service] - Delet Token Error", error);
      });
  };

  CreateNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification
  ) => {
    // when app is Running on background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "[FCM Service] - onNotificationOpenApp getintialNotification ",
        remoteMessage
      );
      if (remoteMessage) {
        let notification = remoteMessage;
        onOpenNotification = notification;
      }
    });

    // when Application open from quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // console.log(
        //   "[FCM Service] - getInitialNotification getintialNotification ",
        //   remoteMessage
        // );

        if (remoteMessage) {
          let notification = remoteMessage;
          localNotificationService.cancelAllLocalNotifications()
          onOpenNotification(notification);
        }
      });

    //forground state message
    this.messageListnner = messaging().onMessage(async (remoteMessage) => {
      console.log("[FCM Service] - A new FCM message arrived ", remoteMessage);

      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === "ios") {
          notification = remoteMessage.data;
        } else {
          notification = remoteMessage;
        }
        onNotification = notification.data;
      }
    });

    // when have a new token
    messaging().onTokenRefresh((fcmToken) => {
      console.log("[FCM Service] - New Token referesh ", fcmToken);
      onRegister(fcmToken);
    });


    // unRegister =()=>{
    //     this.messageListnner()
    // }
  };
}
export const FcmService = new FCMService()