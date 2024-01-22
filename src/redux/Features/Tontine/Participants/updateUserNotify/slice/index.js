import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import updateNotifyService from "../service";

export const updateNotify = createAsyncThunk(
  "updateNotify/put",
  async (object, thunkAPI) => {
 
    try {
      const token = thunkAPI.getState().token.token;
      // console.log('token', token)
      return await updateNotifyService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceUpdateNotify = createSlice({
  name: "updateNotify",
  initialState: {
    result: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
 
  },
  reducers: {
    resetUpdateNotify: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
 
    
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateNotify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNotify.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload;
        state.isError = false;
        state.result = action.payload;
      })
      .addCase(updateNotify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.result = null;
      });
  },
});

export const {
  resetUpdateNotify,
 
} = sliceUpdateNotify.actions;
export default sliceUpdateNotify.reducer;
