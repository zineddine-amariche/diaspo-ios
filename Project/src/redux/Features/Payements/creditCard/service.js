import axios from 'axios';

const API_URL =
  'https://wallet-payment-svc-x6fr3lwlgq-nw.a.run.app/v1/stripe/payments/form';

//  !register user api

const api = async (data, token) => {
  let {userId, accountId, obj, amount} = data;
  let {currency} = obj;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let uri = `${API_URL}/${amount}/${currency}/${accountId}/${userId}`;
// console.log('uri', uri)
   const res = await axios.get(uri, config);
   console.log('transaction credit card', res.data);

   return res;
};
const creditCardService = {
  api,
};
export default creditCardService;
