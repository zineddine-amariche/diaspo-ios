import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onError } from "../../../../../hooks";
import userInformationsService from "../service";
 

export const getUserInformations = createAsyncThunk(
  "userInformations/get",
  async (object, thunkAPI) => {
    try {
      const token = thunkAPI.getState().token.token;
      return await userInformationsService.api(object, token);
    } catch (error) {
      const {onErrorAction} = data;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

        if (message.status == 'error' &&message.status ) {
          message.statusDescription || message.StatusDescription
          ? Toast.show(
              `${message.status} , ${
                message.statusDescription
                  ? message.statusDescription
                  : message.StatusDescription
              }`,
            )
          : Toast.show(`${message} `);
        } else {
          if (
            message.StatusDescription
              ? message.StatusDescription
              : message.statusDescription == 'Expired token'
          ) {
            onError(
              message.status,
              message.StatusDescription
                ? message.StatusDescription
                : message.statusDescription,
              onErrorAction,
            );
          } else {
            onError(
              message.status,
              message.StatusDescription
                ? message.StatusDescription
                : message.statusDescription,
              null,
            );
          }
        }
        console.log('message--getUsersInfromation', message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const sliceUserInformations = createSlice({
  name: "userInformations",
  initialState: {
    informationsUser: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
  reducers: {
    resetUserInformations: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserInformations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInformations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = action.payload;
        state.isError = false;
        state.informationsUser = action.payload;
      })
      .addCase(getUserInformations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.informationsUser = null;
      });
  },
});

export const { resetUserInformations } = sliceUserInformations.actions;
export default sliceUserInformations.reducer;
