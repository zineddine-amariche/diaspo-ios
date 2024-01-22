import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./Features/AppToken/GetToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import Languages from "./Features/Language/Slice/index.js";
import loginSlice from "./Features/authentification/Login/Slice";
import codeConfirmSlice from "./Features/ConfirmAccount/CodeSlice";
import ContactsSlice from "./Features/Tontine/ManagePayers/Contacts";
import registerSlice from "./Features/authentification/Register/Slice";
import walletAccountsSlice from "./Features/WalletAccount/Slice/index.js";
import tontineSlice from "./Features/Tontine/ManageTontine/Slices/tontineSlice";
import confirmPasswordSlice from "./Features/authentification/ConfirmPass/Slice";
import confirmPayersSlice from "./Features/Tontine/ManagePayers/confirmPayers/slice";
import getListPayersSlice from "./Features/Tontine/ManagePayers/getListOfPayers/slice";
import nonUserContactsSlice from "./Features/Tontine/ManageBenefeciare/NonAppUsers/slice";
import userConnectedSlice from "./Features/Tontine/ManageBenefeciare/ConectedUsers/slice";
import BeneficaireSlice from "./Features/Tontine/ManageBenefeciare/ManageStatesBeneficiare";
import payerseSlice from "./Features/Tontine/ManagePayers";
import forgotSlice from "./Features/authentification/ForgotPass/Slice";
import attachDocsSlice from "./Features/authentification/Register/AttachDocument/Slice";
import sliceParticipants from "./Features/Tontine/Participants/create/slice";
import sliceBeneficiaries from "./Features/Tontine/Participants/getBeneficiaires/slice";
import slicePayers from "./Features/Tontine/Participants/getPayers/slice";
import sliceSpecificParticipant from "./Features/Tontine/Participants/getSpecificParticipant/slice";
import sliceBeneficiariesCheck from "./Features/Tontine/Participants/checkBeneficiary/slice";
import sliceNotification from "./Features/Tontine/Participants/SendNotify/slice";
import sliceUpdateNotify from "./Features/Tontine/Participants/updateUserNotify/slice";
import sliceUpdateStatusParticipant from "./Features/Tontine/Participants/updateStatus/slice";
import NotificationsSlice from "./Features/Notifications/Slice";
import sliceUserInformations from "./Features/authentification/User_informations/slice"
import registerPerssisteSlice from "./Features/authentification/Register/perssistingRegisterInputs"
import tontineTypesSlice from './Features/Tontine/TontinesTypes'
import uploadPhotoSlice from './Features/kyc/identityVerefication/slice'
import reviewInfomations from './Features/authentification/ReviewInformations/slice'
import transactionSlice from './Features/Payements/MTN/slice'
import creditcCardSlice from './Features/Payements/creditCard/slice'
import AppSlice from './Features/App/Appslice'
import  getAllTransactions from './Features/Transactions/Slice'
import cashoutSlice from './Features/Payements/cashoutMTN/slice'
import emailExistsSlice from "./Features/authentification/Register/emailExistsSlice"
const reducers = combineReducers({
  token: TokenSlice,
  auth: loginSlice,
  code: codeConfirmSlice,
  contacts: ContactsSlice,
  tontines: tontineSlice,
  userApp: userConnectedSlice,
  nonUserApp: nonUserContactsSlice,
  beneficaire: BeneficaireSlice,
  register: registerSlice,
  payers: payerseSlice,
  forgot: forgotSlice,
  confirmpass: confirmPasswordSlice,
  selecetdPayers: confirmPayersSlice,
  payersList: getListPayersSlice,
  Languages: Languages,
  walletAccounts: walletAccountsSlice,
  docs: attachDocsSlice,
  createParticipants: sliceParticipants,
  benef: sliceBeneficiaries,
  getpayers: slicePayers,
  ParticipantInfo: sliceSpecificParticipant,
  BeneficiariesCheck: sliceBeneficiariesCheck,
  notify: sliceNotification,
  updateNotifiy: sliceUpdateNotify,
  statusParticipant:sliceUpdateStatusParticipant,
  storeNotifications:NotificationsSlice,
  userInformations:sliceUserInformations,
  registerPerssisteSlice,
  tontineTypesSlice,
  uploadPhotoSlice,
  existingEmail:emailExistsSlice,
  reviewInfomations,
  transaction:transactionSlice,
  creditCard:creditcCardSlice,
  AppSlice,
  getAllTransactions,
  cashoutSlice
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
     "auth",
    "token",
    "register",
    "contacts",
    "payersList",
    "walletAccounts",
  ],
  // whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;


