import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { IClassroom } from '../../../../shared/types/IClassroom';
import { useDirectorId } from '../../../../shared/context/DirectorProvider';
import { classroom } from '../../../../api/services/classroom/requests';
import DeleteModal from '../../../../shared/components/DeleteModal';
import { useCallback, useState } from 'react';

interface IClassroomCard {
  classroomData: IClassroom;
  setClassroomData: (value: (prevState: IClassroom[]) => IClassroom[]) => void;
  setOpen: (value: boolean) => void;
  setSnackbarText: (value: string) => void;
  setClassroomEditData: (value: IClassroom) => void;
}

const ClassroomCard = ({
  classroomData,
  setClassroomData,
  setSnackbarText,
  setOpen,
  setClassroomEditData,
}: IClassroomCard) => {
  const { directorId } = useDirectorId();
  const [openModal, setOpenModal] = useState(false);
  const [classroomId, setClassroomId] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGetClassroom = (classroom: IClassroom) => {
    setClassroomEditData(classroom);
  };

  const handleGetIdOpenModal = (id: number) => {
    setClassroomId(id);
    setOpenModal(true);
  };

  const handleDelete = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      if (classroomId) {
        await classroom.deleteClassroom(classroomId);
        setClassroomData((prevState) =>
          prevState.filter((classroom) => classroom.id !== classroomId)
        );
        setSnackbarText('Sala excluída com sucesso!');
        setOpen(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setOpen, setSnackbarText, setClassroomData, classroomId]);

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
          <IconButton
            disabled={!directorId}
            disableRipple
            sx={{
              mr: '0.5rem',
              color: '#3d93e8',
              '&:hover': { background: 'none' },
            }}
            onClick={() => handleGetClassroom(classroomData)}
          >
            <EditOutlinedIcon fontSize="large" />
          </IconButton>
          <IconButton
            disabled={!directorId}
            disableRipple
            sx={{ color: '#e71717', '&:hover': { background: 'none' } }}
            onClick={() => handleGetIdOpenModal(Number(classroomData.id))}
          >
            <DeleteOutlineOutlinedIcon fontSize="large" />
          </IconButton>
        </CardActions>
      </Card>
      <DeleteModal
        open={openModal}
        setOpen={setOpenModal}
        title={'Excluir Sala'}
        informationText={'Deseja realmente excluir a sala?'}
        handleDelete={handleDelete}
        loading={loading}
      />
    </Box>
  );
};

export default ClassroomCard;
