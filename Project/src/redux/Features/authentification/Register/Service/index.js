import axios from "axios";

const API_URL =
  "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users";

//  !register user api

const api = async (dataUser, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, dataUser, config);
   console.log("register", res.data);

  return res.data;
};
const registerService = {
  api,
};
export default registerService;
