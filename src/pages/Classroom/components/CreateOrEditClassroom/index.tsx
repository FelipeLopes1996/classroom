import {
  Box,
  Button,
  CircularProgress,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IClassroom } from '../../../../shared/types/IClassroom';
import { classroom } from '../../../../api/services/classroom/requests';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface IForm {
  setShowForm: (value: boolean) => void;
  setClassroomsData: (value: (prevState: IClassroom[]) => IClassroom[]) => void;
  setOpen: (value: boolean) => void;
  setSnackbarText: (value: string) => void;
  classroomEditData?: IClassroom;
  setClassroomEditData?: (value: IClassroom) => void;
}

const getEmptyClassroom = (): IClassroom => ({
  id: 0,
  numero: 0,
  professor: '',
  horario: '',
  alunos: [],
});

const CreateOrEditClassroom = ({
  setShowForm,
  setClassroomsData,
  setSnackbarText,
  setOpen,
  setClassroomEditData,
  classroomEditData,
}: IForm) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [classroomData, setClassroomData] = useState<IClassroom>({
    numero: 0,
    professor: '',
    horario: '',
  });

  const handleCancel = useCallback(() => {
    setShowForm(false);
    if (setClassroomEditData) {
      setClassroomEditData(getEmptyClassroom());
    }
  }, [setClassroomEditData, setShowForm]);

  const onChangeClassroomForm = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | Dayjs | SelectChangeEvent<string>
    ) => {
      if (dayjs.isDayjs(event)) {
        return setClassroomData({
          ...classroomData,
          horario: event.format('HH:mm:ss'),
        });
      } else {
        const {
          target: { name, value },
        } = event;
        if (String(name) === 'numero') {
          return setClassroomData({
            ...classroomData,
            [name]: value.replace(/\D/g, ''),
          });
        }
        return setClassroomData({ ...classroomData, [name]: value });
      }
    },
    [classroomData]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setLoading(true);

      const newClassroom: IClassroom = {
        numero: Number(classroomData.numero),
        professor: classroomData.professor,
        horario: classroomData.horario,
      };

      if (!classroomData.horario) {
        setLoading(false);
        return setError(true);
      }

      try {
        const resp = !classroomEditData?.numero
          ? await classroom.createClassroom(newClassroom)
          : await classroom.updateClassroom(
              newClassroom,
              Number(classroomEditData?.id)
            );
        handleCancel();
        setShowForm(false);
        setLoading(false);
        setOpen(true);

        setSnackbarText(
          classroomEditData?.numero
            ? 'Sala alterada com sucesso!'
            : 'Sala criada com sucesso!'
        );
        if (!classroomEditData?.numero) {
          setClassroomsData((prevState) => [...prevState, resp]);
        } else {
          setClassroomsData((prevState) =>
            prevState.map((classroom) =>
              classroom?.id === classroomEditData?.id
                ? { ...newClassroom, id: classroomEditData?.id }
                : classroom
            )
          );
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [
      classroomData.horario,
      classroomData.numero,
      classroomData.professor,
      classroomEditData?.id,
      classroomEditData?.numero,
      handleCancel,
      setClassroomsData,
      setOpen,
      setShowForm,
      setSnackbarText,
    ]
  );

  useEffect(() => {
    if (classroomEditData?.numero && !classroomData.numero) {
      return setClassroomData(classroomEditData);
    }
  }, [classroomEditData, classroomData]);

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
        {!classroomEditData?.numero ? 'Criar Sala' : 'Editar Sala'}
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
            onChangeClassroomForm(e)
          }
          name="numero"
          required={true}
          value={classroomData.numero || ''}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          label="Número da sala"
        />
        <TextField
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChangeClassroomForm(e)
          }
          name="professor"
          required={true}
          value={classroomData.professor || ''}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
          label="Nome do professor"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker
              value={dayjs(classroomData.horario, 'HH:mm:ss')}
              views={['hours', 'minutes']}
              onChange={(date: Dayjs | null) => {
                if (date) {
                  onChangeClassroomForm(date);
                }
              }}
              name="horario"
              label="Horário"
              format="HH:mm"
              ampm={false}
              sx={{ width: '100%' }}
              slotProps={{
                textField: {
                  helperText:
                    error && !classroomData.horario && 'Horário é obrigatório',
                  error: error && !classroomData.horario,
                  required: true,
                },
              }}
            />
          </DemoContainer>
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
              `${!classroomData.numero ? 'Adicionar' : 'Salvar'}`
            ) : (
              <CircularProgress size={20} />
            )}{' '}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateOrEditClassroom;
