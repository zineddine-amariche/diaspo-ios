import axios from 'axios';
import Toast from 'react-native-simple-toast';

const API_URL =
  'https://fund-raising-svc-x6fr3lwlgq-ew.a.run.app/v1/fund-raising/projects';
const api = async obj => {
  let {data, projectId, token, OnResult} = obj;

  //  console.log('obj', obj)
  // console.log('projectId', projectId)
  let url = `${API_URL}/${projectId}/reorder/participants`;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let object = {
    list: data,
  };
// console.log('object', object)
  const res = await axios.put(url, object, config);
  //  console.log('postListReorderService ---', res.data)

  if (res.data.status == 'error') {
    Toast.show(res.data.StatusDescription.projectId?res.data.StatusDescription.projectId.toString():'Reorder failed try later !');
    // console.log('first', res.data)
  } else {
    Toast.show('Reorder is completed successfully');
    OnResult(res.data);

  }
  return res.data;
};
const postListReorderService = {
  api,
};
export default postListReorderService;
