import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#FFF',
        p: '2rem',
        borderBottom: '2px solid #ceced3',
      }}
    >
      <Typography variant="h4" sx={{ color: '#232426' }}>
        Cadastro do projetinho do meu amor
      </Typography>
    </Box>
  );
}
