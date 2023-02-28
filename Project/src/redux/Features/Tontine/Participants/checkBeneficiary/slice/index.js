import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import beneficiariesCheckService from "../service";

export const checkBeneficiaries = createAsyncThunk(
  "checkbeneficiaries/get",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
      const token = thunkAPI.getState().token.token;
      return await beneficiariesCheckService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceBeneficiariesCheck = createSlice({
  name: "checkbeneficiaries",
  initialState: {
    isCanAddBeneficiary: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetBeneficiariesCheck: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkBeneficiaries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkBeneficiaries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.status;
        state.isError = false;
        state.isCanAddBeneficiary = action.payload.data?.isCanAddBeneficiary?action.payload.data?.isCanAddBeneficiary:action.payload.data;
      })
      .addCase(checkBeneficiaries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.status;
        state.message = action.payload;
        state.isCanAddBeneficiary = null;
      });
  },
});

export const { resetBeneficiariesCheck } = sliceBeneficiariesCheck.actions;
export default sliceBeneficiariesCheck.reducer;
