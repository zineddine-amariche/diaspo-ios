import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import confirmPayersService from "./service";


export const confirmPayers = createAsyncThunk(
  "payers/confirm",
  async (obj, thunkAPI) => {
    try {
      return await confirmPayersService.api(obj);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const confirmPayersSlice = createSlice({
  name: "payers",
  initialState: {
    loadingPayers: false,
    message: null,
    result: null,
    isError: null,
  },
  reducers: {
    resetconfirmPayers: (state, action) => {
      (state.loadingPayers = false), (state.message = null), (state.isError = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmPayers.pending, (state) => {
        state.loadingPayers = true;
      })
      .addCase(confirmPayers.fulfilled, (state, action) => {
        state.loadingPayers = false;
        state.isSuccess = true;
        state.result = action.payload;
      })
      .addCase(confirmPayers.rejected, (state, action) => {
        state.loadingPayers = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetconfirmPayers } = confirmPayersSlice.actions;

export default confirmPayersSlice.reducer;
