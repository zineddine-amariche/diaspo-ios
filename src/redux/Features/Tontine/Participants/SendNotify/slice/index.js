import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import notifyService from '../service';
import Toast from 'react-native-simple-toast';

export const createNotification = createAsyncThunk(
  'notify/create',
  async (dataObject, thunkAPI) => {
    const {object, onNotifyError, onNotifySuccess} = dataObject;

    try {
      let res = await notifyService.api(object);

      if (res.status == 200) {
        onNotifySuccess();
        Toast.show(
          `notification success ${res.data.success} / notification failed ${res.data.failure} /`,
        );
        return res.data;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      console.log('message-notify', message);
      onNotifyError();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const sliceNotification = createSlice({
  name: 'notify',
  initialState: {
    results: null,
    success: false,
    failure: null,
    isLoading: false,
  },
  reducers: {
    resetNotifications: state => {
      state.isLoading = false;
      state.success = false;
      state.failure = false;
      state.results = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createNotification.pending, state => {
        state.isLoading = true;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.success;
        state.results = action.payload.results;
        state.failure = false;
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.failure = action.payload;
        state.success = null;
        state.results = null;
      });
  },
});

export const {resetNotifications} = sliceNotification.actions;
export default sliceNotification.reducer;
