import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#7a83ca',
        fontSize: '4rem',
        width: '100%',
      }}
    >
      Ops, página não encontrada.
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          a: {
            fontWeight: 500,
            textDecoration: 'none',
            color: '#7a83ca',
            fontSize: '1.7rem',
            p: '1.5rem',
            transition: 'ease-in-out 300ms',
            borderRadius: '4px',
            border: '1px solid #7a83ca',

            '&:hover': {
              background: '#c3c8f1',
            },
          },
        }}
      >
        <Link to="/">Voltar para a página inicial</Link>
      </Box>
    </Box>
  );
};

export default PageNotFound;
