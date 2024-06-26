import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, useCallback, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { IStudent } from '../../../../types/IStudent';
import { calculateAge } from '../../../../utils/calculateAge';
import { student } from '../../../../../api/services/students';
import { useDirectorId } from '../../../../context/DirectorProvider';

interface IForm {
  setShowForm: (value: boolean) => void;
  setStudentsData: (value: (prevState: IStudent[]) => IStudent[]) => void;
  setOpen: (value: boolean) => void;
  setSnackbarText: (value: string) => void;
}

const CreateOrEditStudentForm = ({
  setShowForm,
  setStudentsData,
  setSnackbarText,
  setOpen,
}: IForm) => {
  const { directorId } = useDirectorId();

  const [studentData, setStudentData] = useState<IStudent>({
    matricula: '',
    nome: '',
    idade: 0,
    dataNascimento: null,
    sexo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCancel = useCallback(() => {
    setShowForm(false);
    // if (setDirectorEditData) {
    //   setDirectorEditData(getEmptyDirector());
    // }
    // }, [setDirectorEditData, setShowForm]);
  }, [setShowForm]);

  const onChangeStudentForm = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | Dayjs | SelectChangeEvent<string>
    ) => {
      if (dayjs.isDayjs(event)) {
        setStudentData({
          ...studentData,
          dataNascimento: event.format('YYYY-MM-DD'),
          idade: calculateAge(event.format('YYYY-MM-DD')).years,
        });
      } else {
        const {
          target: { name, value },
        } = event;
        setStudentData({ ...studentData, [name]: value });
      }
    },
    [studentData]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);

      const newStudent: IStudent = {
        diretorId: directorId,
        matricula: studentData.matricula,
        nome: studentData.nome,
        idade: studentData.idade,
        dataNascimento: studentData.dataNascimento,
        sexo: studentData.sexo,
        sala_de_aula: null,
      };

      if (!studentData.dataNascimento) {
        setLoading(false);
        return setError(true);
      }

      try {
        const resp = await student.createStudent(newStudent);
        // setDirectorsData((prevState) => [...prevState, resp]);
        handleCancel();
        setShowForm(false);
        setLoading(false);
        setOpen(true);
        // setSnackbarText(
        //   directorEditData?.superUsuario
        //     ? 'Aluno alteraddo com sucesso!'
        //     : 'Aluno criado com sucesso!'
        // )
        setSnackbarText('Aluno criado com sucesso!');
        setStudentsData((prevState) => [...prevState, resp]);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [
      directorId,
      studentData.matricula,
      studentData.nome,
      studentData.idade,
      studentData.dataNascimento,
      studentData.sexo,
      handleCancel,
      setShowForm,
      setOpen,
      setSnackbarText,
      setStudentsData,
    ]
  );

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
      onSubmit={(e) => void handleSubmit(e)}
    >
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 500 }}>
        {/* {!directorEditData?.nome ? 'Criar Aluno' : 'Editar Aluno'} */}
        {'Criar Aluno'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: ' 1.5rem',
          flexDirection: 'column',
          mt: '1.5rem',
        }}
      >
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeStudentForm(e)
          }
          name="nome"
          required={true}
          value={studentData.nome || ''}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          label="nome"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="dataNascimento"
            label="Data de nascimento"
            value={dayjs(studentData.dataNascimento)}
            maxDate={dayjs().subtract(2, 'year')}
            minDate={dayjs().subtract(18, 'year')}
            onChange={(date: Dayjs | null) => {
              if (date) {
                onChangeStudentForm(date);
              }
            }}
            slotProps={{
              textField: {
                helperText:
                  error &&
                  !studentData.dataNascimento &&
                  'Data de nascimento é obrigatória',
                error: error && !studentData.dataNascimento,
                required: true,
              },
            }}
          />
        </LocalizationProvider>
        <FormControl fullWidth>
          <InputLabel id="select-sex-label">Genero</InputLabel>
          <Select
            labelId="select-sex-label"
            id="select-sexo"
            name="sexo"
            label="Genero"
            required={true}
            value={studentData.sexo}
            onChange={(e: SelectChangeEvent<string>) => onChangeStudentForm(e)}
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
          </Select>
        </FormControl>
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeStudentForm(e)
          }
          name="matricula"
          required={true}
          value={studentData.matricula || ''}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          label="Matricula"
        />
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeStudentForm(e)
          }
          name="sala_de_aula"
          value={studentData.sala_de_aula || ''}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          label="Sala (opcional)"
        />
        <Box sx={{ display: 'flex', gap: ' 1.5rem' }}>
          <Button
            onClick={() => handleCancel()}
            sx={{
              border: '1px solid #ceced3',
              borderRadius: '4px',
              p: '1rem 2rem',
              color: '#232426',
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
              '&:hover': {
                background: '#ceced3',
              },
            }}
            disabled={loading}
          >
            {!loading ? (
              // `${!directorEditData?.nome ? 'Adicionar' : 'Salvar'}`
              'Adicionar'
            ) : (
              <CircularProgress size={20} />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateOrEditStudentForm;
