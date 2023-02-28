import axios from "axios";

const API_URL = `https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app/v1/fund-raising/projects`;

// 63a55ae135471e4308072982

const api = async (obj, token) => {
  let url = `${API_URL}/${obj.projectId}/sanitycheck`;
  const config = {
    headers: {
      Authorization: `Bearer ${obj.token}`,
    },
  };


  const res = await axios.get(url, config);
  // console.log("check beneficiaries if can add ", res.data);
  return res.data;
};
const beneficiariesCheckService = {
  api,
};
export default beneficiariesCheckService;
