import axios from "axios";
import FormData from "form-data";

const API_DOC =
  "https://wallet-compliance-svc-x6fr3lwlgq-nw.a.run.app/v1/compliance/documents/users";
//  !register user api

const api = async (user) => {


  // console.log('data', JSON.parse(user.data.content))
  // console.log('data', user.data.type)
  // console.log('user[0]', user)

const {userId} = user
  const config = {
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'accept': "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data`,
    },
  };

  // data {"name": "IMG_20221213_123855.jpg", "type": "image/jpeg", "uri": "content://com.android.providers.media.documents/document/image%3A59"}

  const data = new FormData();
  data.append("type", user.data.type);
  data.append("content", JSON.parse(user.data.content));
  // await dispatch(profileActions.changeImage(data, token));


  // console.log('data', data)
  // console.log('`${API_DOC}/${userId}/documents`', `${API_DOC}/${userId}/documents`)

  const res = await axios.post(`${API_DOC}/${userId}/documents`, data, config);
  // console.log("res.data", res.data);

  // return res
 
};
const attachService = {
  api,
};
export default attachService;
