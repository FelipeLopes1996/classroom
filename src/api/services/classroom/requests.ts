import { IClassroom } from '../../../shared/types/IClassroom';
import { requests } from '../../api';

export const classroom = {
  getClassrooms: (): Promise<IClassroom[]> => requests.get('sala'),
  getClassroom: (id: number): Promise<IClassroom> =>
    requests.get(`sala/${id}`).then(),

  createClassroom: (post: IClassroom): Promise<IClassroom> =>
    requests.post('sala', post).then(),

  updateClassroom: (post: IClassroom, id: number): Promise<IClassroom> =>
    requests.put(`sala/${id}`, post).then(),

  deleteClassroom: (id: number): Promise<void> =>
    requests.delete(`sala/${id}`).then(),
};
