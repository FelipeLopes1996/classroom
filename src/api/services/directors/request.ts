import { IDirector } from '../../../shared/types/IDirector';
import { requests } from '../../api';

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
