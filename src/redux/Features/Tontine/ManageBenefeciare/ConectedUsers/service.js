import axios from 'axios';

import {
  API_URL_WALLET_DEV,
  API_URL_STRIPE_DEV,
  API_URL_MOBILE_DEV,
  API_BASE_COMPLIANCE_DEV,
} from '@env';

let API_URL = `${API_URL_WALLET_DEV}/wallets/users/connected/users`;

// const API_URL =
//   "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/wallets/users/connected/users";

const api = async (dataUser, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, {mobileNumbers: dataUser}, config);
  return res.data.data.walletAccountUserMobile;
};
const connectedService = {
  api,
};
export default connectedService;
