import { axiosInstance } from "../instance";
import { IRegisterRequest } from "./types";

export const register = (data: IRegisterRequest) => {
  return axiosInstance.post("/api/auth/register", data);
};
