import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-simple-toast';
import {onError} from '../../../../hooks';
import creditCardService from './service';

export const CrediteCard = createAsyncThunk(
  'creditCard/post',
  async (object, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token.token;
      const {onErrorAction, onSuccessAction, info} = object;
      const {amount} = info;
      let res = await creditCardService.api(info, token);


      console.log('res.status', res.status)
      if (res.status == 200) {
        onSuccessAction(amount);
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

const creditcCardSlice = createSlice({
  name: 'creditCard',
  initialState: {
    isError: false,
    status: false,
    isCreditCardLoading: false,
    message: '',
    result: null,
    amount: '',
  },
  reducers: {
    clearCreditCard: (state, action) => {
      state.isError = false;
      state.status = false;
      state.message = '';
      state.isCreditCardLoading = false;
      state.result = null;
    },
    handlAmountCreditCrad: (state, action) => {
      state.amount = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(CrediteCard.pending, state => {
        state.isCreditCardLoading = true;
      })
      .addCase(CrediteCard.fulfilled, (state, action) => {
        state.isCreditCardLoading = false;
        state.status = true;
        state.result = action.payload;
      })
      .addCase(CrediteCard.rejected, (state, action) => {
        state.isCreditCardLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {clearCreditCard, handlAmountCreditCrad} = creditcCardSlice.actions;
export default creditcCardSlice.reducer;
