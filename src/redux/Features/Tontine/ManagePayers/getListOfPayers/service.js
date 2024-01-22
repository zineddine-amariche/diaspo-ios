import axios from "axios";

const API_URL =
  "https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app​/v1/fund-raising/projects";
  // https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app​/v1/fund-raising/projects/633f26d63f8f998591cae995/payers
//   /v1/fund-raising/projects/{projectId}/add/payers

const api = async (obj) => {
    let {
        payerId,
        token
    } = obj
    let url = `${API_URL}/${payerId}/payers`;

    // console.log('payerId', payerId)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  // console.log('res.data get list payers', res.data)
  return res.data
};
const getListPayersService = {
  api,
};
export default getListPayersService;