import { AxiosPromise } from "axios";
import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";
import { ILoginRequest, ILoginResponse } from "./types";

export const login = (params: ILoginRequest): AxiosPromise<ILoginResponse> =>
  axiosInstance.post(Endpoints.AUTH.LOGIN, params);
