// tslint:disable:object-literal-sort-keys
import { Albums, Artists, Home, NotFound, Sandbox, Songs } from './pages';
import { AddAlbum, EditAlbum, GetAlbum, GetArtist } from './containers';

import { IRouteProps } from './components/Routes';

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
    path: '/sandbox',
    component: Sandbox,
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
