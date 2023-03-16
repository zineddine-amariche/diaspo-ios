import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import loginService from '../Service';
import Toast from 'react-native-simple-toast';
import {Alert} from 'react-native';
import {onError} from '../../../../../hooks';

export const login = createAsyncThunk(
  'auth/login',
  async (object, thunkAPI) => {
    // console.log('user', user)

    const {user, navtokyc, navtoReview, navtoHomePage} = object;
    try {
      const token = thunkAPI.getState().token.token;

      let data = await loginService.api(user, token);
      // console.log('00ta', data.data);
      if (data.status === 'success') {
        if (data.data.UserKycDetails?.kycStatus == 'NO_KYC') {
          navtokyc(data.data.userId);
        } else if (data.data.UserKycDetails?.kycStatus == 'PENDING_REVIEW') {
          navtoReview('PENDING_REVIEW', data.data);
          Toast.show(`account is under review `);
          // navtoHomePage(data.data.userId);
          //  navtokyc(data.data.userId);//for Test
        } else if (data.data.UserKycDetails?.kycStatus == 'FAILED') {
          navtoReview('FAILED', data.data.userId);
          Toast.show(`We failed to
          verify your information`);
        } else if (data.data.UserKycDetails?.kycStatus == 'VALIDATED') {
          navtoHomePage(data.data.userId);
          Toast.show(`${data.status} `);
        }

        return data;
      } else {
        console.log('error', 'Somthing went wrong.');
      }
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

const loginSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    notification: false,
    isAuth: false,
  },
  reducers: {
    resetLogin: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    Logout: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.user = null;
      state.isAuth = false;
    },
    setNotifyUser: (state, action) => {
      state.notification = action.payload?.data?.notification?.notify;
    },
    getPermission: (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
      state.isSuccess = true;
    },
    setLoader: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    setUserInfoOnLogin: (state, action) => {
      state.user = action.payload;
    },
    stopLoader: (state, action) => {
      state.isLoading = false;

    },
  },

  extraReducers: builder => {
    builder

      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const {
  resetLogin,
  Logout,
  setNotifyUser,
  getPermission,
  setLoader,
  setUserInfoOnLogin,
  stopLoader
} = loginSlice.actions;
export default loginSlice.reducer;
