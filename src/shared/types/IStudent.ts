export interface IStudent {
  id?: number;
  diretorId?: number;
  matricula: string;
  nome: string;
  idade: number;
  dataNascimento: string | null;
  sexo: string;
  sala_de_aula?: null | string;
}
