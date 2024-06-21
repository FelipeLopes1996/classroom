import axios, { AxiosResponse } from 'axios';

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Content-Type': 'application/json',
  },
};

const instance = axios.create({
  baseURL: 'http://localhost:8090/',
  // baseURL: process.env.API_URL,
  timeout: 15000,
  headers: config.headers,
  withCredentials: true,
});

export interface IDirector {
  id?: number;
  nome: string;
  superUsuario: boolean;
}

// export interface IDirector {
//   userId?: number;
//   id?: number;
//   nome: string;
//   materia: string;
//   contratacao: string;
// }

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string): Promise<T> => instance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object): Promise<T> =>
    instance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object): Promise<T> =>
    instance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string): Promise<T> =>
    instance.delete<T>(url).then(responseBody),
};

export const directors = {
  getDirectors: (): Promise<IDirector[]> => requests.get('diretores'),
  getDirector: (id: number): Promise<IDirector> =>
    requests.get(`diretores/${id}`).then(),

  createDirectors: (post: IDirector): Promise<IDirector> =>
    requests.post('diretores', post).then(),

  updateDirector: (post: IDirector, id: number): Promise<IDirector> =>
    requests.put(`diretores/${id}`, post).then(),

  deleteDirector: (id: number): Promise<void> =>
    requests.delete(`diretores/${id}`).then(),
};
