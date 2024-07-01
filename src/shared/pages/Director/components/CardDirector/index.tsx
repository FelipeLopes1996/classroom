import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Typography from '@mui/material/Typography';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IDirector } from '../../../../types/IDirector';
import DeleteModal from '../../../../components/DeleteModal';
import { useCallback, useState } from 'react';
import { directors } from '../../../../../api/services/directors/request';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import { useDirectorId } from '../../../../context/DirectorProvider';

interface ICardDirector {
  directorData: IDirector;
  setDirectorsData: (value: (prevState: IDirector[]) => IDirector[]) => void;
  setDirectorEditData: (value: IDirector) => void;
  setOpen: (value: boolean) => void;
  setSnackbarText: (value: string) => void;
}

const CardDirector = ({
  directorData,
  setDirectorsData,
  setDirectorEditData,
  setSnackbarText,
  setOpen,
}: ICardDirector) => {
  const { setDirectorId } = useDirectorId();
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
        await directors.deleteDirector(id);
        setDirectorsData((prevState) =>
          prevState.filter((state) => state.id !== id)
        );
        setDirectorId(0);
        setSnackbarText('Diretor excluído com sucesso!');
        setOpen(true);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, setDirectorsData, setDirectorId, setSnackbarText, setOpen]);

  return (
    <Box sx={{ maxWidth: 350, m: '2rem auto 0' }}>
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
            {directorData.nome}
          </Typography>
          <Typography
            sx={{ mb: '0.5rem', mt: '1.5rem' }}
            variant="h5"
            component="div"
          >
            Super usuário
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              borderBottom: '1px solid #ceced3',
            }}
            color="text.secondary"
            gutterBottom
          >
            {directorData.superUsuario ? 'Sim' : 'Não'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end', padding: '1.5rem 0 0 0' }}>
          <IconButton
            disableRipple
            sx={{
              mr: '0.5rem',
              '&:hover': { background: 'none' },
            }}
            onClick={() => handleGetDirector(directorData)}
          >
            <EditOutlinedIcon fontSize="large" sx={{ color: '#3d93e8' }} />
          </IconButton>
          <IconButton
            disableRipple
            sx={{ '&:hover': { background: 'none' } }}
            onClick={() => handleGetIdOpenModal(Number(directorData.id))}
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
        title={'Excluir Diretor'}
        informationText={'Deseja realmente excluir o diretor?'}
        handleDelete={handleDelete}
        loading={loading}
      />
    </Box>
  );
};

export default CardDirector;
