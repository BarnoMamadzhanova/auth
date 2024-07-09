import axios from "axios";
import { store } from "../store/main";
import { getAccessToken } from "../store/auth/authReducer";

export const axiosInstance = axios.create({
  baseURL: "https://auth-project-production-d0e6.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await store.dispatch(getAccessToken() as any);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const accessToken = await store.dispatch(getAccessToken() as any);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch (error) {
    console.error("Error fetching access token", error);
  }
  return config;
});
