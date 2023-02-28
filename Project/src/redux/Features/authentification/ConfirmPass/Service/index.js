import axios from "axios";

const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/authentication/forgot/confirm/new/password/users`;

 
const api = async (obj, token) => {
 
  let url = `${API_URL}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(url, obj, config);
  // console.log('res.data', res.data)
  return res.data;
};
const confirmCodeService = {
  api,
};
export default confirmCodeService;
