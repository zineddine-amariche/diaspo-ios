import axios from 'axios';

import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';

let API_URL = `${API_URL_WALLET_DEV}/registration/users/resend`;

// const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/resend`;

const api = async (userName, token) => {
  let url = `${API_URL}/${userName}/confirmationcode`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log('config', config)

  const res = await axios.get(url, config);
  //  console.log('ReSendCodeService', res.data)
  return res.data;
};
const ReSendCodeService = {
  api,
};
export default ReSendCodeService;
