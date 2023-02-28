import axios from "axios";

const API_URL =
  "https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app/v1/fund-raising/projects";


const api = async (obj) => {

    let {
        appUsers,
        noneAppUsers,
        projectId,
        token
    } = obj
    const {userId} =appUsers[0]
    // console.log('appUsers',appUsers)
    // console.log('noneAppUsers',noneAppUsers)
    // console.log('projectId',projectId)
    let url = `${API_URL}/${projectId}/add/beneficiaries`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
 

  let object ={
   appUsers: appUsers,
   noneAppUsers:noneAppUsers,
  }

  const res = await axios.post(url, object, config);
  // console.log('res.data --- slice', res.data)
  return res.data
};
const confirmBeneficiariesService = {
  api,
};
export default confirmBeneficiariesService;