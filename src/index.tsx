import { Outlet } from 'react-router-dom';
import Header from './shared/components/Header';
import { Box } from '@mui/material';
import SideBarLinks from './shared/components/SideBar';
import { useDirectorId } from './shared/context/DirectorProvider';
import { useEffect } from 'react';
import { directors } from './api/services/directors/request';

const App = () => {
  const { setDirectorId } = useDirectorId();

  useEffect(() => {
    directors
      .getDirectors()
      .then((data) => {
        setDirectorId(data.length ? Number(data[0].id) : 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setDirectorId]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          maxWidth: '1200px',
          '@media screen and (min-width: 1200px)': {
            margin: '0 auto',
            width: '100%',
          },
        }}
      >
        <SideBarLinks />
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
