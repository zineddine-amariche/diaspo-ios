import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {onError} from '../../../../../hooks';
import Toast from 'react-native-simple-toast';
import checkMobileNumber from './service';

export const checkPhoneNumberExists = createAsyncThunk(
  'emailExists/post',
  async (object, thunkAPI) => {
    // console.log('user', user)

    const {mobileNumber, values, handleSubmit, onPhoneNumberSuccessAction} = object;
    console.log('----- mobileNumber', mobileNumber);
    try {
      const token = thunkAPI.getState().token.token;

      let res = await checkMobileNumber.api(mobileNumber, token);
      // console.log('data', res.data);
      if (res.status === 'success' && !res.data.isAlreadyExist) {
        onPhoneNumberSuccessAction(values);
        handleSubmit();
        return res.data;
      } else {
        Toast.show('Phone number already exist');
        return res.data;
      }
    } catch (error) {
      console.log('error', error.response)
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
const emailExistsSlice = createSlice({
  name: 'emailExists',
  initialState: {
    status: 'idle',
    error: null,
    exists: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkEmailExists.pending, state => {
        state.status = 'loading';
      })
      .addCase(checkEmailExists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.exists = action.payload.exists;
      })
      .addCase(checkEmailExists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default emailExistsSlice.reducer;
