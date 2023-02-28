import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import attachService from "../Service";

export const attachDocs = createAsyncThunk(
  "register/user",
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token.token;
      return await attachService.api(user,token);
    } catch (error) {
      // console.log('error', error.response)
      // console.log('response.data', error.response.data)
      // && error.response.data.status
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


const attachDocsSlice = createSlice({
  name: "register",
  initialState: {
    user: null,
    userName:null,
    isError: false,
    status: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetDocs: (state) => {
      state.isLoading = false;
      state.status = false;
      state.isError = false;
      state.message = "";
    },
    ClearDocs: (state) => {
      state.isLoading = false;
      state.status = false;
      state.isError = false;
      state.message = "";
      state.user = null;
      state.userName = null;
    },
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(attachDocs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(attachDocs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = true;
        state.user = action.payload;
      })
      .addCase(attachDocs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.status = action.payload;

      })


  },
});

export const { resetDocs ,ClearDocs} = attachDocsSlice.actions;
export default attachDocsSlice.reducer;
