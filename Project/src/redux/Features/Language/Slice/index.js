import { createSlice } from "@reduxjs/toolkit";

export const Languages = createSlice({
  name: "userConnected",
  initialState: {
    Language: "English",
  },
  reducers: {
    restLanguage: (state, action) => {
      state.Language = "English";
    },
    changeLanguages: (state, action) => {
      state.Language = action.payload;
    },
  },
 
});
 
export const { restLanguage ,changeLanguages} = Languages.actions;

export default Languages.reducer;
