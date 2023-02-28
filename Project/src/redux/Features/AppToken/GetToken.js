import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

let Cl_ID = '1t37i9t15h3rvlib7g1u7odp23';
let Secret = 'avqbjl9vfeo1spfhv5qfp4ojrplg6guf3gv44q1hpvffk6nab8g';

export const getToken = createAsyncThunk('getToken', async () => {
  return axios
    .get(
      `https://wallet-gateway-svc-x6fr3lwlgq-nw.a.run.app/v1/authentication/oauth2/token/${Cl_ID}/${Secret}`,
    )
    .then(res => res.data);
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
