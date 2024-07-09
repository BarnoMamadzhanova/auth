import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { IConfirmRequest } from "./types";

export const confirmEmailRequest = (params: IConfirmRequest) => {
  return axiosInstance.get<string>(Endpoints.AUTH.CONFIRM, {
    params: { token: params.token },
  });
};
