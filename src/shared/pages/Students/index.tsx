import WrapperContainer from '../../components/WrapperContainer';
import { Typography } from '@mui/material';
import TableStudent from './components/TableStudent';
import { IStudent } from '../../types/IStudent';
import { useState } from 'react';
import IsData from '../../components/IsData';

const Students = () => {
  const [studentData, setStudentData] = useState<IStudent[]>([]);
  const [showForm, setShowForm] = useState(false);
  // const [open, setOpen] = useState(false);
  // const [snackbarText, setSnackbarText] = useState('');
  // const [loading, setLoading] = useState(false);
  // const [studentEditData, setStudentEditData] = useState<IStudent>();;
  return (
    <WrapperContainer>
      <Typography sx={{ fontSize: '2.5rem' }}>Alunos</Typography>
      {/* {!loading && directorsData?.length && !directorEditData?.nome ? ( */}
      {studentData.length ? (
        <TableStudent
          studentData={studentData}
          setStudentData={setStudentData}
          // setStudentEditData={setStudentEditData}
        />
      ) : null}
      {/* {!loading && !directorsData?.length && !showForm && ( */}
      {!studentData?.length && !showForm && (
        <IsData title="Ainda não há um aluno" setShowForm={setShowForm} />
      )}
    </WrapperContainer>
  );
};

export default Students;
