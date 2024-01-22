import axios from "axios";


import {
  API_URL_WALLET_DEV,
  API_URL_STRIPE_DEV,
  API_URL_MOBILE_DEV,
  API_BASE_COMPLIANCE_DEV,
} from '@env';

let API_URL = `${API_URL_WALLET_DEV}/authentication/users`;

// const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/authentication/users`;

//  !APi user api
const api = async (dataUser, token) => {
  // const { userName, userPassword } = dataUser;
  // console.log('dataUser', dataUser)
  // let url = `${API_URL}/${userName}/${userPassword}`
  // let url = `${API_URL}/${userName}/${userPassword}`
  // let object ={

  // }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // const res = await axios.get(url, config);
  const res = await axios.post(API_URL,dataUser, config);
  return res.data;
};
const loginService = {
  api,
};
export default loginService;
