import axios from 'axios';

const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/authentication/forgot/password/users`;

//  !Forgot password api
const api = async (dataUser, token) => {
  const {email_phone} = dataUser;
  let url = `${API_URL}/${email_phone}`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  return res.data;
};
const forgotService = {
  api,
};
export default forgotService;
