import axios from "axios";

const API_URL =
  "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/wallets/users/connected/users";

const api = async (dataUser, token) => {

  console.log('dataUser', dataUser)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, { mobileNumbers: dataUser }, config);
  console.log('res.data----walletAccountUserMobile', res.data.data.walletAccountUserMobile)
  return res.data.data.walletAccountUserMobile;
};
const connectedService = {
  api,
};
export default connectedService;
