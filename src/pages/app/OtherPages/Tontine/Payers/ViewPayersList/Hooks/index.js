import PushNotification from "react-native-push-notification";
import { useDispatch } from "react-redux";

export function useViewListPayerHooks() {
  const dispatch = useDispatch();
 
  const showNotification = (title , message) =>{
    PushNotification.localNotification({
        title,
        message,
        channelId:'notificationId',

        // alertBody:message
    })
}
  return {
    showNotification
  };
}
