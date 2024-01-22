import axios from 'axios';

import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';

let API_URL = `${API_URL_WALLET_DEV}/authentication/forgot/password/users`;
// const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/authentication/forgot/password/users`;

//  !Forgot password api
const api = async (dataUser, token) => {
  const {email_phone} = dataUser;
  let url = `${API_URL}/${email_phone}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  return res.data;
};
const forgotService = {
  api,
};
export default forgotService;
