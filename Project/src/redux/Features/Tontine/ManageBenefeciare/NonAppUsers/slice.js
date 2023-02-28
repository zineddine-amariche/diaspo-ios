import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import nonAppService from "./service";

export const getNonAppUsers = createAsyncThunk(
  "userConnected/getConnectedUsers",
  async (object, thunkAPI) => {
    try {
      let { token, arr } = object;
      return await nonAppService.api(arr, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const nonUserContactsSlice = createSlice({
  name: "userConnected",
  initialState: {
    loader: false,
    message: null,
    nonConnectedUsers: null,
    isError: null,
  },
  reducers: {
    resetNonAppUserConnected: (state, action) => {
      (state.loader = false), (state.message = null), (state.isError = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNonAppUsers.pending, (state) => {
        state.loader = true;
      })
      .addCase(getNonAppUsers.fulfilled, (state, action) => {
        state.loader = false;
        state.isSuccess = true;
        state.nonConnectedUsers = action.payload;
      })
      .addCase(getNonAppUsers.rejected, (state, action) => {
        state.loader = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  resetNonAppUserConnected
} = nonUserContactsSlice.actions;

export default nonUserContactsSlice.reducer;
