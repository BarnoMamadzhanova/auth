import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IRefreshToken } from "./types";

// export const refreshToken = (): AxiosPromise<IRefreshToken> =>
//   axiosInstance.post(Endpoints.AUTH.REFRESH);

export const refreshToken = (): AxiosPromise<IRefreshToken> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  return axiosInstance.post(Endpoints.AUTH.REFRESH, { refreshToken });
};
