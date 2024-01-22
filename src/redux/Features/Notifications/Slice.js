import { createSlice } from "@reduxjs/toolkit";

export const NotificationsSlice = createSlice({
  name: "userConnected",
  initialState: {
    invitations: [],
  },
  reducers: {
    resetInvitaions: (state, action) => {
      state.invitations =[];
    },
    updateInvitations: (state, action) => {
      state.invitations.push(action.payload);
    },
  },
});

export const {
  resetInvitaions,
  updateInvitations,
} = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
