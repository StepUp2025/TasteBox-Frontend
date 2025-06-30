import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_TIMEOUT = import.meta.env.VITE_TIMEOUT
  ? parseInt(import.meta.env.VITE_TIMEOUT)
  : 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  return axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
    ...config,
  });
};

export const httpClient = createClient();
