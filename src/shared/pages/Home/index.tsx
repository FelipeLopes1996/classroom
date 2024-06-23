import { Box, Typography } from '@mui/material';
import WrapperContainer from '../../components/WrapperContainer';

const Home = () => {
  return (
    <WrapperContainer>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          align: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: '3.5rem' }}>
          olá, seja bem vindo ao nosso app para gerenciar turmas de aula
        </Typography>
      </Box>
    </WrapperContainer>
  );
};

export default Home;
