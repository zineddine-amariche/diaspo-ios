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

  const channelId = () => {
    PushNotification.createChannel({
      channelId: "notificationId",
      channelName: "notifications",
    });
  };

  useEffect(() => {
    channelId();
  }, []);

 

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
    Toast.show("new invitation", Toast.LONG, Toast.TOP);
  };
 
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

 
