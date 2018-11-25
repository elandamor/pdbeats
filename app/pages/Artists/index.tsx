/**
 * Artists
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Image } from 'cloudinary-react';
// Components
import { LoadingBar } from '../../components';
// Queries
import getArtistsGQL from '../../graphql/queries/getArtists.gql';
// Styles
import Wrapper from './styles';

import { debug } from '../../lib';

class Artists extends PureComponent<{}, {}> {
  protected uploadField: any;
  protected wrapper: any;

  public render() {
    return (
      <Wrapper
        ref={(c: any) => {
          this.wrapper = c;
        }}
      >
        <Helmet>
          <title>Artists</title>
        </Helmet>
        <Query
          query={getArtistsGQL}
        >
          {({ data, error, loading }) => {
            if (loading) { return <LoadingBar isLoading /> }
            if (error) { return <div>An error occured...</div> }

            debug({ data });

            const { artists: { edges } } = data;

            return (
              <React.Fragment>
                {edges.map((edge: any) => {
                  const { node: artist } = edge;

                  return (
                    <Link
                      key={artist.id}
                      to={`/artists/${artist.id}`}
                    >
                      <div className="c-artist">
                        <div className="c-avatar__wrapper">
                          {
                            artist.avatar && (
                              <Image
                                cloudName={process.env.CLOUDINARY_BUCKET}
                                publicId={`/pdbeats/avatars/${artist.avatar.url}`}
                                height="40"
                                width="40"
                                crop="scale"
                                fetchFormat="auto"
                              />
                            )
                          }
                        </div>
                        <span className="a-artist__name">{artist.name}</span>
                      </div>
                    </Link>
                  )
                })}
              </React.Fragment>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Artists;
