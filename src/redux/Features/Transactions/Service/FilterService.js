import axios from 'axios';

import {API_URL_WALLET_DEV} from '@env';

let API_URL = `${API_URL_WALLET_DEV}/wallets/users`;

const api = async (obj, token) => {
  let {userId, accountId, type, fromDate, toDate, page, limit} = obj;
  let url = `${API_URL}/${userId}/accounts/${accountId}/transactions?type=${type}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&limit=${limit}`;
  let url2 = `${API_URL}/${userId}/accounts/${accountId}/transactions?type=${type}&fromDate=${fromDate}&page=${page}&limit=${limit}`;
    // console.log('url', url);


   let postUrl = toDate?url : url2
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(postUrl, config);
  //  console.log('filter Transcations', res.data);
   return res.data;
};
const getFiltredTranscations = {
  api,
};
export default getFiltredTranscations;
