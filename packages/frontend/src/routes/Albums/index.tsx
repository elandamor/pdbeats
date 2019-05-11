/**
 * Albums
 */

import React, { Component, Suspense } from 'react';
import { Helmet } from 'react-helmet';
// Components
import { LoadingBar, Inner, Routes, Spacer } from '../../components';
// Styles
import Wrapper from './styles';
import GetAlbums from '../../containers/GetAlbums/Loadable';
import { RouteComponentProps } from 'react-router-dom';
import { IRouteProps } from '../../components/Routes';

interface IProps extends RouteComponentProps {
  routes: IRouteProps[];
}

class Albums extends Component<IProps, {}> {
  public render() {
    const { match, routes } = this.props;

    return (
      <Wrapper>
        <Helmet>
          <title>Albums</title>
        </Helmet>
        <Inner>
          { match.isExact && <GetAlbums {...this.props} /> }
          <Suspense fallback={<LoadingBar loading />}>
            <Routes routes={routes} />
          </Suspense>
          <Spacer spacing={40} />
        </Inner>
      </Wrapper>
    );
  }
}

export default Albums;
