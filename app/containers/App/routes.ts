// tslint:disable:object-literal-sort-keys
import { Album, Albums, Artist, Artists, Home, Sandbox, Songs } from '../../pages';

import { IRouteProps } from '../../components/Routes';

const routes: IRouteProps[] = [
  {
    exact: true,
    path: '/',
    component: Home,
  }, {
    exact: true,
    path: '/albums',
    component: Albums,
  }, {
    path: '/albums/:id',
    component: Album,
  }, {
    exact: true,
    path: '/artists',
    component: Artists,
  }, {
    path: '/artists/:id',
    component: Artist,
  }, {
    path: '/sandbox',
    component: Sandbox,
  }, {
    exact: true,
    path: '/songs',
    component: Songs,
  }
];

export default routes;
