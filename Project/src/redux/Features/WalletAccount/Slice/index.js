import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getListwalletAccounts from "../Service";



export const walletAccounts = createAsyncThunk("wallet/account", async (user, thunkAPI) => {
  // console.log('user', user)
  try {
    const token = thunkAPI.getState().token.token;
    let res =await getListwalletAccounts.api(user, token)
    console.log('res.data--walletAccounts', res.data)
    return res
  } catch (error) {
    const message =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const walletAccountsSlice = createSlice({
  name: "wallet",
  initialState: {
    walletAccount: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    walletName:null
  },
  reducers: {
    resetwalletAccount: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    getWalletName : (state,action)=>{
      state.walletName = action.payload

    }
 
  },

  extraReducers: (builder) => {
    builder

      .addCase(walletAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(walletAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.walletAccount = action.payload.data;
       
      })
      .addCase(walletAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.walletAccount = null;
      })

  },
});

export const { resetwalletAccount,getWalletName } = walletAccountsSlice.actions;
export default walletAccountsSlice.reducer;
