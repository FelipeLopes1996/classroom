import { Box, Button, Typography } from '@mui/material';
import { useCallback } from 'react';

interface IForm {
  setShowForm: (value: boolean) => void;
}

const CreateOrEditStudentForm = ({ setShowForm }: IForm) => {
  const handleCancel = useCallback(() => {
    setShowForm(false);
    // if (setDirectorEditData) {
    //   setDirectorEditData(getEmptyDirector());
    // }
    // }, [setDirectorEditData, setShowForm]);
  }, [setShowForm]);

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ceced3',
        borderRadius: '4px',
        p: '2.5rem',
        mt: '2rem',
      }}
      // onSubmit={(e) => {
      //   e.preventDefault();
      //   void handleSubmit(e);
      // }}
    >
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 500 }}>
        {/* {!directorEditData?.nome ? 'Criar Diretor' : 'Editar Diretor'} */}
        {'Criar Aluno'}
      </Typography>
      <Box sx={{ display: 'flex', gap: ' 1.5rem' }}>
        <Button
          onClick={() => handleCancel()}
          sx={{
            border: '1px solid #ceced3',
            borderRadius: '4px',
            p: '1rem 2rem',
            color: '#232426',
            mt: '1.5rem',
            '&:hover': {
              background: '#ceced3',
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          sx={{
            border: '1px solid #ceced3',
            borderRadius: '4px',
            p: '1rem 2rem',
            color: '#232426',
            mt: '1.5rem',
            '&:hover': {
              background: '#ceced3',
            },
          }}
          // disabled={loading}
        >
          {/* {!loading ? (
            `${!directorEditData?.nome ? 'Adicionar' : 'Salvar'}`
          ) : (
            <CircularProgress size={20} />
          )} */}
          Adicionar
        </Button>
      </Box>
    </Box>
  );
};

export default CreateOrEditStudentForm;
