import Toast from 'react-native-simple-toast';

export const onError = (status, message,action) => {
    Toast.show(`${status} , ${message}`);
    if(action){
      action()
    }else{
      return
    }
  };

  export const onSucces = (status, message,action) => {
    Toast.show(`${status} , ${message}`);
    if(action){
      action()
    }else{
      return
    }
  };