import axios from 'axios';
import FormData from 'form-data';

const API_URL =
  'https://wallet-compliance-svc-x6fr3lwlgq-nw.a.run.app/v1/compliance/documents/users';
const api = async obejct => {
  // console.log('obejct', obejct)
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
