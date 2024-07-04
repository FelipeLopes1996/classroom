import { Box, IconButton } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { navLinksData } from '../../utils/navLinksData';
import { useState } from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const SideBarLinks = () => {
  const { pathname } = useLocation();
  const [openNav, setOpenNav] = useState(false);

  return (
    <Box
      component="aside"
      sx={{
        background: '#FFF',
        zIndex: 9,
        position: 'absolute',
        width: openNav ? '23rem' : '0',
        transition: 'ease-in-out 300ms',
        height: 'calc(100vh - 7rem)',
        borderRight: openNav ? '2px solid #ceced3' : '2px solid #FFF',
        borderLeft: openNav ? '2px solid #ceced3' : '2px solid #FFF',
      }}
    >
      <IconButton
        disableRipple
        sx={{
          position: 'relative',
          left: openNav ? '18rem' : 0,
          background: '#FFF !important',
          display: 'flex',
          justifyContent: 'end',
          transition: 'ease-in-out 300ms',
          borderRadius: 0,
          p: '1rem 0 0 0.7rem',
          '&:hover': { background: 'none' },
          '@media screen and (max-width: 1200px)': {
            p: '1rem 0 0 2.2rem',
          },
          '@media screen and (max-width: 480px)': {
            p: '1rem 0 0 2.2rem',
          },
        }}
        size="large"
        onClick={() => setOpenNav(!openNav)}
      >
        {openNav ? (
          <CloseOutlinedIcon fontSize="large" />
        ) : (
          <MenuOutlinedIcon fontSize="large" />
        )}
      </IconButton>
      <Box
        component="ul"
        sx={{
          background: '#FFF',
          transition: 'ease-in-out 300ms',
          listStyle: 'none',
          m: 0,
          p: '0.5rem 0.5rem 0',
          overflow: 'hidden',
        }}
      >
        {navLinksData.map((link) => (
          <Box
            component="li"
            sx={{
              display: openNav ? 'flex' : 'none',
              textAlign: 'center',
              mb: '0.5rem',
              a: {
                width: '100%',
                fontWeight: 500,
                textDecoration: 'none',
                color: '#232426',
                fontSize: '1.7rem',
                p: '1.5rem',
                transition: 'ease-in-out 300ms',
                borderRadius: '4px',
                background: pathname === link.url ? '#ceced3' : null,

                '&:hover': {
                  background: '#ceced3',
                },
              },
            }}
            key={link.url}
          >
            <NavLink
              end
              to={link.url}
              style={{}}
              onClick={() => setOpenNav(false)}
            >
              {link.name}
            </NavLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SideBarLinks;
