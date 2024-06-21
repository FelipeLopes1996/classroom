import { Box } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const urlLinks = [
  { name: 'Diretores', url: 'http://localhost:3000/diretores' },
  { name: 'Alunos', url: 'http://localhost:3000/alunos' },
  { name: 'Sala de aula', url: 'http://localhost:3000/salas' },
];

const SideBarLinks = () => {
  const { pathname } = useLocation();
  return (
    <Box component="aside">
      <Box
        component="ul"
        sx={{
          width: '26rem',
          height: '100%',
          listStyle: 'none',
          m: 0,
          p: '0.5rem 0.5rem 0',
          borderRight: '2px solid #ceced3',
        }}
      >
        {urlLinks.map((link) => (
          <Box
            component="li"
            sx={{
              display: 'flex',
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
                background: pathname === `/${link.name}` ? '#ceced3' : null,

                '&:hover': {
                  background: '#ceced3',
                },
              },
            }}
            key={link.url}
          >
            <NavLink end to={link.url} style={{}}>
              {link.name}
            </NavLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SideBarLinks;
