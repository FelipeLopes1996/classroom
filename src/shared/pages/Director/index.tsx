import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { directors } from '../../../api/api';
import WrapperContainer from '../../components/WrapperContainer';
import CreateAndEditDirectorForm from './components/CreateAndEditDirectorForm';
import TableDirectors from './components/TableDirectors';
import { IDirector } from '../../types/IDirector';

const Director = () => {
  const [directorsData, setDirectorsData] = useState<IDirector[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [loading, setLoading] = useState(false);
  const [directorEditData, setDirectorEditData] = useState<IDirector>();

  useEffect(() => {
    setLoading(true);
    directors
      .getDirectors()
      .then((data) => {
        setDirectorsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!showForm && directorEditData && directorEditData.nome) {
      setShowForm(true);
    }
  }, [directorEditData, showForm, directorEditData?.nome]);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <WrapperContainer>
      <Typography sx={{ fontSize: '2.5rem' }}>Diretores</Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '8rem' }}>
          <CircularProgress size={50} />
        </Box>
      )}
      {!loading && directorsData?.length && !directorEditData?.nome ? (
        <TableDirectors
          directorsData={directorsData}
          setDirectorsData={setDirectorsData}
          setDirectorEditData={setDirectorEditData}
        />
      ) : null}
      {!loading && !directorsData?.length && !showForm && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid #ceced3',
            borderRadius: '4px',
            p: '2.5rem',
            mt: '2rem',
            gap: '2rem',
          }}
        >
          <Typography sx={{ fontSize: '1.6rem', fontWeight: 500 }}>
            Ainda não há um diretor
          </Typography>
          <Button onClick={() => setShowForm(true)}>Adicionar</Button>
        </Box>
      )}
      {showForm && (
        <CreateAndEditDirectorForm
          setShowForm={setShowForm}
          setDirectorsData={setDirectorsData}
          setSnackbarText={setSnackbarText}
          setOpen={setOpen}
          directorEditData={directorEditData}
          setDirectorEditData={setDirectorEditData}
        />
      )}
      <Snackbar
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%', fontSize: '1.5rem' }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </WrapperContainer>
  );
};

export default Director;
