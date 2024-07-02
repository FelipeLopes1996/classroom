import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import { IDirector } from '../../../../types/IDirector';
// import DeleteModal from '../../../../components/DeleteModal';
// import { useCallback, useState } from 'react';
// import { directors } from '../../../../../api/services/directors/request';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { IStudent } from '../../../../types/IStudent';
import { student } from '../../../../../api/services/students';
import DeleteModal from '../../../../components/DeleteModal';
import { useCallback, useState } from 'react';

interface ICardStudent {
  studentData: IStudent;
  setStudentsData: (value: (prevState: IStudent[]) => IStudent[]) => void;
  setOpen: (value: boolean) => void;
  setSnackbarText: (value: string) => void;
}

const CardStudent = ({
  studentData,
  setStudentsData,
  setSnackbarText,
  setOpen,
}: ICardStudent) => {
  const [openModal, setOpenModal] = useState(false);
  const [studentId, setStudentId] = useState(0);
  const [loading, setLoading] = useState(false);

  // const handleGetDirector = (director: IDirector) => {
  //   setDirectorEditData(director);
  // };

  const handleGetIdOpenModal = (id: number) => {
    setStudentId(id);
    setOpenModal(true);
  };

  const handleDelete = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      if (studentId) {
        await student.deleteStudent(studentId);
        setStudentsData((prevState) =>
          prevState.filter((student) => student.id !== studentId)
        );
        setSnackbarText('Aluno excluído com sucesso!');
        setOpen(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setOpen, setSnackbarText, setStudentsData, studentId]);

  return (
    // <Box sx={{ maxWidth: 350 }}>
    <Box>
      <Card variant="outlined" sx={{ p: '2rem' }}>
        <CardHeader
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: '0 0 1.5rem 0',
            width: '100%',
            '& .MuiCardHeader-avatar': {
              m: 0,
            },
          }}
          avatar={
            <Avatar sx={{ width: '6rem', height: '6rem', m: 0 }}>
              <AccountBoxOutlinedIcon
                sx={{ width: '5rem', height: '5rem' }}
                fontSize="large"
              />
            </Avatar>
          }
        />
        <CardContent sx={{ p: 0 }}>
          <Typography sx={{ mb: '0.5rem' }} variant="h5" component="div">
            Nome
          </Typography>
          <Typography
            sx={{ fontSize: 14, borderBottom: '1px solid #ceced3' }}
            color="text.secondary"
            gutterBottom
          >
            {studentData.nome}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Data de nascimento
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {studentData.dataNascimento}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Genero
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {studentData.sexo}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Matricula
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {studentData.matricula}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Sala de aula
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {studentData.sala_de_aula ? studentData.sala_de_aula : '-'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end', padding: '1.5rem 0 0 0' }}>
          <IconButton
            disabled={true}
            disableRipple
            sx={{
              mr: '0.5rem',
              color: '#3d93e8',
              '&:hover': { background: 'none' },
            }}
            // onClick={() => handleGetDirector(directorData)}
          >
            <EditOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            disableRipple
            sx={{ '&:hover': { background: 'none' } }}
            onClick={() => handleGetIdOpenModal(Number(studentData.id))}
          >
            <DeleteOutlineOutlinedIcon
              fontSize="large"
              sx={{
                color: '#e71717',
              }}
            />
          </IconButton>
        </CardActions>
      </Card>
      <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        title={'Excluir Aluno'}
        informationText={'Deseja realmente excluir o aluno?'}
        handleDelete={handleDelete}
        loading={loading}
      />
    </Box>
  );
};

export default CardStudent;
