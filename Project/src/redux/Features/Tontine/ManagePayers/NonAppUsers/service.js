import axios from "axios";

const API_URL =
  "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/wallets/users/non-app/users";


const api = async (dataUser, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL, {mobileNumbers:dataUser}, config);
  // console.log('res.data', res.data)
  return res.data;
};
const nonAppService = {
  api,
};
export default nonAppService;
