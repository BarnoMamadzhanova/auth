import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../main";
import {
  IRegisterRequest,
  ILoginRequest,
  IResendConfirmationRequest,
} from "../../api/auth/types";
import { register, login, resendConfirmation } from "../../api/auth/index";
import { Dispatch } from "@reduxjs/toolkit";
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
    resendConfirmationStart: (state) => {
      state.isLoading = true;
    },
    resendConfirmationSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    resendConfirmationFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  resendConfirmationStart,
  resendConfirmationSuccess,
  resendConfirmationFailure,
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

export const loginUser =
  (data: ILoginRequest) => async (dispatch: Dispatch) => {
    try {
      dispatch(loginStart());
      const response = await login(data);
      dispatch(loginSuccess(response.data.accessToken));
    } catch (error: any) {
      console.error(error);
      dispatch(loginFailure(error.message));
    }
  };

export const resendConfirmationEmail =
  (data: IResendConfirmationRequest) => async (dispatch: Dispatch) => {
    try {
      dispatch(resendConfirmationStart());
      await resendConfirmation(data);
      dispatch(resendConfirmationSuccess());
    } catch (error: any) {
      console.error(error);
      dispatch(resendConfirmationFailure(error.message));
    }
  };

export const selectAuthState = (state: RootState) => state.auth;

export default authReducer.reducer;

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
