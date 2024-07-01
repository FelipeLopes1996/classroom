import { IStudent } from './../../../shared/types/IStudent';
import { requests } from '../../api';

export const student = {
  getStudents: (): Promise<IStudent[]> => requests.get('alunos'),
  getStudent: (id: number): Promise<IStudent> =>
    requests.get(`alunos/${id}`).then(),

  createStudent: (post: IStudent): Promise<IStudent> =>
    requests.post('alunos', post).then(),

  updateStudent: (post: IStudent, id: number): Promise<IStudent> =>
    requests.put(`alunos/${id}`, post).then(),

  deleteStudent: (id: number): Promise<void> =>
    requests.delete(`alunos/${id}`).then(),
};
