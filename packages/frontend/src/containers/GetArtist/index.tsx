/**
 * Artist
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import getYear from 'date-fns/get_year';
import { Link } from 'react-router-dom';
// Components
import { Grid, LoadingBar, GoBackButton, Banner, Card, Spacer } from '../../components';
// Queries
import getArtistGQL from '../../graphql/queries/getArtist.gql';
// Styles
import Wrapper from './styles';

import { debug } from '../../utils';
import { IMG_BASE_URL } from '../../constants';
import { H3 } from '../../typography';

class GetArtist extends Component<{}, {}> {
  public render() {
    const { match: { params: { id: artistID } } }: any = this.props;

    return (
      <Wrapper>
        <Helmet>
          <title>Artist</title>
        </Helmet>
        <GoBackButton />
        <Query
          query={getArtistGQL}
          variables={{
            id: artistID,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) { return <LoadingBar loading /> }
            if (error) { return <div>An error occured...{debug(error)}</div> }

            debug({ data });

            const { artist: { albums, name } } = data;

            return (
              <div className="c-artist__wrapper">
                <Banner>
                  <H3>{name}</H3>
                </Banner>
                <Spacer spacing={40} />
                <Grid columns={4} gap={40}>
                  {albums.map((album: any) => {
                    return (
                      <Link
                        key={album.id}
                        to={{
                          pathname: `/albums/${album.id}`,
                          state: {
                            artist: {
                              name,
                            }
                          }
                        }}
                      >
                        <Card
                          className="c-album"
                          compact
                          contentPadding={0}
                          image={`${IMG_BASE_URL}/c_scale,f_auto/v1/${album.artwork.url}`}
                        >
                          <figcaption>
                            <div className="c-details">
                              <h3>{album.name}</h3>
                              <small className="a-releaseDate">
                                {getYear(album.releaseDate)}
                              </small>
                            </div>
                          </figcaption>
                        </Card>
                      </Link>
                    );
                  }) }
                </Grid>
              </div>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default GetArtist;
