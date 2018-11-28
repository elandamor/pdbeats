/**
 * Albums
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import getYear from 'date-fns/get_year';
// @ts-ignore
import { Image } from 'cloudinary-react';
// Components
import { Grid, LoadingBar } from '../../components';
// Queries
import getAlbumsGQL from '../../graphql/queries/getAlbums.gql';
// Styles
import Wrapper from './styles';

import { debug } from '../../lib';

class Albums extends PureComponent<{}, {}> {
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
          <title>Albums</title>
        </Helmet>
        <Query query={getAlbumsGQL}>
          {({ data, error, loading }) => {
            if (loading) { return <LoadingBar isLoading /> }
            if (error) { return <div>An error occured...{debug(error)}</div> }

            const { albums: { edges } } = data;

            return (
              <Grid
                className="c-albums"
                columns={2}
                gap={12}
              >
                {edges.map((edge: any) => {
                  const { node: album } = edge;

                  return (
                    <Link
                      key={album.id}
                      to={{
                        pathname: `/albums/${album.id}`,
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
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Albums;
