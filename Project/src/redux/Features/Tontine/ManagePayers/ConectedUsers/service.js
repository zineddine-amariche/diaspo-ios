import axios from "axios";

const API_URL =
  "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/wallets/users/connected/users";

const api = async (mobileNumbers, token) => {
 console.log('mobileNumbers','token', mobileNumbers)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let data ={
    mobileNumbers:mobileNumbers
  }

  // console.log('data.mobileNumbers______________________________________', data.mobileNumbers)
  const res = await axios.post(API_URL, data, config);
   console.log('res.data', res.data.data.walletAccountUserMobile)
   console.log('res.data', res.data.data)
  return res.data.data.walletAccountUserMobile;
};
const connectedService = {
  api,
};
export default connectedService;
