import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-simple-toast';
import {onError} from '../../../hooks';
import transactionService from './service';

export const transaction = createAsyncThunk(
  'transaction/post',
  async (object, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token.token;
      const {onErrorAction, onSuccessAction, info} = object;

      let res = await transactionService.api(info, token);

      if (res.status == 'success') {
        onSuccessAction();
      } else {
        onErrorAction();
      }
      return res;
    } catch (error) {

      const {onErrorAction} = data;
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

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    isError: false,
    status: false,
    isLoading: false,
    message: '',
    result: null,
  },
  reducers: {
    clearTransactions: (state, action) => {
      state.isError = false;
      state.status = false;
      state.message = '';
      state.isLoading = false;
      state.result = null;
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

export const {clearTransactions} = transactionSlice.actions;
export default transactionSlice.reducer;
