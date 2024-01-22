import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import confirmBeneficiariesService from "./service";


export const getListBeneficiaries = createAsyncThunk(
  "Beneficiaries/get",
  async (obj, thunkAPI) => {
    try {
      return await confirmBeneficiariesService.api(obj);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getListBeneficiariesSlice = createSlice({
  name: "Beneficiaries",
  initialState: {
    loadingList: false,
    messageList: null,
    listBeneficiaries: null,
    isErrorList: null,
    isSuccessList:false
  },
  reducers: {
    resetListBeneficiariesSlice: (state, action) => {
      (state.loadingList = false), (state.messageList = null), (state.isErrorList = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListBeneficiaries.pending, (state) => {
        state.loadingList = true;
      })
      .addCase(getListBeneficiaries.fulfilled, (state, action) => {
        state.loadingList = false;
        state.isSuccessList = true;
        state.listBeneficiaries = action.payload;
      })
      .addCase(getListBeneficiaries.rejected, (state, action) => {
        state.loadingList = false;
        state.isErrorList = true;
        state.messageList = action.payload;
        state.isSuccessList = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetListBeneficiariesSlice } = getListBeneficiariesSlice.actions;

export default getListBeneficiariesSlice.reducer;
