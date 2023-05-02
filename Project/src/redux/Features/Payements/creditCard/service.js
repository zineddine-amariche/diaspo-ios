import axios from 'axios';
import {API_URL_STRIPE_DEV} from '@env';

let API_URL = `${API_URL_STRIPE_DEV}/stripe/payments/intents`;

const api = async (data, token) => {
  let {userId, accountId, obj, amount} = data;
  let {currency} = obj;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // let uri = `${API_URL}/${amount}/${currency}/${accountId}/${userId}`;
  let uri = `${API_URL}/${accountId}`;
  const res = await axios.post(uri, obj, config);

  return res.data;
};
const creditCardService = {
  api,
};
export default creditCardService;
