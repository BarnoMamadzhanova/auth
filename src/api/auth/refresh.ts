import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IRefreshToken } from "./types";

export const refreshAccessToken = ({
  refreshToken,
}: {
  refreshToken: string;
}): AxiosPromise<IRefreshToken> => {
  return axiosInstance.post(Endpoints.AUTH.REFRESH, { refreshToken });
};
