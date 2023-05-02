import axios from 'axios';
import {API_URL_WALLET_DEV} from '@env';

// const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/authentication/forgot/confirm/new/password/users`;

let API_URL = `${API_URL_WALLET_DEV}/authentication/forgot/confirm/new/password/users`;

const api = async (obj, token) => {
  let url = `${API_URL}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(url, obj, config);
  return res.data;
};
const confirmCodeService = {
  api,
};
export default confirmCodeService;
