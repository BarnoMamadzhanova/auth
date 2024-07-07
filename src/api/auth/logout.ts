import { axiosInstance } from "../instance";
import Endpoints from "../endpoints";

export const logout = () => {
  return axiosInstance.get(Endpoints.AUTH.LOGOUT);
};
