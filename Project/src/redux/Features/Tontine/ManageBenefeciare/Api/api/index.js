import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginService from "../Service";



export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  // console.log('user', user)
  try {
    const token = thunkAPI.getState().token.token;
    return await loginService.api(user, token);
  } catch (error) {
    const message =
      (error.response && error.response.data) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetLogin: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    Logout: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.user = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
       
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

  },
});

export const { resetLogin ,Logout} = loginSlice.actions;
export default loginSlice.reducer;
