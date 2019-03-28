// Styles
import Wrapper from './styles';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import getYear from 'date-fns/get_year';
// Queries
import getAlbumsGQL from '../../graphql/queries/getAlbums.gql';
import classNames from 'classnames';
import { Button, Card, Grid, WrappedQuery } from '../../components';
import { PlusCircle } from 'react-feather';
import { AuthenticatedUserContext } from '../../contexts/AuthenticatedUser.context';
import { QueryContext } from '../../components/WrappedQuery';
import { IMG_BASE_URL } from '../../constants';

// import { makeDebugger } from '../../utils';
// const debug = makeDebugger('GetAlbums');

interface IProps {
  className?: string;
};

/**
 * @render react
 * @name GetAlbums component
 * @description GetAlbums component.
 * @example
 * <GetAlbums />
 */

const GetAlbums: FC<IProps> = ({ className }) => (
  <Wrapper className={classNames('c-albums', className)}>
    <AuthenticatedUserContext.Consumer>
      {({ isAdmin }) => (
        <Grid columns={4} gap={40}>
          {
            isAdmin && (
              <Link
                to={{
                  pathname: `/albums/create`,
                }}
              >
                <Button
                  iconOnly
                  outlined
                  className="c-btn--create"
                  icon={<PlusCircle />}
                  iconSize={64}
                />
              </Link>
            )
          }
          <WrappedQuery query={getAlbumsGQL} fetchPolicy="cache-and-network">
            <QueryContext.Consumer>
              {({ albums: { edges } }: any) => edges.map((edge: any) => {
                  const { node: album } = edge;

                  return (
                    <Link
                      key={album.id}
                      to={`/albums/${album.id}`}
                    >
                      <Card
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
                })
              }
            </QueryContext.Consumer>
          </WrappedQuery>
        </Grid>
      )}
    </AuthenticatedUserContext.Consumer>
  </Wrapper>
);

export default GetAlbums;
