import WrapperContainer from '../../shared/components/WrapperContainer';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import { useDirectorId } from '../../shared/context/DirectorProvider';
import { ITeacher } from '../../shared/types/ITeacher';
import { useEffect, useState } from 'react';
import { teachers } from '../../api/services/teacher/requests';
import { useNavigate } from 'react-router-dom';
import IsData from '../../shared/components/IsData';
import TeacherCard from './components/TeacherCard';
import CreateOrEditTeacherForm from './components/CreateOrEditTeacherForm';

const Teacher = () => {
  const { directorId } = useDirectorId();
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState<ITeacher[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  const handleGoDirector = () => navigate('/diretores');

  useEffect(() => {
    setLoading(true);
    teachers
      .getTeachers()
      .then((data) => {
        setTeacherData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   // if (!showForm && studentData && studentEditData?.nome) {
  //   if (!showForm && teacherData) {
  //     setShowForm(true);
  //   }
  // }, [showForm, teacherData]);

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
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          '@media screen and (max-width: 650px)': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          },
        }}
      >
        <Typography sx={{ fontSize: '2.5rem' }}>Professores</Typography>
        {!showForm && teacherData?.length && directorId ? (
          <Button
            disabled={teacherData?.length === 10}
            sx={{
              '@media screen and (max-width: 650px)': {
                position: 'absolute',
                right: 0,
                top: -4,
              },
            }}
            onClick={() => setShowForm(true)}
          >
            Adicionar
          </Button>
        ) : null}

        {!showForm && !directorId ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              '@media screen and (max-width: 650px)': {
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                mt: '2rem',
                gap: '1rem',
              },
            }}
          >
            <Typography sx={{ fontSize: '1.5rem' }}>
              Você ainda não tem um diretor:
            </Typography>
            <Button onClick={handleGoDirector}>Adicionar diretor</Button>
          </Box>
        ) : null}
      </Box>
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: '8rem',
          }}
        >
          <CircularProgress size={50} />
        </Box>
      )}
      <Box
        sx={{
          mt: '2.5rem',
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(min(80%/2, max(350px, 80%/3)), 356px))',
          '@media screen and (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          },
        }}
      >
        {!loading && !showForm && teacherData.length
          ? // !classroomEditData?.numero
            teacherData.map((teacher) => (
              <TeacherCard
                key={teacher.id}
                teacherData={teacher}
                //   setTeacherData={setClassroomData}
                //   setSnackbarText={setSnackbarText}
                //   setOpen={setOpen}
                //   setTeacherEditData={setClassroomEditData}
              />
            ))
          : null}
      </Box>
      {!loading && !teacherData?.length && !showForm && directorId ? (
        <IsData title="Ainda não há professores" setShowForm={setShowForm} />
      ) : null}
      {showForm && (
        <CreateOrEditTeacherForm
          setShowForm={setShowForm}
          setTeacherData={setTeacherData}
          setSnackbarText={setSnackbarText}
          setOpen={setOpen}
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

export default Teacher;
