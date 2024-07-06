import { axiosInstance } from "../instance";
import { IResendConfirmationRequest } from "./types";
import Endpoints from "../endpoints";

export const resendConfirmation = (params: IResendConfirmationRequest) => {
  return axiosInstance.post(Endpoints.AUTH.RESEND_CONFIRMATION, params);
};
