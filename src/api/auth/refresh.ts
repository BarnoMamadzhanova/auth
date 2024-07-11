import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IRefreshToken } from "./types";

// export const refreshToken = async (): Promise<AxiosResponse<IRefreshToken>> => {
//   const refreshToken = localStorage.getItem("refreshToken");
//   if (!refreshToken) {
//     throw new Error("No refresh token available");
//   }
//   try {
//     const response = await axiosInstance.post(Endpoints.AUTH.REFRESH, {
//       refreshToken,
//     });
//     return response;
//   } catch (error) {
//     console.error("Error refreshing token", error);
//     throw error;
//   }
// };

export const refreshAccessToken = ({
  refreshToken,
}: {
  refreshToken: string;
}): AxiosPromise<IRefreshToken> => {
  return axiosInstance.post(Endpoints.AUTH.REFRESH, { refreshToken });
};
