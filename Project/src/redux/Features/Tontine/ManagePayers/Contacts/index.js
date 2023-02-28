import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const ContactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: null,
    isLoading:false,
    isError:null,
  },
  reducers: {
    GetSatetContacts: (state, action) => {
      state.contacts = action.payload;
    },

    resetContacts:(state, action)=>{
      state.isLoading=false,
      state.isError=null
    }
  },
});

// Action creators are generated for each case reducer function
export const { GetSatetContacts,numbersSet } = ContactsSlice.actions;

export default ContactsSlice.reducer;
