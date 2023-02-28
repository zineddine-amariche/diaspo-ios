import {createSlice} from '@reduxjs/toolkit';

const tontineTypesSlice = createSlice({
  name: 'tontine',
  initialState: {
    ActiveTontines: [],
  },
  reducers: {
    addActiveTontine: (state, action) => {
      state.ActiveTontines = action.payload;
    },
  },

  extraReducers: builder => {
    builder;
  },
});

export const {addActiveTontine} = tontineTypesSlice.actions;
export default tontineTypesSlice.reducer;
