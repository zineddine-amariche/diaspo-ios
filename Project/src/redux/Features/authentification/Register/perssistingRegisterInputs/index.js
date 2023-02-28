import {createSlice} from '@reduxjs/toolkit';

const registerPerssisteSlice = createSlice({
  name: 'register',
  initialState: {
    isReturns: null,
    step_A: [],
    step_B: [],
    step_C: [],
    // step_D: [],
  },
  reducers: {
    activateReturn: (state, action) => {
      state.isReturns = action.payload;
    },
    get_step_A: (state, action) => {
      state.step_A = action.payload;
    },
    get_step_B: (state, action) => {
      state.step_B = action.payload;
    },
    get_step_C: (state, action) => {
      state.step_C = action.payload;
    },
    // get_step_D: (state, action) => {
    //   state.step_D = action.payload;
    // },
  },

  extraReducers: builder => {},
});

export const {activateReturn, get_step_A, get_step_B, get_step_C, get_step_D} =
  registerPerssisteSlice.actions;
export default registerPerssisteSlice.reducer;
