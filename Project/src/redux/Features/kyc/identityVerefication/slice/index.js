import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import uploadphotoService from '../service';
import Toast from 'react-native-simple-toast';
import {onError} from '../../../../../hooks';

export const uploadPhoto = createAsyncThunk(
  'Beneficiaries/get',
  async (object, {rejectWithValue}) => {
    const {onSucces} = object;
    try {
      let res = await uploadphotoService.api(object);
      if (res.status == 'success') {
        onSucces();
      } else {
        Toast.show('success , this endpoint retunrn 200 but its an error  !');
      }
      return res;
    } catch (error) {
      const {onErrorAction} = object;
      const message =
        (error.response && error.response.data) ||
        error.message ||
        error.toString();

      if (message.status == 'error') {
        Toast.show(`${message.status} , ${message.StatusDescription}`);
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

export const uploadPhotoSlice = createSlice({
  name: 'uploadPhoto',
  initialState: {
    loading: false,
    messasge: null,
    result: null,
    isError: null,
    isSuccess: false,
    isFront: false,
    isBack: false,
    step: 1,
    openCamera: false,
    selfiePhotoObject: null,
    frontPhotoDocument: null,
    backPhotoDocument: null,
    ProofDocument: null,
    kycUserId:null
  },
  reducers: {
    resetuploadPhoto: (state, action) => {
      (state.loadingList = false),
        (state.messageList = null),
        (state.isErrorList = null);
    },
    activateFront: (state, action) => {
      state.isFront = true;
    },
    activateBack: (state, action) => {
      state.isBack = true;
    },
    desactiverFront: (state, action) => {
      state.isFront = false;
    },
    desactiverBack: (state, action) => {
      state.isBack = false;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    handleCamera: (state, action) => {
      state.openCamera = action.payload;
    },
    handleSelfiePhotoObject: (state, action) => {
      state.selfiePhotoObject = action.payload;
      state.openCamera = false;
    },
    handleClearSelfiePhotoObject: (state, action) => {
      state.selfiePhotoObject = null;
      state.openCamera = false;
    },
    handleFrontPhotoDocument: (state, action) => {
      state.frontPhotoDocument = action.payload;
      state.openCamera = false;
    },
    handleBackPhotoDocument: (state, action) => {
      state.backPhotoDocument = action.payload;
      state.openCamera = false;
    },
    handleClearFrontPhotoDocument: (state, action) => {
      state.frontPhotoDocument = null;
      state.openCamera = false;
    },
    handleClearBackPhotoDocument: (state, action) => {
      state.backPhotoDocument = null;
      state.openCamera = false;
    },
    handleProofDocument: (state, action) => {
      state.ProofDocument = action.payload;
      state.openCamera = false;
    },
    clearProofDocument: (state, action) => {
      state.ProofDocument = null;
      state.openCamera = false;
    },
    cleanAll: (state, action) => {
      state.backPhotoDocument = null;
      state.openCamera = false;
      state.ProofDocument = null;
      state.selfiePhotoObject = null;
      state.frontPhotoDocument = null;
      state.isBack = false;
      state.isFront = false;
      state.step = 1;
      // console.log('clear', action.payload);
      action.payload();
    },
    getkycUserId:(state,action)=>{
      state.kycUserId = action.payload;

    }
  },
  extraReducers: builder => {
    builder
      .addCase(uploadPhoto.pending, state => {
        state.loading = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.result = action.payload;
        state.messasge = null;
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.messasge = action.payload;
        state.isSuccess = false;
        state.result = action.payload;
      });
  },
});

export function myFunction(payload) {
  // define your function logic here
  return payload * 2;
}

// Action creators are generated for each case reducer function
export const {
  resetuploadPhoto,
  activateFront,
  activateBack,
  desactiverFront,
  desactiverBack,
  setStep,
  handleCamera,
  handleSelfiePhotoObject,
  handleFrontPhotoDocument,
  handleBackPhotoDocument,
  cleanAll,
  handleClearSelfiePhotoObject,
  handleClearFrontPhotoDocument,
  handleClearBackPhotoDocument,
  handleProofDocument,
  clearProofDocument,
  getkycUserId
} = uploadPhotoSlice.actions;

export default uploadPhotoSlice.reducer;
