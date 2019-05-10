import React, { FC } from 'react';
import classNames from 'classnames';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
// Queries
import getArtistsGQL from '../../graphql/queries/getArtists.gql';
// Styles
import Wrapper from './styles';
import { LoadingBar, Grid, Card } from '../../components';
import WrappedQuery, { QueryContext } from '../../components/WrappedQuery';
import { IMG_BASE_URL } from '../../constants';

// import { makeDebugger } from '../../utils';
// const debug = makeDebugger('GetArtists');

interface IProps {
  className?: string;
};

/**
 * @render react
 * @name GetArtists component
 * @description GetArtists component.
 * @example
 * <GetArtists />
 */

const GetArtists: FC<IProps> = ({ className }) => (
  <Wrapper className={classNames('c-artists', className)}>
    <Grid columns={4} gap={40}>
      <WrappedQuery query={getArtistsGQL} fetchPolicy="cache-and-network">
        <QueryContext.Consumer>
          {({ artists: { edges } }: any) => edges.map((edge: any) => {
              const { node: artist } = edge;

              return (
                <Link
                  key={artist.id}
                  to={`/artists/${artist.id}`}
                >
                  <Card
                    compact
                    contentPadding={0}
                    image={`${IMG_BASE_URL}/c_scale,f_auto/v1/${artist.avatar ? artist.avatar.url : 'placeholder'}`}
                  >
                    <figcaption>
                      <div className="c-details">
                        <h3>{artist.name}</h3>
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
  </Wrapper>
);

export default GetArtists;
