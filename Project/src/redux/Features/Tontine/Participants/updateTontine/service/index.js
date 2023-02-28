import axios from "axios";

const API_URL = `https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app/v1/fund-raising/project`;

const api = async (object) => {

  const {projectId,data,token} = object
  let url = `${API_URL}/${projectId}/projects`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
// console.log('data', data)
  const res = await axios.put(url,data, config);
  // console.log("update/Tontine", res?.data);
  return res.data;
};
const updateTontineService = {
  api,
};
export default updateTontineService;
