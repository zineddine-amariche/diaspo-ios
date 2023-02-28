import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CreateTontineService from "../Services/createTontineService";
import GetTontineInfoService from "../Services/getTontineInfoService";
import ListTontineService from "../Services/listTontineServices";

export const createTontine = createAsyncThunk(
  "tontine/create",
  async (object, thunkAPI) => {

    try {
      let { token, userId, data } = object;


      return await CreateTontineService.api(userId, data, token);
    } catch (error) {
      // console.log('error', error.response)
      // console.log('response.data', error.response.data)
      // && error.response.data.status
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTontines = createAsyncThunk(
  "tontine/list",
  async (object, thunkAPI) => {
    try {
      let { token, userId, currentPage } = object;
      // console.log('currentPage', currentPage)

      return await ListTontineService.api(userId, currentPage, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTontinesProjectInfo = createAsyncThunk(
  "tontine/projectInfo",
  async (object, thunkAPI) => {
    try {
      let { token, projectId } = object;
      return await GetTontineInfoService.api(projectId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const tontineSlice = createSlice({
  name: "tontine",
  initialState: {
    tontines: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    tontineProjectInfo: null,
    ArrPayers:[],
    isTontineCreated:false,
    TontineCreated:[],
    selectedTontine:null
  },
  reducers: {
    resetTontine: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    addPayersList:(state , action)=>{
      state.ArrPayers = action.payload
    },
    resetcreateTontine:(state)=>{
      state.isSuccess=false
    },
    createSelectedTontine:(state,action)=>{
      state.selectedTontine=action.payload
    },
    resetSelectTontine:(state)=>{
      state.selectedTontine=null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTontine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTontine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload.status;
        state.isError = false;   
        state.isTontineCreated = true
        state.TontineCreated = action.payload

      })
      .addCase(createTontine.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload.status;
        state.message = action.payload;
        state.isSuccess = null;
        state.isTontineCreated = false
        state.TontineCreated = null


      })
      .addCase(getTontines.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTontines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tontines = action.payload.data;
      })
      .addCase(getTontines.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tontines = null;
      })

      .addCase(getTontinesProjectInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTontinesProjectInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tontineProjectInfo = action.payload.data;
      })
      .addCase(getTontinesProjectInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tontines = null;
      });
  },
});

export const { resetTontine,addPayersList ,resetcreateTontine,createSelectedTontine,resetSelectTontine} = tontineSlice.actions;
export default tontineSlice.reducer;
