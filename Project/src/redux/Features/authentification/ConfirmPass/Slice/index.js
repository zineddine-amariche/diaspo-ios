import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {onError, onSucces} from '../../../../../hooks';
import confirmCodeService from '../Service';
import Toast from 'react-native-simple-toast';

export const confirmationPassword = createAsyncThunk(
  'confirm/newpassword',
  async (object, thunkAPI) => {
    // console.log('user', user)

    const {onSuccesAction, confirmationCode, userName, userPassword} = object;

    let obj = {
      confirmationCode,
      userName,
      userPassword,
    };

    try {
      const token = thunkAPI.getState().token.token;
      let res = await confirmCodeService.api(obj, token);

      if (res.status == 'success') {
        onSucces(res.status, `${res.data.StatusDescription}`);
        onSuccesAction();
      }
      return res;
    } catch (error) {
      const {onErrorAction} = object;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      if (message.status == 'error') {
        Toast.show(
          `${message.status} , ${
            message.StatusDescription
              ? message.StatusDescription
              : 'Something went wrong.'
          }`,
        );
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

const confirmPasswordSlice = createSlice({
  name: 'confirm',
  initialState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  },
  reducers: {
    resetConfirm: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },

  extraReducers: builder => {
    builder

      .addCase(confirmationPassword.pending, state => {
        state.isLoading = true;
      })
      .addCase(confirmationPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(confirmationPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const {resetConfirm} = confirmPasswordSlice.actions;
export default confirmPasswordSlice.reducer;
