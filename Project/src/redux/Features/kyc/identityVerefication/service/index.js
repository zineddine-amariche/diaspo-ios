import axios from 'axios';
import FormData from 'form-data';

import {API_URL_WALLET_DEV, API_BASE_COMPLIANCE_DEV} from '@env';

let API_URL = `${API_BASE_COMPLIANCE_DEV}/documents/users`;


// const API_URL =
//   'https://wallet-compliance-svc-x6fr3lwlgq-nw.a.run.app/v1/compliance/documents/users';
const api = async obejct => {
  const {fileName, typeImage, typeToSend, content, token, userId, onSucces} =
    obejct;

  let url = `${API_URL}/${userId}/documents`;

  const data = new FormData();
  data.append('type', typeToSend);
  data.append('content', {
    uri: content,
    type: typeImage,
    name: fileName,
  });


  const res = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
// console.log('res.data', res.data)
  return res.data;
};
const uploadphotoService = {
  api,
};
export default uploadphotoService;
