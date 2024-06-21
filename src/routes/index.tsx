import { createBrowserRouter } from 'react-router-dom';

import Home from '../shared/pages/Home';
import PageNotFound from '../shared/pages/PageNotFound';
import Director from '../shared/pages/Director';
import App from '..';

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
    ],
  },
];

const routers = createBrowserRouter(pagesRoutes);

export default routers;
