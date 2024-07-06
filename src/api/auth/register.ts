import { axiosInstance } from "../instance";
import { IRegisterRequest } from "./types";
import Endpoints from "../endpoints";

export const register = (params: IRegisterRequest) => {
  return axiosInstance.post(Endpoints.AUTH.REGISTER, params);
};
