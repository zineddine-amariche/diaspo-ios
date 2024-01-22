import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getUserService from "../Service";

export const getUser = createAsyncThunk("getUser/user", async (user, thunkAPI) => {
  // console.log('user', user)
  try {
    const token = thunkAPI.getState().token.token;
    return await getUserService.api(user, token);
  } catch (error) {
    const message =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const getUserSlice = createSlice({
  name: "getUser",
  initialState: {
    info: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetGetUser: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
 
  },

  extraReducers: (builder) => {
    builder

      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.info = action.payload.data;
       
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.info = null;
      })

  },
});

export const { resetGetUser } = loginSlice.actions;
export default getUserSlice.reducer;
