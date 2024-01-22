import axios from 'axios';

import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';

const API_URL = `${API_URL_WALLET_DEV}/registration/users/confirmation`;

// const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/confirmation`;

const api = async (dataUser, token) => {
  const {userName, code} = dataUser;
  let url = `${API_URL}/${userName}/${code}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  return res.data;
};
const CodeService = {
  api,
};
export default CodeService;
