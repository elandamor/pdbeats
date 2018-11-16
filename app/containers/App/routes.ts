// tslint:disable:object-literal-sort-keys
import { Home, Sandbox } from '../../pages';

import { IRouteProps } from '../../components/Routes';

const routes: IRouteProps[] = [
  {
    exact: true,
    path: '/',
    component: Home,
  }, {
    path: '/sandbox',
    component: Sandbox,
  }
];

export default routes;
