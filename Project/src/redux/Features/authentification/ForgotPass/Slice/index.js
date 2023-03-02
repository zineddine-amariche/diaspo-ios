import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {onError, onSucces} from '../../../../../hooks';
import forgotService from '../Service';
import Toast from 'react-native-simple-toast';

export const sendReqcode = createAsyncThunk(
  'forgot/sendReqcode',
  async (data, thunkAPI) => {
    const {user, onSuccesReq} = data;

    try {
      const token = thunkAPI.getState().token.token;
      let res = await forgotService.api(user, token);

      if (res.status == 'success') {
        onSucces(res.status, `code send to ${res.data.Destination}`);
        onSuccesReq();
      }
      return res;
    } catch (error) {
      const {onErrorAction} = data;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      if (message.status == 'error'&&message.status ) {
        message.statusDescription || message.StatusDescription
        ? Toast.show(
            `${message.status} , ${
              message.statusDescription
                ? message.statusDescription
                : message.StatusDescription
            }`,
          )
        : Toast.show(`${message} `);
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

const forgotSlice = createSlice({
  name: 'forgot',
  initialState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    username: null,
  },
  reducers: {
    resetForgot: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
  },

  extraReducers: builder => {
    builder

      .addCase(sendReqcode.pending, state => {
        state.isLoading = true;
      })
      .addCase(sendReqcode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.data;
      })
      .addCase(sendReqcode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {resetForgot, setUserName} = forgotSlice.actions;
export default forgotSlice.reducer;
