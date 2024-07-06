import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../main";
import { IRegisterRequest } from "../../api/auth/types";
import { register } from "../../api/auth/register";
export interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  isLoading: false,
  error: null,
};

// const registerFetch = createAsyncThunk(
//   "auth/registerFetch",
//   async (data: IRegisterRequest, thunkAPI) => {
//     try {
//       const response = await register(data);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.response.data as string);
//     }
//   }
// );

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.accessToken = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  // extraReducers: (builder) => {
  //   // Add reducers for additional action types here, and handle loading state as needed
  //   builder.addCase(registerFetch.pending, (state, action) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   });
  //   builder.addCase(registerFetch.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.error = null;
  //   });
  //   builder.addCase(registerFetch.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   });
  // },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
} = authReducer.actions;

export const registerUser =
  (data: IRegisterRequest): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(registerStart());
      await register(data);
      dispatch(registerSuccess());
    } catch (error: any) {
      dispatch(registerFailure(error.message));
    }
  };

export const selectAuthState = (state: RootState) => state.auth;

export default authReducer.reducer;
