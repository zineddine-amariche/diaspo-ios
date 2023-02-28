import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import confirmPayersService from "./service";


export const getListPayers = createAsyncThunk(
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

export const getListPayersSlice = createSlice({
  name: "payers",
  initialState: {
    loadingList: false,
    messageList: null,
    listPayers: null,
    isErrorList: null,
    isSuccessList:false
  },
  reducers: {
    resetListPayersSlice: (state, action) => {
      (state.loadingList = false), (state.messageList = null), (state.isErrorList = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListPayers.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(getListPayers.fulfilled, (state, action) => {
        state.loadingList = false;
        state.isSuccessList = true;
        state.listPayers = action.payload;
      })
      .addCase(getListPayers.rejected, (state, action) => {
        state.loadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
        state.isSuccessList = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetListPayersSlice } = getListPayersSlice.actions;

export default getListPayersSlice.reducer;
