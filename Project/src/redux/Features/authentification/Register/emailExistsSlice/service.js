import axios from "axios";

const API_URL =
  "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/email/exists";

//  !register user api

const api = async (email, token) => {
  console.log('dataUser', email)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL, {email}, config);
  return res.data;
};
const checkEmail = {
  api,
};
export default checkEmail;
