import { Dispatch } from "@reduxjs/toolkit";
import { ILoginRequest } from "../../api/auth/types";
import { loginFailure, loginStart, loginSuccess } from "./authReducer";
import { login } from "../../api/auth";

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
