import { Box, Button, Typography } from '@mui/material';

interface IIsData {
  title: string;
  setShowForm: (value: boolean) => void;
}

const IsData = ({ title, setShowForm }: IIsData) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #ceced3',
        borderRadius: '4px',
        p: '2.5rem',
        mt: '2rem',
        gap: '2rem',
      }}
    >
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 500 }}>
        {title}
      </Typography>
      <Button onClick={() => setShowForm(true)}>Adicionar</Button>
    </Box>
  );
};

export default IsData;
