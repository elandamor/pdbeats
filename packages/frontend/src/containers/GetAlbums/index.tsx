// Styles
import Wrapper from './styles';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import getYear from 'date-fns/get_year';
// Queries
import getAlbumsGQL from '../../graphql/queries/getAlbums.gql';
import classNames from 'classnames';
import { Card, Grid, WrappedQuery } from '../../components';
import { AuthenticatedUserContext } from '../../contexts/AuthenticatedUser.context';
import { generateCloudinaryUri } from '../../utils/cloudinary';
import { H3 } from 'typography';

interface IGetAlbumsProps {
  className?: string;
};

/**
 * @render react
 * @name GetAlbums component
 * @description GetAlbums component.
 * @example
 * <GetAlbums />
 */

const GetAlbums: FC<IGetAlbumsProps> = ({ className }) => (
  <Wrapper className={classNames('c-albums', className)}>
    <AuthenticatedUserContext.Consumer>
      {({ isAdmin }) => (
        <Grid columns={[2,2,4]}>
          <WrappedQuery query={getAlbumsGQL}>
            {({ data: { albums: { edges } } }) => edges.map((edge: { node: IAlbum}) => {
                const { node: album } = edge;

                return (
                  <Link
                    key={album.id}
                    to={`/albums/${album.id}`}
                  >
                    <Card
                      compact
                      contentPadding={0}
                      image={generateCloudinaryUri(album.artwork.url)}
                    >
                      <figcaption>
                        <div className="c-details">
                          <H3 fontSize={2}>{album.name}</H3>
                          <small className="a-releaseDate">
                            {getYear(album.releaseDate)}
                          </small>
                        </div>
                      </figcaption>
                    </Card>
                  </Link>
                );
              })
            }
          </WrappedQuery>
        </Grid>
      )}
    </AuthenticatedUserContext.Consumer>
  </Wrapper>
);

export default GetAlbums;
