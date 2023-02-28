import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import updateTontineService from "../service";

export const updateTontine = createAsyncThunk(
  "updateTontine/put",
  async (object, thunkAPI) => {
 
    try {
      const token = thunkAPI.getState().token.token;
      // console.log('token', token)
      return await updateTontineService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceUpdateTontine = createSlice({
  name: "updateTontine",
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
      .addCase(updateTontine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTontine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.status;
        state.isError = false;
        state.result = action.payload;
      })
      .addCase(updateTontine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.status;
        state.message = action.payload;
        state.result = null;
      });
  },
});

export const {
  resetUpdateNotify,
 
} = sliceUpdateTontine.actions;
export default sliceUpdateTontine.reducer;
