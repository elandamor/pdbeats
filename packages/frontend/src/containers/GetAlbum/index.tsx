import React, { FC, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, RouteComponentProps } from 'react-router-dom';
// Components
import { Album, Banner, GoBackButton, LoadingBar, Routes, Spacer } from '../../components';
// Queries
import getAlbumGQL from '../../graphql/queries/getAlbum.gql';
// Styles
import Wrapper from './styles';

import WrappedQuery, { QueryContext } from '../../components/WrappedQuery';
import { IRouteProps } from '../../components/Routes';
import { H3 } from '../../typography';

interface IGetAlbumProps extends RouteComponentProps {
  routes: IRouteProps[];
};

/**
 * @render react
 * @name GetAlbum component
 * @description GetAlbum component.
 * @example
 * <GetAlbum />
 */

const GetAlbum: FC<IGetAlbumProps> = (props) => {
  const {
    location: { state: locationState },
    match,
    match: { params: { id: albumID } },
    routes
  }: any = props;

  const hasLocationState = Boolean(locationState);

  return (
    <Wrapper>
      <Helmet title="Album" />
      <GoBackButton />
      {
        hasLocationState && locationState.artist && (
          <React.Fragment>
            <Banner>
              <H3>{locationState.artist.name}</H3>
            </Banner>
            <Spacer spacing={40} />
          </React.Fragment>
        )
      }
      {
        match.isExact && (
          <WrappedQuery query={getAlbumGQL} variables={{ id: albumID }}>
            <QueryContext.Consumer>
              {({ album }: any) => album ? (
                <Album data={album} {...props} />
              ): <Redirect to="/albums" />}
            </QueryContext.Consumer>
          </WrappedQuery>
        )
      }
      <Suspense fallback={<LoadingBar loading />}>
        <Routes routes={routes} />
      </Suspense>
      <Spacer spacing={40} />
    </Wrapper>
  );
}

export default GetAlbum;
