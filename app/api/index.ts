import { API_BASE_URL } from 'app/constants/api';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const instance = axios.create({
  baseURL: API_BASE_URL,
});

export const instanceFiles = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

function responsefulfilledInterceptor(res: AxiosResponse) {
  if (200 <= res.status && res.status < 300) {
    return res;
  }
  return Promise.reject(res);
}

function responseRejectedInterceptor(error: AxiosError) {
  return error;
}

instance.interceptors.response.use(
  responsefulfilledInterceptor,
  responseRejectedInterceptor
);

const getRequest = async (apiUrl: string, config?: AxiosRequestConfig) => {
  await instance.get(`${apiUrl}`, {
    ...config,
  });
};

const postRequest = async (
  apiUrl: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  const response = await instance.post(`${apiUrl}`, data, {
    ...config,
  });
  return response;
};

const patchRequest = async (
  apiUrl: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  const response = await instance.patch(`${apiUrl}`, data, {
    ...config,
  });
  return response;
};

export { getRequest, patchRequest, postRequest };
