/**
 * Artists
 */

import React, { Component, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { RouteComponentProps } from 'react-router-dom';
// Components
import { LoadingBar, Routes, Inner, Spacer } from '../../components';
import { IRouteProps } from '../../components/Routes';
// Styles
import Wrapper from './styles';
import GetArtists from '../../containers/GetArtists/Loadable';

interface IProps extends RouteComponentProps {
  routes: IRouteProps[];
}

class Artists extends Component<IProps, {}> {
  public render() {
    const { match, routes } = this.props;

    return (
      <Wrapper>
        <Helmet>
          <title>Artists</title>
        </Helmet>
        <Inner>
          { match.isExact && <GetArtists /> }
          <Suspense fallback={<LoadingBar loading />}>
            <Routes routes={routes} />
          </Suspense>
          <Spacer spacing={40} />
        </Inner>
      </Wrapper>
    );
  }
}

export default Artists;
