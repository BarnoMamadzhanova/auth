import axios, { AxiosRequestConfig } from "axios";
import { store } from "../store/main";
import { isTokenExpired } from "../utils/jwt";
import { loginSuccess, logoutSuccess } from "../store/auth/authReducer";
import { refreshAccessToken as apiRefreshAccessToken } from "./auth";

export const axiosInstance = axios.create({
  baseURL: "https://auth-project-production-d0e6.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const state = store.getState();
    let { accessToken, refreshToken } = state.auth;

    if (!refreshToken) {
      refreshToken = localStorage.getItem("refreshToken") || "";
    }

    if (isTokenExpired(accessToken)) {
      const res = await apiRefreshAccessToken({ refreshToken });
      accessToken = res.data.accessToken;
      refreshToken = res.data.refreshToken;

      store.dispatch(
        loginSuccess({
          accessToken,
          refreshToken,
        })
      );
      localStorage.setItem("refreshToken", refreshToken);
    }

    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    store.dispatch(logoutSuccess());
    localStorage.removeItem("refreshToken");
    return null;
  }
};

const authMiddleware = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  try {
    const { auth } = store.getState();
    const { isAuth } = auth;

    const nonAuthRoutes = ["/register", "/login"];

    if (!config.url || (!isAuth && !nonAuthRoutes.includes(config.url))) {
      console.error("User is not authenticated. Redirecting to login.");
      window.location.href = "/login";
      throw new Error("User is not authenticated.");
    }

    const accessToken = await refreshAccessToken();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      console.error(
        "Access token is expired or not available. Redirecting to login."
      );
      window.location.href = "/login";
      throw new Error("Access token is expired or not available.");
    }
  } catch (error) {
    console.error("Error in request middleware:", error);
    throw error;
  }

  return config;
};

const axiosRequest = async (config: AxiosRequestConfig): Promise<any> => {
  try {
    config = await authMiddleware(config);
    return axiosInstance(config);
  } catch (error) {
    console.error("Error in Axios request:", error);
    throw error;
  }
};

export default axiosRequest;
