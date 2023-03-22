
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import registerService from '../Service';
import {onError} from '../../../../../hooks';
import Toast from 'react-native-simple-toast';

export const transaction = createAsyncThunk(
  'register/user',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token.token;
      const {onSuccess,onUserExist, obj} = data;
      let res = await registerService.api(obj, token);
      // console.log('res', res?.data?.walletAccountUser?.email);

      let userName = res?.data?.walletAccountUser?.email;
      if (res.status == 'success') {
        onSuccess(userName, res?.data?.walletAccountUser?.userId);
      }else{
        console.log('error',res)
      onUserExist()

      }
      return res;
    } catch (error) {
       onUserExist()

      const {onErrorAction,onUserExist} = data;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

        console.log('message', message);
 
     
      if (
        message.status == 'error' &&
        message.status &&
        message.statusDescription !== ''
      ) {
        Toast.show(`${message.status} , ${message.statusDescription}`);
        //
        //  if(message.statusDescription =="User already exists"   ){
        //
          //  onUserExist()
        //
      //  }
      
      } else if (!message.status) {
        Toast.show(`${message}`);
      } else {
        if (message.statusDescription == 'Expired token') {
          onError(message.status, message.statusDescription, onErrorAction);
        } else {
          onError(
            message.status,
            message.statusDescription == ''
              ? 'something went wrong'
              : message.statusDescription,
            null,
          );
        }
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    isError: false,
    status: false,
    isLoading: false,
    message: '',
    result: null,
  },
  reducers: {
 
   
    dispatchDeviceOS: (state, action) => {
      state.deviceOS = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(transaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(transaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = true;
        state.result = action.payload;
      })
      .addCase(transaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {resetRegister, ClearRegister, dispatchToken, dispatchDeviceOS} =
  registerSlice.actions;
export default registerSlice.reducer;
