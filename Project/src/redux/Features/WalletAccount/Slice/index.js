import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onError } from "../../../../hooks";
import getListwalletAccounts from "../Service";



export const walletAccounts = createAsyncThunk("wallet/account", async (user, thunkAPI) => {
  //  console.log('user', user)
  try {
    const token = thunkAPI.getState().token.token;

    let res = await getListwalletAccounts.api(user, token)

    // if(res.data){

    // }
    // console.log('res', res.data.walletAccounts[0].accountId)
    return res
  } catch (error) {
   const {onErrorAction} = user;
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
      message.statusDescription
        ? Toast.show(
            `${message.status} , ${
              message.statusDescription == ''
                ? 'something went wrong'
                : message.statusDescription
            }`,
          )
        : Toast.show(`${message},something went wrong `);
    } else if (!message.status) {
      Toast.show(`${message}`);
    } else {
      if (message.statusDescription == 'Expired token') {
        onError(message.status, message.statusDescription,onErrorAction );
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
});

const walletAccountsSlice = createSlice({
  name: "wallet",
  initialState: {
    walletAccount: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    walletName:null,
    accountId:null
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
        state.accountId = action.payload.data.walletAccounts[0].accountId
       
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
