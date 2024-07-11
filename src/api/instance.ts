import axios from "axios";
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

// axiosInstance.interceptors.request.use(async (config) => {
//   try {
//     const accessToken = await store.dispatch(getAccessToken() as any);
//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//   } catch (error) {
//     console.error("Error fetching access token", error);
//   }
//   return config;
// });

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

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const state = store.getState();
    const { isAuth } = state.auth;

    if (!isAuth) {
      console.error("User is not authenticated. Redirecting to login.");
      window.location.href = "/login";
      return config;
    }

    const accessToken = await refreshAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.error(
        "Access token is expired or not available. Redirecting to login."
      );
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Error fetching access token:", error);
    window.location.href = "/login";
  }
  return config;
});
