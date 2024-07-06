import { Dispatch } from "@reduxjs/toolkit";
import { ILoginRequest } from "../../api/auth/types";
import { loginFailure, loginStart, loginSucess } from "./authReducer";
import api from "../../api";

export const loginUser =
  (data: ILoginRequest) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(loginStart());

      const res = await api.auth.login(data);

      dispatch(loginSucess(res.data.accessToken));
      // dispatch(getProfile())
    } catch (e: any) {
      console.error(e);

      dispatch(loginFailure(e.message));
    }
  };
