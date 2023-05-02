// https://mobile-payment-svc-x6fr3lwlgq-ew.a.run.app/v1/mtn/payments/accounts/{accountId}/cash-in

import axios from 'axios';

import {
  API_URL_WALLET_DEV,
  API_URL_STRIPE_DEV,
  API_URL_MOBILE_DEV,
  API_BASE_COMPLIANCE_DEV,
} from '@env';

let API_URL = `${API_URL_MOBILE_DEV}/mtn/payments/accounts`;

// const API_URL =
//   "https://mobile-payment-svc-x6fr3lwlgq-ew.a.run.app/v1/mtn/payments/accounts";

//  !register user api

const api = async (info, token) => {
  let {obj, accountId} = info;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let uri = `${API_URL}/${accountId}/cash-in`;

  const res = await axios.post(uri, obj, config);
  // console.log('transactionService', res.data);

  return res.data;
};
const transactionService = {
  api,
};
export default transactionService;
