import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import {onError} from '../../../../hooks';
import cashoutService from './service';

export const cashoutTransaction = createAsyncThunk(
  'transaction/post',
  async (object, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token.token;
      const {onErrorAction, onSuccessActionMTN,amount} = object;
      let res = await cashoutService.api(object, token);

      let success = {
        data: {
          CashIn: {
            status: 'successful',
            transactionId: '6447f0c4bb8025770e0f5402',
          },
        },
        status: 'success',
      };

      
       console.log('res', res)
       if (res.status == 'success') {
         onSuccessActionMTN(amount);
       } else {
         onErrorAction();
       }
      return res;
    } catch (error) {
      const {onErrorAction} = object;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      console.log('message cashoutTransaction', message);

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

const cashoutSlice = createSlice({
  name: 'transaction',
  initialState: {
    isError: false,
    status: false,
    isLoading: false,
    message: '',
    result: null,
    amount: '',
  },
  reducers: {
    clearTransactions: (state, action) => {
      state.isError = false;
      state.status = false;
      state.message = '';
      state.isLoading = false;
      state.result = null;
    },
    handlAmount: (state, action) => {
      state.amount = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(cashoutTransaction.pending, state => {
        state.isLoading = true;
      })
      .addCase(cashoutTransaction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = true;
        state.result = action.payload;
      })
      .addCase(cashoutTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {clearTransactions, handlAmount} = cashoutSlice.actions;
export default cashoutSlice.reducer;
