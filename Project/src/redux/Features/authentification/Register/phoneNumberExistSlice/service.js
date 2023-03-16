import axios from "axios";

const API_URL =
  "https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/mobile/exists";

//  !register user api

const api = async (mobileNumber, token) => {
  console.log('dataUser', mobileNumber)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(API_URL, {mobileNumber:mobileNumber}, config);
  return res.data;
};
const checkMobileNumber = {
  api,
};
export default checkMobileNumber;
