import { ITeacher } from '../../../shared/types/ITeacher';
import { requests } from '../../api';

export const teachers = {
  getTeachers: (): Promise<ITeacher[]> => requests.get('professores'),
  getTeacher: (id: number): Promise<ITeacher> =>
    requests.get(`professores/${id}`).then(),

  createTeacher: (post: ITeacher): Promise<ITeacher> =>
    requests.post('professores', post).then(),

  updateTeacher: (post: ITeacher, id: number): Promise<ITeacher> =>
    requests.put(`professores/${id}`, post).then(),

  deleteTeacher: (id: number): Promise<void> =>
    requests.delete(`professores/${id}`).then(),
};
