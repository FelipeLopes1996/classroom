import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import { Avatar, CardHeader, IconButton } from '@mui/material';
import { Avatar, CardHeader } from '@mui/material';
// import dayjs from 'dayjs';
import { IClassroom } from '../../../shared/types/IClassroom';

interface IClassroomCard {
  classroomData: IClassroom;
  // setStudentsData: (value: (prevState: IStudent[]) => IStudent[]) => void;
  // setOpen: (value: boolean) => void;
  // setSnackbarText: (value: string) => void;
  // setStudentEditData: (value: IStudent) => void;
}

const ClassroomCard = ({
  classroomData,
  // setStudentsData,
  // setSnackbarText,
  // setOpen,
  // setStudentEditData,
}: IClassroomCard) => {
  // const { directorId } = useDirectorId();
  // const [openModal, setOpenModal] = useState(false);
  // const [studentId, setStudentId] = useState(0);
  // const [loading, setLoading] = useState(false);

  // const handleGetStudent = (student: IStudent) => {
  //   setStudentEditData(student);
  // };

  // const handleGetIdOpenModal = (id: number) => {
  //   setStudentId(id);
  //   setOpenModal(true);
  // };

  // const handleDelete = useCallback(async (): Promise<void> => {
  //   setLoading(true);
  //   try {
  //     if (studentId) {
  //       await student.deleteStudent(studentId);
  //       setStudentsData((prevState) =>
  //         prevState.filter((student) => student.id !== studentId)
  //       );
  //       setSnackbarText('Aluno excluído com sucesso!');
  //       setOpen(true);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [setOpen, setSnackbarText, setStudentsData, studentId]);

  return (
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
            Número da turma
          </Typography>
          <Typography
            sx={{ fontSize: 14, borderBottom: '1px solid #ceced3' }}
            color="text.secondary"
            gutterBottom
          >
            {classroomData.numero}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Professor
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {classroomData.professor}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Horário
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {classroomData.horario}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end', padding: '1.5rem 0 0 0' }}>
          {/* <IconButton
            disabled={!directorId}
            disableRipple
            sx={{
              mr: '0.5rem',
              color: '#3d93e8',
              '&:hover': { background: 'none' },
            }}
            onClick={() => handleGetStudent(studentData)}
          >
            <EditOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            disabled={!directorId}
            disableRipple
            sx={{ color: '#e71717', '&:hover': { background: 'none' } }}
            onClick={() => handleGetIdOpenModal(Number(studentData.id))}
          >
            <DeleteOutlineOutlinedIcon fontSize="large" />
          </IconButton> */}
        </CardActions>
      </Card>
      {/* <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        title={'Excluir aluno'}
        informationText={'Deseja realmente excluir o aluno?'}
        handleDelete={handleDelete}
        loading={loading}
      /> */}
    </Box>
  );
};

export default ClassroomCard;
