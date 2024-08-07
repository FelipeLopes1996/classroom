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
import DeleteModal from '../../../../shared/components/DeleteModal';
import { IDirector } from '../../../../shared/types/IDirector';
import { directors } from '../../../../api/services/directors/request';
import { useDirectorId } from '../../../../shared/context/DirectorProvider';

const tableHeads: string[] = ['Nome', 'Super Usuário', 'Ações'];

interface ITable {
  directorsData: IDirector[];
  setDirectorsData: (value: (prevState: IDirector[]) => IDirector[]) => void;
  setDirectorEditData: (value: IDirector) => void;
}

const TableDirectors = ({
  directorsData,
  setDirectorsData,
  setDirectorEditData,
}: ITable) => {
  const { directorId, setDirectorId } = useDirectorId();
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGetDirector = (director: IDirector) => {
    setDirectorEditData(director);
  };

  const handleGetIdOpenModal = (id: number) => {
    setId(id);
    setOpenModal(true);
  };

  const handleDelete = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      if (id) {
        setDirectorId(Number(0));
        const resp = await directors.deleteDirector(id);
        setDirectorsData((prevState) =>
          prevState.filter((state) => state.id !== id)
        );
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, setDirectorId, setDirectorsData]);

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
            {directorsData.length
              ? directorsData.map((director) => (
                  <TableRow sx={{ p: '0' }} key={director.id}>
                    <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      {director.nome}
                    </TableCell>
                    <TableCell sx={{ fontSize: '1.2rem', fontWeight: 500 }}>
                      {director.superUsuario && 'Sim'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        sx={{ padding: '0', mr: '0.5rem' }}
                        onClick={() => handleGetDirector(director)}
                      >
                        <EditOutlinedIcon
                          fontSize="large"
                          sx={{ color: '#3d93e8' }}
                        />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleGetIdOpenModal(Number(director.id))
                        }
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
        informationText={'Deseja realmente excluir o diretor?'}
        handleDelete={handleDelete}
        loading={loading}
      />
    </Box>
  );
};

export default TableDirectors;
