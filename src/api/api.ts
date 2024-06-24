import axios, { AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const requests = {
  get: <T>(url: string): Promise<T> => instance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object): Promise<T> =>
    instance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object): Promise<T> =>
    instance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string): Promise<T> =>
    instance.delete<T>(url).then(responseBody),
};
