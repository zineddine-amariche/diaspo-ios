import axios from "axios";

const API_URL = `https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app/v1/fund-raising/project`;
const api = async (userId, token,) => {
  let url = `${API_URL}/${userId}/projects`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.get(url, config);
    // console.log('projects By ID', res.data)
  return res.data;
};
const GetTontineInfoService = {
  api,
};
export default GetTontineInfoService;