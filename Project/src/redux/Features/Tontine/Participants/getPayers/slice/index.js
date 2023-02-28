import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import payersService from "../service";

export const getPayers= createAsyncThunk(
  "payers/get",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
      const token = thunkAPI.getState().token.token;
      return await payersService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const slicePayers = createSlice({
  name: "payers",
  initialState: {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetPayers: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getPayers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPayers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.status;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getPayers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.status;
        state.message = action.payload;
        state.data = null;
      });
  },
});

export const { resetPayers } = slicePayers.actions;
export default slicePayers.reducer;
