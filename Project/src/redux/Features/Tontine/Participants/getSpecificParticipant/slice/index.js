import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import specificParticipantService from "../service";

export const getSpecificParticipant = createAsyncThunk(
  "SpecificParticipant/get",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
      const token = thunkAPI.getState().token.token;
      return await specificParticipantService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceSpecificParticipant = createSlice({
  name: "SpecificParticipant",
  initialState: {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetSpecificParticipant: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSpecificParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecificParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.status;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getSpecificParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.status;
        state.message = action.payload;
        state.data = null;
      });
  },
});

export const { resetSpecificParticipant } = sliceSpecificParticipant.actions;
export default sliceSpecificParticipant.reducer;
