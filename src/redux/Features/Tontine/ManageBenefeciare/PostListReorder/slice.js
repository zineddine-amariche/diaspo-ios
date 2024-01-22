import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import postListReorderService from './service';

export const updateListReorder = createAsyncThunk(
  'updateListReorder/update',
  async (obj, {rejectWithValue}) => {
    try {
      return await postListReorderService.api(obj);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  },
);

export const postListReorderSlice = createSlice({
  name: 'updateListReorder',
  initialState: {
    loading: false,
    errorMsg: null,
    information: [],
    isError: null,
    isSuccess: false,
  },
  reducers: {
    resetResultUpdated: (state, action) => {
      (state.loading = false),
        (state.errorMsg = null),
        (state.information = []),
        (state.isError = null);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateListReorder.pending, state => {
        state.loading = true;
      })
      .addCase(updateListReorder.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.information = action.payload;
      })
      .addCase(updateListReorder.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.errorMsg = action.payload;
        state.isSuccess = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {resetResultUpdated} = postListReorderSlice.actions;

export default postListReorderSlice.reducer;
