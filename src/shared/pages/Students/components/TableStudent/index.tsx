import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useCallback, useState } from 'react';
import DeleteModal from '../../../../components/DeleteModal';
import { IStudent } from '../../../../types/IStudent';
import { directors } from '../../../../../api/services/directors/request';

const tableHeads: string[] = [
  'Nome',
  'idade',
  'Super Usuário',
  'dataNascimento',
  'sexo',
  'matricula',
  'Ações',
];

interface ITable {
  studentData: IStudent[];
  setStudentData: (value: (prevState: IStudent[]) => IStudent[]) => void;
  setStudentEditData?: (value: IStudent) => void;
}

const TableStudent = ({
  studentData,
  setStudentData,
  // setStudentEditData,
}: ITable) => {
  const [openModal, setOpenModal] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [loading, setLoading] = useState(false);

  // const handleGetDirector = (student: IStudent) => {
  const handleGetDirector = () => {
    // setStudentEditData(student);
  };

  const handleGetIdOpenModal = (id: number) => {
    setStudentId(id);
    setOpenModal(true);
  };

  const handleDelete = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      if (studentId) {
        await directors.deleteDirector(studentId);
        setStudentData((prevState) =>
          prevState.filter((state) => state.id !== studentId)
        );
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setStudentData, studentId]);

  return (
    <Box sx={{ mt: '2rem' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeads.map((value) => (
                <TableCell
                  sx={{ fontSize: '1.5rem', p: '2rem 1.5rem' }}
                  key={value}
                >
                  {value}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.length
              ? studentData.map((student) => (
                  <TableRow sx={{ p: '0' }} key={student.id}>
                    <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      {student.nome}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      {student.idade || '-'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      {student.dataNascimento && '--'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      {student.sexo && 'M'}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      {student.matricula && 'M'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        sx={{ padding: '0', mr: '0.5rem' }}
                        // onClick={() => handleGetDirector(student)}
                        onClick={() => handleGetDirector()}
                      >
                        <EditOutlinedIcon
                          fontSize="large"
                          sx={{ color: '#3d93e8' }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => handleGetIdOpenModal(Number(student.id))}
                      >
                        <DeleteOutlineOutlinedIcon
                          fontSize="large"
                          sx={{ color: '#e71717', pl: 0 }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        title={'Excluir Diretor'}
        informationText={'Deseja realmente excluir um aluno?'}
        handleDelete={handleDelete}
        loading={loading}
      />
    </Box>
  );
};

export default TableStudent;
