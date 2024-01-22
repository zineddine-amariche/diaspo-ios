import PushNotification from "react-native-push-notification";

class LocalNotificationService {
  configure = (onOpenNotification) => {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log("[LocalNotificationService] onRegister", token);
      },
      onNotification: function (notification) {
        // console.log("[LocalNotificationService] onNotification", notification);
        if (!notification.data) {
          return;
        }
        notification.userInteraction = true;
        onOpenNotification(notification);
      },
      //   IOS only (optional)
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  unregister = () => {
    PushNotification.unregister();
  };

  showNotification = (
    id,
    title,
    message,
    data = {},
    options = {},
    channelId
  ) => {
    PushNotification.localNotification({
      ...this.buildAndroidNotification(id, title, message, data, options),
      title: title || "",
      message: message || "",
      playSound: options.playSound || false,
      soundName: options.soundName || false,
      userInteraction: false,
      channelId,
      badge: true,
    
    });
  };

  buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
    return {
      id,
      title,
      autoCancel: true,
      largIcon: options.largIcon || "ic_launcher",
      smallIcon: options.smallIcon || "ic_launcher",
      bigText: message || "",
      subText: options.subText || "",
      vibrate: options.vibrate || true,
      vibration: options.vibration || 300,
      priority: options.priority || "high",
      importance: options.importance || "high",
      data: data,
    };
  };

  cancelAllLocalNotifications = () => {
    PushNotification.cancelAllLocalNotifications;
  };

  removeDeliceredNotificationById = (notificationId) => {
    console.log(
      "[LocalNotificationService] removeDeliveredNotification By _ID",
      notificationId
    );
    PushNotification.cancelLocalNotification({ id: `${notificationId}` });
  };
}

export const localNotificationService = new LocalNotificationService();
