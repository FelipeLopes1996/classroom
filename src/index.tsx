import { Outlet } from 'react-router-dom';
import Header from './shared/components/Header';
import { Box } from '@mui/material';
import SideBarLinks from './shared/components/SideBar';

const App = () => {
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
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <SideBarLinks />
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
