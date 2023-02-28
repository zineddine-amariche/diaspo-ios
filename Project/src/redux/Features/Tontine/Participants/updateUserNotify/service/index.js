import axios from "axios";

const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/wallets/users`;

const api = async (object) => {

  const {userId,data,token} = object
  let url = `${API_URL}/${userId}/update/notify`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
// console.log('data', data)
  const res = await axios.put(url,data, config);
  // console.log("update/notify", res?.data?.data?.walletAccountUser?.device[0].deviceToken);
  return res.data;
};
const updateNotifyService = {
  api,
};
export default updateNotifyService;
