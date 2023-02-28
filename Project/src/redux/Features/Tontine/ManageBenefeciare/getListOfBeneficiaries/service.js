import axios from "axios";

const API_URL =
  "https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app​/v1/fund-raising/projects";
 
const api = async (obj) => {
    let {
        payerId,
        token
    } = obj
    let url = `${API_URL}/${payerId}/beneficiaries`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  // console.log('res.data', res.data)
  return res.data
};
const confirmBeneficiariesService = {
  api,
};
export default confirmBeneficiariesService;