import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import registerService from '../Service';
import {onError} from '../../../../../hooks';

export const register = createAsyncThunk(
  'register/user',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token.token;
      const {onSuccess, obj} = data;
      let res = await registerService.api(obj, token);
      console.log('res', res?.data?.walletAccountUser?.email);

      let userName = res?.data?.walletAccountUser?.email;
      if (res.status == 'success') {
        onSuccess(userName,res?.data?.walletAccountUser?.userId);
      }
      return res;
    } catch (error) {
      const {onErrorAction} = data;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

        console.log('register message', message)

        if (message.status == 'error' &&message.status ) {
          Toast.show(`${message.status} , ${message.statusDescription}`);
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

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    user: null,
    userName: null,
    isError: false,
    status: false,
    isLoading: false,
    message: '',
    devicetoken: null,
    deviceOS: null,
    userId: null,
  },
  reducers: {
    resetRegister: state => {
      state.isLoading = false;
      state.status = false;
      state.isError = false;
      state.message = '';
    },
    ClearRegister: state => {
      state.isLoading = false;
      state.status = false;
      state.isError = false;
      state.message = '';
      state.user = null;
      state.userName = null;
    },
    dispatchToken: (state, action) => {
      state.devicetoken = action.payload;
    },
    dispatchDeviceOS: (state, action) => {
      state.deviceOS = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = true;
        state.user = action.payload;
        state.userId = action.payload?.data?.walletAccountUser?.userId;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.StatusDescription;
        state.user = null;
        state.status = action.payload.StatusCode;
      });
  },
});

export const {resetRegister, ClearRegister, dispatchToken, dispatchDeviceOS} =
  registerSlice.actions;
export default registerSlice.reducer;
