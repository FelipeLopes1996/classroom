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
      }}
    >
      <IconButton
        disableRipple
        sx={{
          width: openNav ? '23rem' : '4.5rem',
          position: 'absolute',
          background: '#FFF !important',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'end',
          transition: 'ease-in-out 300ms',
          borderRight: openNav ? '2px solid #ceced3' : '2px solid #FFF',
          borderLeft: openNav ? '2px solid #ceced3' : '2px solid #FFF',
          borderRadius: 0,
          '&:hover': { background: 'none' },
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
          position: 'absolute',
          width: openNav ? '23rem' : '0',
          background: '#FFF',
          transition: 'ease-in-out 300ms',
          listStyle: 'none',
          m: 0,
          p: '0.5rem 0.5rem 0',
          zIndex: 9,
          borderRight: openNav ? '2px solid #ceced3' : '2px solid #FFF',
          borderLeft: openNav ? '2px solid #ceced3' : '2px solid #FFF',
          top: 110,
          overflow: 'hidden',
          height: 'calc(100vh - 11rem)',
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
