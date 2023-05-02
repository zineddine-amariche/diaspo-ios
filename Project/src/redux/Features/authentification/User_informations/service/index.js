import axios from "axios";
import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';


const API_URL = `${API_URL_WALLET_DEV}/wallets/users`;
// const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/wallets/users`;

const api = async (userId, token) => {

  let url = `${API_URL}/${userId}`;
  // console.log('url', url)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  return res.data;
};
const userInformationsService = {
  api,
};
export default userInformationsService;


