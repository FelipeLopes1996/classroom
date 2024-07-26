import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import Director from '../pages/Director';
import App from '..';
import Students from '../pages/Students';
import { DirectorProvider } from '../shared/context/DirectorProvider';
import Classroom from '../pages/Classroom';

const pagesRoutes = [
  {
    path: '/',
    element: (
      <DirectorProvider>
        <App />
      </DirectorProvider>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        path: '*',
        element: <PageNotFound />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/diretores',
        element: <Director />,
      },
      {
        path: '/alunos',
        element: <Students />,
      },
      {
        path: '/turmas',
        element: <Classroom />,
      },
    ],
  },
];

const routers = createBrowserRouter(pagesRoutes);

export default routers;
