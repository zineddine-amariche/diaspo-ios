import React, { useEffect, useState } from "react";
import { DrawerContent } from "./CustomDrawer";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabOrange from "../OrangeBottom";
import Home from "../../../pages/app/Home";
import Scann from "../../../pages/app/Scann";
import Wallet from "../../../pages/app/Wallet";
import MyCode from "../../../pages/app/MyCode";
import Analysis from "../../../pages/app/Analysis";
import Discount from "../../../pages/app/Discount";
import ContactUs from "../../../pages/app/Contact";
import AboutDiaspora from "../../../pages/app/About";
import TermsConditions from "../../../pages/app/Terms";
import PrivaciPolicy from "../../../pages/app/Privacy";
import Planning from "../../../pages/app/AnalysisPlanning";
import Settings from "../../../pages/app/Settings/settings";
import Language from "../../../pages/app/Settings/languages";
import CashOut from "../../../pages/app/OtherPages/CashOut";
import Notifications from "../../../pages/app/Notification/Hooks/Notifications";
import AddPlan from "../../../pages/app/AnalysisPlanningAddPlan";
import Transfers from "../../../pages/app/OtherPages/Transfert";
import Categories from "../../../pages/app/Home/pages/Categories";
import TopUp from "../../../pages/app/OtherPages/TopUp/TopUp";
import HistoryTransaction from "../../../pages/app/HistoryTransaction";
import Request from "../../../pages/app/OtherPages/TopUp/Request";
import Entertainment from "../../../pages/app/Home/pages/Entertainment";
import CreditsCards from "../../../pages/app/Wallet/Pages/CreditsCards";
import BankAccounts from "../../../pages/app/Wallet/Pages/BankAccounts";
import Promotion from "../../../pages/app/Notification/Pages/Promotion";
import DetailsEntertainment from "../../../pages/app/Home/pages/Details";
import CreateAccount from "../../../pages/app/Wallet/Pages/CreateAccount";
import EWalletAccounts from "../../../pages/app/Wallet/Pages/EWalletAccounts";
import SearchNotifications from "../../../pages/app/Notification/Pages/Search";
import Tontine from "../../../pages/app/OtherPages/Tontine/TontineListing";
import CreateCard from "../../../pages/app/Wallet/Pages/CreateCard/ChooseType";
import CreateTontine from "../../../pages/app/OtherPages/Tontine/CreateTontine";
import CardFormInfo from "../../../pages/app/Wallet/Pages/CreateCard/CardFormInfo";
import Payer from "../../../pages/app/OtherPages/Tontine/Payers/SelectPayers";
import InvitationTontine from "../../../pages/app/Notification/Pages/InvitationTontine";
import InfoScreenTontine from "../../../pages/app/OtherPages/Tontine/DetailsTontine";
import ListPayer from "../../../pages/app/OtherPages/Tontine/Payers/SelectedPayers";
import TransactionHistory from "../../../pages/app/OtherPages/Tontine/TransactionHistory";
import PoliciesInstructions from "../../../pages/app/OtherPages/Tontine/Policies&Instructions";
import Béneféciare from "../../../pages/app/OtherPages/Tontine/Benefeciare/SelectBenefeciare";
import ConfirmedList from "../../../pages/app/OtherPages/Tontine/Payers/PayerList/ConfirmedList";
import ListBéneféciare from "../../../pages/app/OtherPages/Tontine/Benefeciare/SelectedBenefeciare";
import BenefeciareListReorder from "../../../pages/app/OtherPages/Tontine/Benefeciare/BenefeciareListReorder/BenefeciareListReorder";
import PageForTest from "../../../pages/app/PageForTest";
import PageForTest2 from "../../../pages/app/PageForTest/Page2";
import TontineRecap from "../../../pages/app/OtherPages/Tontine/TontineRecap";
import AccountInfo from "../../../pages/app/AccountInfo";
import EditAccount from "../../../pages/app/AccountInfo/EditAccount";
import ViewPayersList from "../../../pages/app/OtherPages/Tontine/Payers/ViewPayersList";
import ViewBenefeciareList from "../../../pages/app/OtherPages/Tontine/Benefeciare/ViewBeneficiariesList";
import ConfirmedListBéneféciare from "../../../pages/app/OtherPages/Tontine/Benefeciare/BenefeciareList/ConfirmedList";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import Identity from "../../../pages/auth/Identity";

const Drawer = createDrawerNavigator();
const DrawerScreen = (props) => {
  const navigation = useNavigation();

  // OnGetNotfication In Background
  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {

        console.log('Message handled in the background!', remoteMessage) 
        if (remoteMessage) {
         
          navigation.navigate(remoteMessage?.data?.navigate,{data:remoteMessage,isBackground:true});
        }
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
       });
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerStyle={{
        width: "85%",
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="DiaspoBottomTab" component={BottomTabOrange} />
      <Drawer.Screen name="Home" component={Home} {...props} />
      <Drawer.Screen name="Scann" component={Scann} {...props} />
      <Drawer.Screen name="TopUp" component={TopUp} {...props} />
      <Drawer.Screen name="Payer" component={Payer} {...props} />
      <Drawer.Screen name="Wallet" component={Wallet} {...props} />
      <Drawer.Screen name="MyCode" component={MyCode} {...props} />
      <Drawer.Screen name="Request" component={Request} {...props} />
      <Drawer.Screen name="CashOut" component={CashOut} {...props} />
      <Drawer.Screen name="AddPlan" component={AddPlan} {...props} />
      <Drawer.Screen name="Tontine" component={Tontine} {...props} />
      <Drawer.Screen name="Discount" component={Discount} {...props} />
      <Drawer.Screen name="Planning" component={Planning} {...props} />
      <Drawer.Screen name="Analysis" component={Analysis} {...props} />
      <Drawer.Screen name="Settings" component={Settings} {...props} />
      <Drawer.Screen name="Languages" component={Language} {...props} />
      <Drawer.Screen name="Transfer" component={Transfers} {...props} />
      <Drawer.Screen name="ListPayer" component={ListPayer} {...props} />
      <Drawer.Screen name="Promotion" component={Promotion} {...props} />
      <Drawer.Screen name="ContactUs" component={ContactUs} {...props} />
      <Drawer.Screen name="Categories" component={Categories} {...props} />
      <Drawer.Screen name="CreateCard" component={CreateCard} {...props} />
      <Drawer.Screen name="PageForTest" component={PageForTest} {...props} />
      <Drawer.Screen name="AccountInfo" component={AccountInfo} {...props} />
      <Drawer.Screen name="EditAccount" component={EditAccount} {...props} />
      <Drawer.Screen name="Béneféciare" component={Béneféciare} {...props} />
      <Drawer.Screen name="TontineRecap" component={TontineRecap} {...props} />
      <Drawer.Screen name="PageForTest2" component={PageForTest2} {...props} />
      <Drawer.Screen name="BankAccounts" component={BankAccounts} {...props} />
      <Drawer.Screen name="CreditsCards" component={CreditsCards} {...props} />
      <Drawer.Screen name="CardFormInfo" component={CardFormInfo} {...props} />


      
      <Drawer.Screen
        name="CreateTontine"
        component={CreateTontine}
        {...props}
      />
      <Drawer.Screen
        name="Entertainment"
        component={Entertainment}
        {...props}
      />
      <Drawer.Screen
        name="AboutDiaspora"
        component={AboutDiaspora}
        {...props}
      />
      <Drawer.Screen
        name="PrivaciPolicy"
        component={PrivaciPolicy}
        {...props}
      />
      <Drawer.Screen
        name="ConfirmedList"
        component={ConfirmedList}
        {...props}
      />
      <Drawer.Screen
        name="CreateAccount"
        component={CreateAccount}
        {...props}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        {...props}
      />
      <Drawer.Screen
        name="ViewPayersList"
        component={ViewPayersList}
        {...props}
      />
      <Drawer.Screen
        name="EWalletAccounts"
        component={EWalletAccounts}
        {...props}
      />
      <Drawer.Screen
        name="ListBéneféciare"
        component={ListBéneféciare}
        {...props}
      />
      <Drawer.Screen
        name="TermsConditions"
        component={TermsConditions}
        {...props}
      />
      <Drawer.Screen
        name="InvitationTontine"
        component={InvitationTontine}
        {...props}
      />
      <Drawer.Screen
        name="InfoScreenTontine"
        component={InfoScreenTontine}
        {...props}
      />
      <Drawer.Screen
        name="HistoryTransaction"
        component={HistoryTransaction}
        {...props}
      />
      <Drawer.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        {...props}
      />
      <Drawer.Screen
        name="ViewBenefeciareList"
        component={ViewBenefeciareList}
        {...props}
      />
      <Drawer.Screen
        name="SearchNotifications"
        component={SearchNotifications}
        {...props}
      />
      <Drawer.Screen
        name="PoliciesInstructions"
        component={PoliciesInstructions}
        {...props}
      />
      <Drawer.Screen
        name="DetailsEntertainment"
        component={DetailsEntertainment}
        {...props}
      />
      <Drawer.Screen
        name="BenefeciareListReorder"
        component={BenefeciareListReorder}
        {...props}
      />
      <Drawer.Screen
        name="ConfirmedListBéneféciare"
        component={ConfirmedListBéneféciare}
        {...props}
      />
    </Drawer.Navigator>
  );
};
export default DrawerScreen;
