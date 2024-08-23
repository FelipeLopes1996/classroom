import {
  Box,
  Button,
  CircularProgress,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ITeacher } from '../../../../shared/types/ITeacher';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { teachers } from '../../../../api/services/teacher/requests';

interface IForm {
  setShowForm: (value: boolean) => void;
  setTeacherData: (value: (prevState: ITeacher[]) => ITeacher[]) => void;
  setOpen: (value: boolean) => void;
  setSnackbarText: (value: string) => void;
  teacherEditData?: ITeacher;
  setTeacherEditData?: (value: ITeacher) => void;
}

const getEmptyTeacher = (): ITeacher => ({
  id: 0,
  materia: '',
  nome: '',
  contratacao: '',
});

const CreateOrEditTeacherForm = ({
  setShowForm,
  setTeacherData,
  setSnackbarText,
  setOpen,
  teacherEditData,
  setTeacherEditData,
}: IForm) => {
  const [teacherDataForm, setTeacherDataForm] = useState<ITeacher>({
    materia: '',
    nome: '',
    contratacao: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onChangeTeacherForm = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | Dayjs | SelectChangeEvent<string>
    ) => {
      if (dayjs.isDayjs(event)) {
        setTeacherDataForm({
          ...teacherDataForm,
          contratacao: event.format('YYYY-MM-DD'),
        });
      } else {
        const {
          target: { name, value },
        } = event;
        setTeacherDataForm({ ...teacherDataForm, [name]: value });
      }
    },
    [teacherDataForm]
  );

  const handleCancel = useCallback(() => {
    setShowForm(false);
    if (setTeacherEditData) {
      setTeacherEditData(getEmptyTeacher());
    }
  }, [setTeacherEditData, setShowForm]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);

      const newTeacher: ITeacher = {
        materia: teacherDataForm.materia,
        nome: teacherDataForm.nome,
        contratacao: teacherDataForm.contratacao,
      };

      if (!teacherDataForm.contratacao) {
        setLoading(false);
        return setError(true);
      }

      try {
        const resp = !teacherEditData?.nome
          ? await teachers.createTeacher(newTeacher)
          : await teachers.updateTeacher(
              newTeacher,
              Number(teacherEditData.id)
            );

        handleCancel();
        setShowForm(false);
        setLoading(false);
        setOpen(true);
        setSnackbarText(
          !teacherEditData?.nome
            ? 'Professor(a) criado com sucesso!'
            : 'Professor(a) alteraddo com sucesso!'
        );
        if (!teacherEditData?.nome) {
          setTeacherData((prevState) => [...prevState, resp]);
        } else {
          setTeacherData((prevState) =>
            prevState.map((teacher) =>
              teacher?.id === teacherEditData.id
                ? { ...newTeacher, id: teacherEditData.id }
                : teacher
            )
          );
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [
      handleCancel,
      setOpen,
      setShowForm,
      setSnackbarText,
      setTeacherData,
      teacherDataForm.contratacao,
      teacherDataForm.materia,
      teacherDataForm.nome,
      teacherEditData?.id,
      teacherEditData?.nome,
    ]
  );

  useEffect(() => {
    if (teacherEditData?.nome && !teacherDataForm.nome)
      return setTeacherDataForm(teacherEditData);
  }, [teacherEditData, teacherDataForm, setTeacherDataForm]);

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
        {!teacherEditData?.nome ? 'Criar Professor(a)' : 'Editar Professor(a)'}
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
            onChangeTeacherForm(e)
          }
          name="nome"
          required={true}
          value={teacherDataForm.nome || ''}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          label="Nome"
        />

        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeTeacherForm(e)
          }
          name="materia"
          required={true}
          value={teacherDataForm.materia || ''}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          label="Matéria"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="contratacao"
            format="DD/MM/YYYY"
            label="Data de contratação"
            value={dayjs(teacherDataForm.contratacao)}
            maxDate={dayjs().subtract(2, 'year')}
            minDate={dayjs().subtract(18, 'year')}
            onChange={(date: Dayjs | null) => {
              if (date) {
                onChangeTeacherForm(date);
              }
            }}
            slotProps={{
              textField: {
                helperText:
                  error &&
                  !teacherDataForm.contratacao &&
                  'Data de contratação é obrigatória',
                error: error && !teacherDataForm.contratacao,
                required: true,
              },
            }}
          />
        </LocalizationProvider>
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
              `${!teacherEditData?.nome ? 'Adicionar' : 'Salvar'}`
            ) : (
              <CircularProgress size={20} />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateOrEditTeacherForm;
