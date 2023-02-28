import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// list fund-raising project
// /v1/fund-raising/projects/users/{userId}/projects
// /v1/fund-raising/project/{projectId}/projects
// /v1/fund-raising/project/{projectId}/projects
// /v1/fund-raising/projects/{projectId}/users/{userId}/close

const BeneficaireSlice = createSlice({
  name: "tontine",
  initialState: {
    selectedconnectUser: [],
    selectedconnectUserContacts: [],
    selectedconnectNonUserApp: [],
    laoder:false,
    deleteList:false,
    ListToReorder:[]
  },
  reducers: {
    resetBeneficaire: (state) => {
      state.selectedconnectUser = [];
      state.selectedconnectUserContacts = [];
      state.selectedconnectNonUserApp = [];
    },

    updateUserConnected: (state, action) => {
      state.selectedconnectUser = action.payload;
      state.laoder = false;
    },
    updateUserContacts: (state, action) => {
      state.selectedconnectUserContacts = action.payload;
      state.laoder = false;

    },
    updateNonAppUsers: (state, action) => {
      state.selectedconnectNonUserApp = action.payload;
      state.laoder = false;

    },
    ActiveLoader: (state, action) => {
      state.laoder = true;

    },
    deleteSelectedList:(state, action )=>{
      state.deleteList = true
    },
    disableSelectedList:(state, action )=>{
      state.deleteList = false
    },
    getToReoderListBeneficiary:(state, action)=>{
      state.ListToReorder =action.payload
    },
    deleteToReoderListBeneficiary:(state, action)=>{
      state.ListToReorder =[]
    }
  },

  extraReducers: (builder) => {
    builder;
  },
});
       
export const {
  resetBeneficaire,
  updateUserConnected,
  updateUserContacts,
  updateNonAppUsers,
  ActiveLoader,
  deleteSelectedList,
  disableSelectedList,
  getToReoderListBeneficiary,
  deleteToReoderListBeneficiary
} = BeneficaireSlice.actions;
export default BeneficaireSlice.reducer;
