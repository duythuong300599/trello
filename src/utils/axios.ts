import Axios, { AxiosError, AxiosResponse } from 'axios';

import configs from './configs';

const axiosInstance = Axios.create({
  timeout: 3 * 60 * 1000,
  baseURL: configs.BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) =>
    // const token = Cookies.get('token');
    // if (config) {
    //   return {
    //     ...config,
    //     headers: {
    //       ...config.headers,
    //       Authorization: `Bearer ${token}`,
    //     }
    //   };
    // }
    config,
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error),
);

export const sendGet = (url: string, params?: object) =>
  axiosInstance.get(url, { params }).then((res) => res.data);
export const sendPost = (url: string, params?: object, queryParams?: object) =>
  axiosInstance
    .post(url, params, { params: queryParams })
    .then((res) => res.data);
export const sendPut = (url: string, params?: object) =>
  axiosInstance.put(url, params).then((res) => res.data);
export const sendPatch = (url: string, params?: object) =>
  axiosInstance.patch(url, params).then((res) => res.data);
export const sendDelete = (url: string, params?: object) =>
  axiosInstance.delete(url, { data: params }).then((res) => res.data);
