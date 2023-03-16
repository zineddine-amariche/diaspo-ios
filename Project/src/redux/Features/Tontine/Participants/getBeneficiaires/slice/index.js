import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import beneficiariesService from "../service";

export const getBeneficiaries = createAsyncThunk(
  "beneficiaries/get",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
      const token = thunkAPI.getState().token.token;
      return await beneficiariesService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceBeneficiaries = createSlice({
  name: "beneficiaries",
  initialState: {
    data: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetBeneficiaries: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getBeneficiaries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBeneficiaries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(getBeneficiaries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.data = null;
      });
  },
});

export const { resetBeneficiaries } = sliceBeneficiaries.actions;
export default sliceBeneficiaries.reducer;
