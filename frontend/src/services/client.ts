import axios, { type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getStoredAccessToken, logout } from "./auth"


export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {

    const token = getStoredAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      logout()

      if (window.location.pathname !== '/') {
        window.location.assign('/')
      }
    }

    return Promise.reject(error);
  }
);