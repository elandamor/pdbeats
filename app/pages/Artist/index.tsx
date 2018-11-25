/**
 * Artist
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import getYear from 'date-fns/get_year';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Image } from 'cloudinary-react';
// Components
import { Grid, LoadingBar } from '../../components';
// Queries
import getArtistGQL from '../../graphql/queries/getArtist.gql';
// Styles
import Wrapper from './styles';

import { debug } from '../../lib';

class Artist extends PureComponent<{}, {}> {
  protected uploadField: any;
  protected wrapper: any;

  public render() {
    const { match: { params: { id: artistID } } }: any = this.props;

    return (
      <Wrapper
        ref={(c: any) => {
          this.wrapper = c;
        }}
      >
        <Helmet>
          <title>Artist</title>
        </Helmet>
        <Query
          query={getArtistGQL}
          variables={{
            id: artistID,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) { return <LoadingBar isLoading /> }
            if (error) { return <div>An error occured...</div> }

            debug({ data });

            const { artist: { albums, avatar, name } } = data;

            return (
              <div className="c-artist__wrapper">
                <div className="c-banner">
                  <h2>{name}</h2>
                </div>
                <Grid columns={2} gap={12}>
                  {albums.map((album: any) => {
                    return (
                      <Link
                        key={album.id}
                        to={{
                          pathname: `/albums/${album.id}`,
                          state: {
                            artist: {
                              id: data.artist.id,
                              avatar,
                            }
                          }
                        }}
                      >
                        <figure
                          className="c-album"
                        >
                          <Image
                            cloudName={process.env.CLOUDINARY_BUCKET}
                            publicId={`/pdbeats/covers/${album.artwork.url}`}
                            height="160"
                            width="160"
                            crop="scale"
                            fetchFormat="auto"
                          />
                          <figcaption>
                            <div className="c-details">
                              <h4>{album.name}</h4>
                              <small className="a-releaseDate">
                                {getYear(album.releaseDate)}
                              </small>
                            </div>
                          </figcaption>
                        </figure>
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

export default Artist;
