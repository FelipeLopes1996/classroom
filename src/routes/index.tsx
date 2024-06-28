import { createBrowserRouter } from 'react-router-dom';

import Home from '../shared/pages/Home';
import PageNotFound from '../shared/pages/PageNotFound';
import Director from '../shared/pages/Director';
import App from '..';
import Students from '../shared/pages/Students';

const pagesRoutes = [
  {
    path: '/',
    element: <App />,
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
    ],
  },
];

const routers = createBrowserRouter(pagesRoutes);

export default routers;
