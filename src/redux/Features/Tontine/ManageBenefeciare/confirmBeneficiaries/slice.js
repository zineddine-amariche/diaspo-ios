import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import confirmBeneficiariesService from "./service";



export const confirmBeneficiaries = createAsyncThunk(
  "Beneficiaries/confirm",
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

export const confirmBeneficiariesSlice = createSlice({
  name: "Beneficiaries",
  initialState: {
    loading: false,
    message: null,
    result: null,
    isError: null,
    isSuccess:false
  },
  reducers: {
    resetconfirmBeneficiaries: (state, action) => {
      (state.loading = false), (state.message = null), (state.isError = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(confirmBeneficiaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmBeneficiaries.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.result = action.payload;
      })
      .addCase(confirmBeneficiaries.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { resetconfirmBeneficiaries } = confirmBeneficiariesSlice.actions;

export default confirmBeneficiariesSlice.reducer;
