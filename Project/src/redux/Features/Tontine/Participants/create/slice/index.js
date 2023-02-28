import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ParticipantsService from "../service";

export const createParticipants = createAsyncThunk(
  "participants/create",
  async (object, thunkAPI) => {
    // console.log('object', object)
    try {
      const token = thunkAPI.getState().token.token;
      return await ParticipantsService.api(object, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceParticipants = createSlice({
  name: "participants",
  initialState: {
    data: null,
    isError: false,
    status: false,
    isLoading: false,
    message: "",
    nonAppUserParticipants: null,
    participants: null,
    TypeOfParticipant:null
  },
  reducers: {
    resetParticipants: (state) => {
      state.isLoading = false;
      state.status = false;
      state.isError = false;
      state.message = "";
      state.nonAppUserParticipants = null;
      state.participants = null;
      state.data = null;
    },
    resetSuccesParticipants:(state)=>{
      state.status=false
      state.TypeOfParticipant=null
    },
    createTypeParticipants:(state,action)=>{
      state.TypeOfParticipant=action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createParticipants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createParticipants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.status;
        state.isError = false;
        state.data = action.payload.data;
        state.nonAppUserParticipants =
          action.payload.data?.nonAppUserParticipants;
        state.participants = action.payload.data?.participants;
      })
      .addCase(createParticipants.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.status;
        state.message = action.payload.StatusDescription;
        state.data = null;
        state.nonAppUserParticipants = null;
        state.participants = null;
      });
  },
});

export const { resetParticipants,resetSuccesParticipants,createTypeParticipants } = sliceParticipants.actions;
export default sliceParticipants.reducer;
