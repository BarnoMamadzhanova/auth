import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://auth-project-production-d0e6.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
});
