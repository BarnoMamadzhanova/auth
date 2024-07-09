import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../main";
import { Dispatch } from "@reduxjs/toolkit";
import { isTokenExpired } from "../../utils/jwt";
import {
  IRegisterRequest,
  ILoginRequest,
  IResendConfirmationRequest,
} from "../../api/auth/types";
import {
  register,
  login,
  resendConfirmation,
  logout,
  refreshToken,
  confirmEmailRequest,
} from "../../api/auth/index";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
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
    loginSuccess: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
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
    confirmEmailStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    confirmEmailSuccess(state) {
      state.isLoading = false;
      state.error = null;
    },
    confirmEmailFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.error = null;
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
  resendConfirmationStart,
  resendConfirmationSuccess,
  resendConfirmationFailure,
  confirmEmailStart,
  confirmEmailFailure,
  confirmEmailSuccess,
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

export const loginUser =
  (data: ILoginRequest) => async (dispatch: Dispatch) => {
    try {
      dispatch(loginStart());
      const response = await login(data);
      dispatch(
        loginSuccess({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );
      localStorage.setItem("refreshToken", response.data.refreshToken);
    } catch (error: any) {
      console.error(error);
      dispatch(loginFailure(error.message));
    }
  };

export const confirmEmail =
  (token: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(confirmEmailStart());
      await confirmEmailRequest({ token });
      dispatch(confirmEmailSuccess());
    } catch (error: any) {
      console.error(error);
      dispatch(confirmEmailFailure(error.message));
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

export const getAccessToken =
  () =>
  async (
    dispatch: Dispatch<any>,
    getState: () => RootState
  ): Promise<string | null> => {
    try {
      const accessToken = getState().auth.accessToken;

      if (!accessToken || isTokenExpired(accessToken)) {
        const res = await refreshToken();
        dispatch(
          loginSuccess({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
          })
        );
        localStorage.setItem("refreshToken", res.data.refreshToken);
        return res.data.accessToken;
      }

      return accessToken;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

export const logoutUser =
  (): AppThunk => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const refreshToken = getState().auth.refreshToken;
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      await logout({ refreshToken });
      dispatch(logoutSuccess());
    } catch (error: any) {
      console.log(error);
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
