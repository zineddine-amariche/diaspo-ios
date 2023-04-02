import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {onError} from '../../../../../../hooks';
import ParticipantsService from '../service';
import Toast from 'react-native-simple-toast';

export const createParticipants = createAsyncThunk(
  'participants/create',
  async (object, {rejectWithValue, getState}) => {
    const {onSuccesAction,obj} = object;
    const {projectId} =obj
    try {
      const token = getState().token.token;
      let res = await ParticipantsService.api(obj, token);
      if (res.status == 'success') {
        let data={
          participants :res.data.participants,
          projectId,
          routeData:"notify"

        }
        onSuccesAction(data);
      }
      return res;
    } catch (error) {
      const {onErrorAction} = object;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();
      console.log('message', message);
      if (message.status == 'error') {
        Toast.show(`${message.status} , ${message.statusDescription}`);
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
      return rejectWithValue(message);
    }
  },
);

const sliceParticipants = createSlice({
  name: 'participants',
  initialState: {
    data: null,
    isError: false,
    status: false,
    isLoading: false,
    message: '',
    nonAppUserParticipants: null,
    participants: null,
    TypeOfParticipant: null,
  },
  reducers: {
    resetParticipants: state => {
      state.isLoading = false;
      state.status = false;
      state.isError = false;
      state.message = '';
      state.nonAppUserParticipants = null;
      state.participants = null;
      state.data = null;
    },
    resetSuccesParticipants: state => {
      state.status = false;
      state.TypeOfParticipant = null;
    },
    createTypeParticipants: (state, action) => {
      state.TypeOfParticipant = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(createParticipants.pending, state => {
        state.isLoading = true;
      })
      .addCase(createParticipants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
        state.isError = false;
        state.data = action.payload.data;
        state.nonAppUserParticipants =
          action.payload.data?.nonAppUserParticipants;
        state.participants = action.payload.data?.participants;
      })
      .addCase(createParticipants.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.message = action.payload;
        state.data = null;
        state.nonAppUserParticipants = null;
        state.participants = null;
      });
  },
});

export const {
  resetParticipants,
  resetSuccesParticipants,
  createTypeParticipants,
} = sliceParticipants.actions;
export default sliceParticipants.reducer;
