// https://mobile-payment-svc-x6fr3lwlgq-ew.a.run.app/v1/mtn/payments/accounts/{accountId}/cash-in

import axios from "axios";

const API_URL =
  "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users";

//  !register user api

const api = async (dataUser, token) => {
  console.log('dataUser', dataUser)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, dataUser, config);
   console.log("register", res.data);

  return res.data;
};
const registerService = {
  api,
};
export default registerService;


 