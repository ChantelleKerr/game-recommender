import axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL + "/api";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let token = localStorage.getItem("authTokens");

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token).access}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export const axiosWithoutInterceptor = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

export default axiosInstance;
