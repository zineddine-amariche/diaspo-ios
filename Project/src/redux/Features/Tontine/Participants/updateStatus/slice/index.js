import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import updateStatusParticipantService from "../service";

export const updateStatusParticipant = createAsyncThunk(
  "updateStatusParticipant/put",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
      const token = thunkAPI.getState().token.token;
      return await updateStatusParticipantService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceUpdateStatusParticipant = createSlice({
  name: "updateStatusParticipant",
  initialState: {
    result: null,
    isError: false,
    isSuccess: false,
    Loading: false,
    message: "",
  },
  reducers: {
    resetUpdateStatusParticipant: (state) => {
      state.Loading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(updateStatusParticipant.pending, (state) => {
        state.Loading = true;
      })
      .addCase(updateStatusParticipant.fulfilled, (state, action) => {
        state.Loading = false;
        state.isSuccess = action.payload.status;
        state.isError = false;
        state.result = action.payload;
      })
      .addCase(updateStatusParticipant.rejected, (state, action) => {
        state.Loading = false;
        state.isError = action.payload.status;
        state.message = action.payload;
        state.result = null;
      });
  },
});

export const { resetUpdateStatusParticipant } = sliceUpdateStatusParticipant.actions;
export default sliceUpdateStatusParticipant.reducer;
