import axios from "axios";

const API_URL = `https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app/v1/fund-raising/projects/participants/`;
// {participantId}/participants
const api = async (object, token) => {
  let url = `${API_URL}/${object}/participants`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(url, config);
  // console.log("participants", res.data);
  return res.data;
};
const specificParticipantService = {
  api,
};
export default specificParticipantService;
