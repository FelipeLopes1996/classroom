import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          align: 'center',
          justifyContent: 'center',
          m: 'auto 0',
        }}
      >
        <Typography sx={{ fontSize: '3.5rem', color: '#7a83ca' }}>
          olá, seja bem vindo ao nosso app para gerenciar turmas de aula
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
