import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const baseURL: string = 'https://jsonplaceholder.typicode.com';

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
