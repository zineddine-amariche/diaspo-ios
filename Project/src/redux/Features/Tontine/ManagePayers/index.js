import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const payerseSlice = createSlice({
  name: "payers",
  initialState: {
    selectedconnectUser: [],
    selectedconnectUserContacts: [],
    selectedconnectNonUserApp: [],
    laoder:false,
    deleteListPayers:false

  },
  reducers: {
    resetPayers: (state) => {
      state.selectedconnectUser = [];
      state.selectedconnectUserContacts = [];
      state.selectedconnectNonUserApp = [];
    },

    updateUserConnectedPayers: (state, action) => {
      state.selectedconnectUser = action.payload;
      state.laoder = false;

    },
    updateUserContactsPayers: (state, action) => {
      state.selectedconnectUserContacts = action.payload;
      state.laoder = false;

    },
    updateNonAppUsersPayers: (state, action) => {
      state.selectedconnectNonUserApp = action.payload;
      state.laoder = false;

    },
    ActiveLoaderPayer: (state, action) => {
      state.laoder = true;

    },
    
    deleteSelectedListPayers:(state, action )=>{
      state.deleteListPayers = true
    },
    disableSelectedListPayers:(state, action )=>{
      state.deleteListPayers = false
    }
    
  },

  extraReducers: (builder) => {
    builder;
  },
});

export const {
  resetPayers,
  ActiveLoaderPayer,
  updateUserConnectedPayers,
  updateUserContactsPayers,
  updateNonAppUsersPayers,
  deleteSelectedListPayers,
  disableSelectedListPayers
} = payerseSlice.actions;
export default payerseSlice.reducer;
