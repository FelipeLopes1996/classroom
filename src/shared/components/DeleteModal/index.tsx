import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { CircularProgress, Typography } from '@mui/material';

const style = {
  position: 'absolute' as const,
  width: '30%',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: '1.5rem',
  '@media screen and (max-width: 1200px)': {
    width: '70%',
  },
  '@media screen and (max-width: 480px)': {
    width: '90%',
  },
};

interface IDeleteModal {
  open: boolean;
  setOpen(value: boolean): void;
  title: string;
  informationText: string;
  handleDelete: () => Promise<void>;
  loading: boolean;
}

const DeleteModal = ({
  open,
  setOpen,
  title,
  informationText,
  handleDelete,
  loading,
}: IDeleteModal) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography sx={{ fontSize: '2.2rem' }}>{title}</Typography>
        <Typography sx={{ fontSize: '1.5rem', mt: '1.5rem' }}>
          {informationText}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            gap: '1rem',
            mt: '1.5rem',
          }}
        >
          <Button sx={{ ml: 'auto' }} onClick={handleClose}>
            Cancelar
          </Button>
          <Button disabled={loading} onClick={() => void handleDelete()}>
            {!loading ? 'Confirmar' : <CircularProgress size={20} />}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
