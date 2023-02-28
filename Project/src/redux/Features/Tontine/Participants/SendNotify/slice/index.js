import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notifyService from "../service";

export const createNotification = createAsyncThunk(
  "notify/create",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
 
      return await notifyService.api(object);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceNotification = createSlice({
  name: "notify",
  initialState: {
    results: null,
    success: false,
    failure: null,
    isLoading: false,
  },
  reducers: {
    resetNotifications: (state) => {
      state.isLoading = false;
      state.success = false;
      state.failure = false;
      state.results = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNotification.pending, (state) => {
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

export const { resetNotifications } = sliceNotification.actions;
export default sliceNotification.reducer;
