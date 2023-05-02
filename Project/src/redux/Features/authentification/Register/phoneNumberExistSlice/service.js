import axios from "axios";
import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';

const API_URL = `${API_URL_WALLET_DEV}/registration/users/mobile/exists`;
 

const api = async (mobileNumber, token) => {
  // console.log('dataUser', mobileNumber)
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
