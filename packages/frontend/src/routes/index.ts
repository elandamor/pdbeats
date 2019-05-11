// tslint:disable:object-literal-sort-keys
import { Albums, Artists, Home, NotFound, Songs } from './routes';
import { AddAlbum, EditAlbum, GetAlbum, GetArtist } from '../containers';

import { IRouteProps } from '../components/Routes';

const routes: IRouteProps[] = [
  {
    exact: true,
    path: '/',
    component: Home,
  }, {
    path: '/albums',
    component: Albums,
    routes: [
      {
        path: '/albums/create',
        component: AddAlbum,
      },
      {
        path: '/albums/:id',
        component: GetAlbum,
        routes: [
          {
            path: '/albums/:id/edit',
            component: EditAlbum,
          },
        ]
      },
    ]
  }, {
    path: '/artists',
    component: Artists,
    routes: [
      {
        exact: true,
        path: '/artists/:id',
        component: GetArtist,
      },
    ]
  }, {
    exact: true,
    path: '/songs',
    component: Songs,
  }, {
    path: '*',
    component: NotFound,
  }
];

export default routes;