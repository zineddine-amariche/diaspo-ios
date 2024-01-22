
import {createSlice} from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'transaction',
  initialState: {
    isBottomOpen: false,
  },
  reducers: {
    DisableBottomNav: (state, action) => {
      state.isBottomOpen = action.payload;
    },
  },
});

export const {DisableBottomNav} = AppSlice.actions;
export default AppSlice.reducer;
