import {
  Alert,
  Box,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import WrapperContainer from '../../shared/components/WrapperContainer';
import CreateAndEditDirectorForm from './components/CreateAndEditDirectorForm';
import { IDirector } from '../../shared/types/IDirector';
import { directors } from '../../api/services/directors/request';
import IsData from '../../shared/components/IsData';
import CardDirector from './components/CardDirector';

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
      <Typography sx={{ fontSize: '2.5rem' }}>Diretor</Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '8rem' }}>
          <CircularProgress size={50} />
        </Box>
      )}
      {!loading && directorsData?.length && !directorEditData?.nome
        ? directorsData.map((director) => (
            <CardDirector
              key={director.id}
              directorData={director}
              setDirectorsData={setDirectorsData}
              setDirectorEditData={setDirectorEditData}
              setSnackbarText={setSnackbarText}
              setOpen={setOpen}
            />
          ))
        : null}
      {!loading && !directorsData?.length && !showForm && (
        <IsData title="Ainda não há um diretor" setShowForm={setShowForm} />
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
          severity={snackbarText.includes('excluído') ? 'error' : 'success'}
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
