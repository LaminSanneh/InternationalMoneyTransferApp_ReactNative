import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import Api from '../../api/Api';

interface UpdateProfileData {
  name: String;
  email: String;
  address: String;
}

interface RegisterUserData {
  email: String;
  password: String;
}

interface LoginUserData {
  username: String;
  password: String;
}

interface Token {
  accessToken: string;
  tokenType: string;
}

interface AuthState {
  user: any;
  token: Token | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfileStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    updateProfileSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.user = action.payload;
    },
    updateProfileFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    uploadDocumentStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    uploadDocumentSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      // Update user profile with uploaded document information
      state.user.document = action.payload.document;
    },
    uploadDocumentFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    registerStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.token = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.isLoading = false;
      state.token = null;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const updateProfile = createAsyncThunk<void, UpdateProfileData>(
  'auth/updateProfile',
  async (userData, {dispatch}) => {
    try {
      dispatch(updateProfileStart());
      const response = await axios.put('/api/profile', userData);
      dispatch(updateProfileSuccess(response.data));
    } catch (error: any) {
      dispatch(updateProfileFailure(error.message));
    }
  },
);
//   (userData: any): AppThunk =>
//   async dispatch => {
//     try {
//       dispatch(updateProfileStart());
//       const response = await axios.put('/api/profile', userData); // Assuming your backend API endpoint for updating the profile
//       dispatch(updateProfileSuccess(response.data));
//     } catch (error) {
//       dispatch(updateProfileFailure(error.message));
//     }
//   };

export const uploadDocument = createAsyncThunk<void, any>(
  'auth/uploadDocument',
  async (documentData, {dispatch}) => {
    try {
      dispatch(uploadDocumentStart());
      // Perform file upload to server (e.g., using FormData)
      const response = await axios.post('/api/upload', documentData); // Assuming your backend API endpoint for uploading documents
      dispatch(uploadDocumentSuccess(response.data));
    } catch (error: any) {
      dispatch(uploadDocumentFailure(error.message));
    }
  },
);
// (documentData: any): AppThunk =>
// async dispatch => {
//   try {
//     dispatch(uploadDocumentStart());
//     // Perform file upload to server (e.g., using FormData)
//     const response = await axios.post('/api/upload', documentData); // Assuming your backend API endpoint for uploading documents
//     dispatch(uploadDocumentSuccess(response.data));
//   } catch (error) {
//     dispatch(uploadDocumentFailure(error.message));
//   }
// };

export const registerUser = createAsyncThunk<void, RegisterUserData>(
  'auth/registerUser',
  async (userData, {dispatch}) => {
    try {
      dispatch(registerStart());
      const response = await axios.post('/api/register', userData);
      dispatch(registerSuccess(response.data));
    } catch (error: any) {
      dispatch(registerFailure(error.message));
    }
  },
);

//   (userData: any): AppThunk =>
//   async dispatch => {
//     try {
//       dispatch(registerStart());
//       const response = await axios.post('/api/register', userData); // Assuming your backend API endpoint for registration
//       dispatch(registerSuccess(response.data));
//     } catch (error) {
//       dispatch(registerFailure(error.message));
//     }
//   };

export const loginUser = createAsyncThunk<void, LoginUserData>(
  'auth/loginUser',
  async (userData, {dispatch}) => {
    try {
      dispatch(loginStart());
      const response = await Api.auth.login(userData);
      dispatch(loginSuccess(response.data));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  },
);

export const logoutUser = createAsyncThunk<void>(
  'auth/logoutUser',
  async (userData, {dispatch}) => {
    try {
      dispatch(loginStart());
      const response = await Api.auth.logout();
      dispatch(logoutSuccess(response.data));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  },
);
//   (userData: any): AppThunk =>
//   async dispatch => {
//     try {
//       dispatch(loginStart());
//       const response = await axios.post('/api/login', userData); // Assuming your backend API endpoint for login
//       dispatch(loginSuccess(response.data));
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//     }
//   };

export const {
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  uploadDocumentStart,
  uploadDocumentSuccess,
  uploadDocumentFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
} = authSlice.actions;
export default authSlice.reducer;
