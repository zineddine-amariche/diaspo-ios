import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-simple-toast';
import {onError, onExpiredToken} from '../../../../hooks';
import creditCardService from '../../Payements/creditCard/service';
import ReviewInfomationsService from './service';

export const requestReviewInfomations = createAsyncThunk(
  'ReviewInfomations/request',
  async (object, thunkAPI) => {
    // console.log('user', user)
    // console.log('object', object)

    const {onSuccesAction, userId, onErrorAction} = object;
    try {
      const token = thunkAPI.getState().token.token;
      let data = await ReviewInfomationsService.api(userId, token);
      //  console.log('data', data)
      return data
    } catch (error) {
      const {onErrorAction} = object;
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
          onError(message.status, message.statusDescription, onErrorAction);
          // onExpiredToken()
        
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

const ReviewInfomations = createSlice({
  name: 'ReviewInfomations',
  initialState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    result: null,
  },
  reducers: {
    resetLogin: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },

  extraReducers: builder => {
    builder

      .addCase(requestReviewInfomations.pending, state => {
        state.isLoading = true;
      })
      .addCase(requestReviewInfomations.fulfilled, (state, action) => {
        state.result = action.payload.data;
        state.isLoading = false;

      })
      .addCase(requestReviewInfomations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.result = null;
      });
  },
});

export const {resetLogin} = ReviewInfomations.actions;
export default ReviewInfomations.reducer;
