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
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          maxWidth: '1200px',
          '@media screen and (min-width: 1200px)': {
            margin: '0 auto',
            width: '100%',
          },
        }}
      >
        <Typography variant="h4" sx={{ color: '#232426' }}>
          Cadastro do projetinho do meu amor
        </Typography>
      </Box>
    </Box>
  );
}
