import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { ILogoutRequest } from "./types";

export const logout = (params: ILogoutRequest) => {
  return axiosInstance.post(Endpoints.AUTH.LOGOUT, params);
};
