import { IStudent } from './IStudent';

export interface IClassroom {
  id?: number;
  numero: number;
  professor?: string;
  horario: string;
  alunos: IStudent[];
}
