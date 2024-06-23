import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { IDirector } from '../../../../types/IDirector';
import { directors } from '../../../../../api/services/directors/request';

interface ICreateDirector {
  name: string;
}

interface IForm {
  setShowForm: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  setSnackbarText: (value: string) => void;
  setDirectorsData: (value: (prevState: IDirector[]) => IDirector[]) => void;
  directorEditData?: IDirector;
  setDirectorEditData?: (value: IDirector) => void;
}

const getEmptyDirector = (): IDirector => ({
  id: 0,
  nome: '',
  superUsuario: false,
});

const CreateAndEditDirectorForm = ({
  setShowForm,
  setDirectorsData,
  setSnackbarText,
  setOpen,
  directorEditData,
  setDirectorEditData,
}: IForm) => {
  const [dataDirector, setDataDirector] = useState<ICreateDirector>({
    name: '',
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    if (setDirectorEditData) {
      setDirectorEditData(getEmptyDirector());
    }
  }, [setDirectorEditData, setShowForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);
      try {
        if (dataDirector.name) {
          const resp = directorEditData?.nome
            ? await directors.updateDirector(
                {
                  nome: dataDirector.name,
                  superUsuario: directorEditData.superUsuario,
                },
                Number(directorEditData.id)
              )
            : await directors.createDirectors({
                nome: dataDirector.name,
                superUsuario: true,
              });
          setDirectorsData((prevState) => prevState.slice(1));
          setDirectorsData((prevState) => [...prevState, resp]);
          setSnackbarText(
            directorEditData?.superUsuario
              ? 'Diretor alteraddo com sucesso!'
              : 'Diretor criado com sucesso!'
          );
          handleCancel();
          setShowForm(false);
          setError(false);
          setLoading(false);
          setOpen(true);
        }
        setError(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [
      dataDirector,
      directorEditData,
      setShowForm,
      setError,
      setDirectorsData,
      setSnackbarText,
      setOpen,
      handleCancel,
    ]
  );

  useEffect(() => {
    if (directorEditData?.nome)
      return setDataDirector({ name: directorEditData?.nome });
  }, [directorEditData]);

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
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(e);
      }}
    >
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 500 }}>
        {!directorEditData?.nome ? 'Criar Diretor' : 'Editar Diretor'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '2.5rem',
        }}
      >
        <TextField
          onChange={({ target }) =>
            setDataDirector((prevState) => ({
              ...prevState,
              name: target.value,
            }))
          }
          value={dataDirector.name || ''}
          helperText={error && !dataDirector.name && 'Nome é obrigatório'}
          error={error && !dataDirector.name}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          label="nome"
        />
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
            disabled={loading}
          >
            {!loading ? (
              `${!directorEditData?.nome ? 'Adicionar' : 'Salvar'}`
            ) : (
              <CircularProgress size={20} />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAndEditDirectorForm;
