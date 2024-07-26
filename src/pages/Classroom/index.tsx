import { Box, Button, CircularProgress, Typography } from '@mui/material';
import WrapperContainer from '../../shared/components/WrapperContainer';
import IsData from '../../shared/components/IsData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDirectorId } from '../../shared/context/DirectorProvider';
import { IClassroom } from '../../shared/types/IClassroom';
import { classroom } from '../../api/services/classroom/requests';
import ClassroomCard from './components/ClassroomCard';

const Classroom = () => {
  const { directorId } = useDirectorId();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const handleGoDirector = () => navigate('/diretores');
  const [classroomData, setClassroomData] = useState<IClassroom[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    classroom
      .getClassrooms()
      .then((data) => {
        setClassroomData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  console.log(classroomData);
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
        <Typography sx={{ fontSize: '2.5rem' }}>Turmas</Typography>
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
        {!loading && !showForm && classroomData.length
          ? classroomData.map((classroom) => (
              <ClassroomCard
                key={classroom.id}
                classroomData={classroom}
                // setStudentsData={setStudentData}
                // setSnackbarText={setSnackbarText}
                // setOpen={setOpen}
                // setStudentEditData={setStudentEditData}
              />
            ))
          : null}
      </Box>
      {!loading && !classroomData?.length && !showForm && directorId ? (
        <IsData title="Ainda não há turmas" setShowForm={setShowForm} />
      ) : null}
      {showForm && <Box>form</Box>}
    </WrapperContainer>
  );
};

export default Classroom;
