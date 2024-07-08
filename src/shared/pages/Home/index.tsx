import { Box, Typography } from '@mui/material';
import WrapperContainer from '../../components/WrapperContainer';
import wellcomeImg from '../../assets/sapiens.svg';

const Home = () => {
  return (
    <WrapperContainer>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          component="img"
          src={wellcomeImg}
          sx={{
            width: '70%',
            '@media screen and (min-width: 1200px)': {
              margin: '0 auto',
              width: '70rem',
            },
          }}
        />
        <Typography sx={{ fontSize: '3rem' }}>Seja bem vindo(a).</Typography>
      </Box>
    </WrapperContainer>
  );
};

export default Home;
