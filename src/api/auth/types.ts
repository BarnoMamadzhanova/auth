//  Login

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

//  Register
export interface IRegisterRequest {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

//  Resend Confirmation
export interface IResendConfirmationRequest {
  username: string;
  email: string;
}

//  Refresh

export interface IRefreshToken {
  accessToken: string;
  refreshToken: string;
}
