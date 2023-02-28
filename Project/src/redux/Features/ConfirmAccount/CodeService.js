import axios from "axios";
// `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/confirmation/${item.walletAccountUser.email}/${data.code}`;
const API_URL = `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/registration/users/confirmation`;
//  !register user api
const api = async (dataUser, token) => {
  const { userName,code } = dataUser;
  // console.log('code', code)
  // console.log('userName', userName)
  // console.log('dataUser', dataUser)
  let url = `${API_URL}/${userName}/${code}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  // console.log('CodeService', res.data)
  return res.data;
};
const CodeService = {
  api,
};
export default CodeService;
