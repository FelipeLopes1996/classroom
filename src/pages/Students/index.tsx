import WrapperContainer from '../../shared/components/WrapperContainer';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import { IStudent } from '../../shared/types/IStudent';
import { useEffect, useState } from 'react';
import IsData from '../../shared/components/IsData';
import CreateOrEditStudentForm from './components/CreateOrEditStudentForm';
import { student } from '../../api/services/students';
import CardStudent from './components/StudentCard';
import { useDirectorId } from '../../shared/context/DirectorProvider';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const { directorId } = useDirectorId();
  const [studentData, setStudentData] = useState<IStudent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const navigate = useNavigate();
  const handleGoDirector = () => navigate('/diretores');
  const [studentEditData, setStudentEditData] = useState<IStudent>();

  useEffect(() => {
    setLoading(true);
    student
      .getStudents()
      .then((data) => {
        setStudentData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!showForm && studentData && studentEditData?.nome) {
      setShowForm(true);
    }
  }, [showForm, studentData, studentData.length, studentEditData]);

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
        <Typography sx={{ fontSize: '2.5rem' }}>Alunos</Typography>
        {!showForm &&
        studentData?.length &&
        directorId &&
        !studentEditData?.nome ? (
          <Button
            disabled={studentData?.length === 10}
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
        {!loading && !showForm && studentData.length && !studentEditData?.nome
          ? studentData.map((student) => (
              <CardStudent
                key={student.id}
                studentData={student}
                setStudentsData={setStudentData}
                setSnackbarText={setSnackbarText}
                setOpen={setOpen}
                setStudentEditData={setStudentEditData}
              />
            ))
          : null}
      </Box>
      {!loading && !studentData?.length && !showForm && directorId ? (
        <IsData title="Ainda não há aluno" setShowForm={setShowForm} />
      ) : null}
      {!loading &&
      !showForm &&
      !studentData.length &&
      !studentEditData?.nome &&
      !directorId ? (
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 500,
            mt: '6rem',
            textAlign: 'center',
          }}
        >
          Nenhum aluno foi encontrado.
        </Typography>
      ) : null}

      {showForm && (
        <CreateOrEditStudentForm
          setShowForm={setShowForm}
          setStudentsData={setStudentData}
          setSnackbarText={setSnackbarText}
          setOpen={setOpen}
          studentEditData={studentEditData}
          setStudentEditData={setStudentEditData}
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

export default Students;
