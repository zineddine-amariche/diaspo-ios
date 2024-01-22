import axios from 'axios';

import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';

const API_URL = `${API_BASE_COMPLIANCE_DEV}/documents/users`;


// const API_URL = `https://wallet-compliance-svc-x6fr3lwlgq-nw.a.run.app/v1/compliance/documents/users`;

const api = async (USERID, token) => {
  let uri = `${API_URL}/${USERID}/documents`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // console.log('uri', uri)
  const res = await axios.get(uri, config);
  // console.log('res.data', res.data)
  
  return res.data;
  
};
const ReviewInfomationsService = {
  api,
};
export default ReviewInfomationsService;
