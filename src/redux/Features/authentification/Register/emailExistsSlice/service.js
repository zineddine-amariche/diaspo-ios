import axios from "axios";
import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';

const API_URL = `${API_URL_WALLET_DEV}/registration/users/email/exists`;
// const API_URL =
//   "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/email/exists";

//  !register user api

const api = async (email, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, {email}, config);
  return res.data;
};
const checkEmail = {
  api,
};
export default checkEmail;
