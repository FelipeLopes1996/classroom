import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { ITeacher } from '../../../shared/types/ITeacher';
import { useDirectorId } from '../../../shared/context/DirectorProvider';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';

interface ITeacherCard {
  teacherData: ITeacher;
  // setTeacherData: (value: (prevState: ITeacher[]) => ITeacher[]) => void;
  // setOpen: (value: boolean) => void;
  // setSnackbarText: (value: string) => void;
  // setTeacherEditData: (value: ITeacher) => void;
}

const TeacherCard = ({ teacherData }: ITeacherCard) => {
  const { directorId } = useDirectorId();
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
            Nome
          </Typography>
          <Typography
            sx={{ fontSize: 14, borderBottom: '1px solid #ceced3' }}
            color="text.secondary"
            gutterBottom
          >
            {teacherData.nome || '-'}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Matéria
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {teacherData.materia || '-'}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Contratação
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {dayjs(teacherData.contratacao).format('DD/MM/YYYY')}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end', padding: '1.5rem 0 0 0' }}>
          <IconButton
            disabled={!directorId || true}
            disableRipple
            sx={{
              mr: '0.5rem',
              color: '#3d93e8',
              '&:hover': { background: 'none' },
            }}
            // onClick={() => handleGetTeacher(teacherData)}
          >
            <EditOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            disabled={!directorId || true}
            disableRipple
            sx={{ color: '#e71717', '&:hover': { background: 'none' } }}
            // onClick={() => handleGetIdOpenModal(Number(teacherData.id))}
          >
            <DeleteOutlineOutlinedIcon fontSize="large" />
          </IconButton>
        </CardActions>
      </Card>
      {/* <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        title={'Excluir professor'}
        informationText={'Deseja realmente excluir o professor(a)?'}
        handleDelete={handleDelete}
        loading={loading}
      /> */}
    </Box>
  );
};

export default TeacherCard;
