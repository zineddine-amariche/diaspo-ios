import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import connectedService from "../ConectedUsers/service";

export const connected = createAsyncThunk(
  "contacts/getNonAppUsers",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
      let { token, mobileNumbers } = object;
      return await connectedService.api(mobileNumbers, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userConnectedSlice = createSlice({
  name: "userConnected",
  initialState: {
    loading: false,
    message: null,
    connectedUsers: null,
    isError: null,
  },
  reducers: {
    resetUserConnected: (state, action) => {
      (state.loading = false), (state.message = null), (state.isError = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connected.pending, (state) => {
        state.loading = true;
      })
      .addCase(connected.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.connectedUsers = action.payload;
      })
      .addCase(connected.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetUserConnected } = userConnectedSlice.actions;

export default userConnectedSlice.reducer;
