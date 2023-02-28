import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Logout} from '../authentification/Login/Slice';
import CodeService from './CodeService';
import ReSendCodeService from './ReSendCodeService';
import Toast from 'react-native-simple-toast';
import {onError} from '../../../hooks';

export const onConfirmCode = createAsyncThunk(
  'confirm/code',
  async (object, thunkAPI) => {
    const {code, token,onSuccess,onAccountConfirmed, userName} = object;
    try {
      let obj = {
        userName,
        code,
      };
      let data = await CodeService.api(obj, token);
      console.log('data.status', data.status)
      if(data.status=="success"){
        onSuccess()
      }
      if(data.status=="error"){
        // onAccountConfirmed()
         Toast.show(
           `${data.status}, ${data.statusDescription}`
         );
        console.log('status', data.status)
        console.log('first', data)
      }
      return data;
    } catch (error) {
      const {onErrorAction} = object;

      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      if (message.status == 'error') {
        Toast.show(
          `${message.status} , Invalid verification code provided, please try again"`,
        );
      } else {
        if (
          message.StatusDescription
            ? message.StatusDescription
            : message.statusDescription == 'Expired token'
        ) {
          onError(
            message.status,
            message.StatusDescription
              ? message.StatusDescription
              : message.statusDescription,
            onErrorAction,
          );
        } else {
          onError(
            message.status,
            message.StatusDescription
              ? message.StatusDescription
              : message.statusDescription,
            null,
          );
        }
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const onReSendCode = createAsyncThunk(
  'onReSend/code',
  async (object, thunkAPI) => {
    const {token, OnSendOtp, userName} = object;
    try {
      let res = await ReSendCodeService.api(userName, token);
      //  console.log('res', res)
      // console.log('token', token)
      if (res.status === 'success') {
        OnSendOtp(); //onSuccess
        Toast.show(`${res.status} , ${res.data.message}`);
      }

      return res;
    } catch (error) {
      const {onErrorAction} = object;

      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      if (message.status == 'error') {
        Toast.show(`${message.status} , ${message.StatusDescription}`);
      } else {
        if (
          message.StatusDescription
            ? message.StatusDescription
            : message.statusDescription == 'Expired token'
        ) {
          onError(
            message.status,
            message.StatusDescription
              ? message.StatusDescription
              : message.statusDescription,
            onErrorAction,
          );
        } else {
          onError(
            message.status,
            message.StatusDescription
              ? message.StatusDescription
              : message.statusDescription,
            null,
          );
        }
      }
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const codeConfirmSlice = createSlice({
  name: 'confirm',
  initialState: {
    userData: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    ReSendCode: null,
  },
  reducers: {
    resetCode: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },

  extraReducers: builder => {
    builder
      .addCase(onConfirmCode.pending, state => {
        state.isLoading = true;
      })
      .addCase(onConfirmCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(onConfirmCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = null;
      })
      .addCase(onReSendCode.pending, state => {
        state.isLoading = true;
      })
      .addCase(onReSendCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ReSendCode = action.payload.data;
      })
      .addCase(onReSendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tontines = null;
      });
  },
});

export const {resetCode} = codeConfirmSlice.actions;
export default codeConfirmSlice.reducer;
