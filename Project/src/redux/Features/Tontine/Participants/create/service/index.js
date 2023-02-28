import axios from "axios";

const API_URL = `https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app/v1/fund-raising/projects`;

//add/participants

const api = async (object, token) => {
  const { projectId, appUsers, noneAppUsers, type } = object;

  // console.log('object', object)
  let url = `${API_URL}/${projectId}/add/participants`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let objects = {
    appUsers,
    noneAppUsers,
    type,
  };
console.log('objects', objects)
  const res = await axios.post(url, objects, config);
   console.log("Create Participants", res.data);
  return res.data;
};
const ParticipantsService = {
  api,
};
export default ParticipantsService;
