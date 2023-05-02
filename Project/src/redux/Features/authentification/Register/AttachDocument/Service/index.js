import axios from 'axios';
import FormData from 'form-data';

import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';

const API_DOC = `${API_BASE_COMPLIANCE_DEV}/documents/users`;
//  !register user api

const api = async user => {
  const {userId} = user;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
      accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.8',
      'Content-Type': `multipart/form-data`,
    },
  };

  const data = new FormData();
  data.append('type', user.data.type);
  data.append('content', JSON.parse(user.data.content));

  const res = await axios.post(`${API_DOC}/${userId}/documents`, data, config);

  return res;
};
const attachService = {
  api,
};
export default attachService;
