import axios from "axios";

const API_URL = `https://fcm.googleapis.com/fcm/send`;
async function sendNotification(data) {
    // console.log('data', data.data)
  const FIREBASE_API_URL =
    "AAAA1kDfTIo:APA91bHEFn08Wy6nEALbslFYAtzbjtMC5P1XFJdhsW5d7BP3LWrkAIVByWhfC63fIibQiiBR97mw5g2u_PknCObB3LQ1ip3U8f4M7jAnQwFgNiHla1TuMarPcZ4ubj2XGT6AP8Ez3OUS";
  const message = {
    to: 
    data.token,
    
    data: data.data,
    notification: {
      title: data.title,
      body: data.body,
      vibarte: 1,
      sound: 1,
      show_in_forground: true,
      priority: "high",
      content_available: true,
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorisation: `Bearer ${FIREBASE_API_URL}`,
    },
  };
  const res = await axios.post(API_URL, message, config);
 
 
  console.log("res", res);
}
export default {
  sendNotification,
};
