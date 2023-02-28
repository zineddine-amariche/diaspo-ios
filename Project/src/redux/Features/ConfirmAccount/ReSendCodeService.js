import axios from "axios";
// `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/confirmation/${item.walletAccountUser.email}/${data.code}`;
const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/resend`;
//  !register user api
const api = async (userName, token) => {
  // console.log('code', code)
    // console.log('userName---', userName)

  let url = `${API_URL}/${userName}/confirmationcode`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log('config', config)

  const res = await axios.get(url, config);
  //  console.log('ReSendCodeService', res.data)
  return res.data;
};
const ReSendCodeService = {
  api,
};
export default ReSendCodeService;
