import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleGoHome = () => navigate('/');

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#FFF',
        p: '1.5rem',
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
          <IconButton
            onClick={handleGoHome}
            disableRipple
            sx={{
              mr: '1.5rem',
              '&:hover': { background: 'none' },
            }}
          >
            <AssuredWorkloadOutlinedIcon fontSize="large" />
          </IconButton>
          Gerenciamento de turma
        </Typography>
      </Box>
    </Box>
  );
}
