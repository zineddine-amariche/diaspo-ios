import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {onError} from '../../../../hooks';
import getListTranscations from '../Service';
import getFiltredTranscations from '../Service/FilterService';

export const getAllTransactions = createAsyncThunk(
  'transactions/get',
  async (object, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token.token;
      let res = await getListTranscations.api(object, token);
      // console.log('res', res)
      return res;
    } catch (error) {
      const {onErrorAction} = object;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      console.log('message getAllTransactions', message);
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

export const filterTransactions = createAsyncThunk(
  'transactions/filter',
  async (obj, thunkAPI) => {
    let {onSucces, object} = obj;
    try {
      const token = thunkAPI.getState().token.token;
      let res = await getFiltredTranscations.api(object, token);
      if(res.status =='success'){
        onSucces()
      }
      return res;
    } catch (error) {
      const {onErrorAction} = obj;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      // console.log('message filter Transcations', message);
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

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    disable: true,
  },
  reducers: {
    resetTransctions: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    handleSelect: (state, action) => {
      state.disable = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getAllTransactions.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = action.payload.data;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.transactions = null;
      })

      .addCase(filterTransactions.pending, state => {
        state.isLoading = true;
      })
      .addCase(filterTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(filterTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.transactions = null;
      });
  },
});

export const {resetTransctions, handleSelect} = transactionsSlice.actions;
export default transactionsSlice.reducer;
