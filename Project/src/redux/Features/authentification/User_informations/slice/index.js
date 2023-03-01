import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userInformationsService from "../service";
 

export const getUserInformations = createAsyncThunk(
  "userInformations/get",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
      const token = thunkAPI.getState().token.token;
      return await userInformationsService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

        console.log('message', message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceUserInformations = createSlice({
  name: "userInformations",
  initialState: {
    informationsUser: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetUserInformations: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserInformations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInformations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.status;
        state.isError = false;
        state.informationsUser = action.payload;
      })
      .addCase(getUserInformations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.status;
        state.message = action.payload;
        state.informationsUser = null;
      });
  },
});

export const { resetUserInformations } = sliceUserInformations.actions;
export default sliceUserInformations.reducer;
