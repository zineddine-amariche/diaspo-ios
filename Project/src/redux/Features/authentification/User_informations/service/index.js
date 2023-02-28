import axios from "axios";

const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/wallets/users`;

const api = async (userId, token) => {

  let url = `${API_URL}/${userId}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  // console.log("beneficiaries", res.data);
  return res.data;
};
const userInformationsService = {
  api,
};
export default userInformationsService;


