import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

import {API_URL_WALLET_DEV, APP_KEY_ID, APP_SECRET_KEY} from '@env';


export const getToken = createAsyncThunk('getToken', async () => {
  let url = `${API_URL_WALLET_DEV}/authentication/oauth2/token/${APP_KEY_ID}/${APP_SECRET_KEY}`;

  return axios.get(url).then(res => res.data);
});

const TokenSlice = createSlice({
  name: 'token',
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: '',
    token: null,
  },
  reducers: {
    resetToken: (state, action) => {
      state.token = null;
    },
  },

  extraReducers: {
    [getToken.pending]: (state, action) => {
      state.loading = true;
    },
    [getToken.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
      state.token = action.payload.data.AccessToken;
    },
    [getToken.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = action.error;
    },
  },
});

export const {resetToken} = TokenSlice.actions;
export default TokenSlice.reducer;
