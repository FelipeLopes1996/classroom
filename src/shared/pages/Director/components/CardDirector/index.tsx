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

interface ICardDirector {
  directorData: IDirector;
  setDirectorsData: (value: (prevState: IDirector[]) => IDirector[]) => void;
  setDirectorEditData: (value: IDirector) => void;
}

const CardDirector = ({
  directorData,
  setDirectorsData,
  setDirectorEditData,
}: ICardDirector) => {
  const [openModal, setOpenModal] = useState(false);
  const [directorId, setDirectorId] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleGetDirector = (director: IDirector) => {
    setDirectorEditData(director);
  };

  const handleGetIdOpenModal = (id: number) => {
    setDirectorId(id);
    setOpenModal(true);
  };

  const handleDelete = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      if (directorId) {
        await directors.deleteDirector(directorId);
        setDirectorsData((prevState) =>
          prevState.filter((state) => state.id !== directorId)
        );
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setDirectorsData, directorId]);

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
            sx={{ padding: '0', mr: '0.5rem' }}
            onClick={() => handleGetDirector(directorData)}
          >
            <EditOutlinedIcon fontSize="large" sx={{ color: '#3d93e8' }} />
          </IconButton>
          <IconButton
            onClick={() => handleGetIdOpenModal(Number(directorData.id))}
          >
            <DeleteOutlineOutlinedIcon
              fontSize="large"
              sx={{ color: '#e71717', pl: 0 }}
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