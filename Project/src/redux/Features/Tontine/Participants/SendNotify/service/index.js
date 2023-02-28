import axios from "axios";

const API_URL = `https://fcm.googleapis.com/fcm/send`;

//add/participants

const api = async (object) => {
   

  // console.log('object', object)
  let token =
    "AAAA1kDfTIo:APA91bHEFn08Wy6nEALbslFYAtzbjtMC5P1XFJdhsW5d7BP3LWrkAIVByWhfC63fIibQiiBR97mw5g2u_PknCObB3LQ1ip3U8f4M7jAnQwFgNiHla1TuMarPcZ4ubj2XGT6AP8Ez3OUS";
  const config = {
    headers: {
      "Content-Type" : 'application/json',
      Authorization: `Bearer ${token}`
    },
  };

  const res = await axios.post(API_URL, object, config);
  // console.log("[fcm/send] : notify", res.data);
  return res.data;
};
const notifyService = {
  api,
};
export default notifyService;
