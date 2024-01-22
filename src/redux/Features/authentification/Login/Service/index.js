import axios from 'axios';
import {API_URL_WALLET_DEV} from '@env';

let API_URL = `${API_URL_WALLET_DEV}/authentication/users`;

//  !Login user api

const api = async (dataUser, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, dataUser, config);
  return res.data;
};
const loginService = {
  api,
};
export default loginService;
