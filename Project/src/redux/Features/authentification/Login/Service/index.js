import axios from 'axios';

const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/authentication/users`;

//  !Login user api


const api = async (dataUser, token) => {
 
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, dataUser, config);
  return res.data;
};
const loginService = {
  api,
};
export default loginService;
