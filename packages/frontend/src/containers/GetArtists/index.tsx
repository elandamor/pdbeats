import React, { FC } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// Queries
import getArtistsGQL from '../../graphql/queries/getArtists.gql';
// Styles
import Wrapper from './styles';
import { Card, Grid, WrappedQuery } from '../../components';
import { generateCloudinaryUri } from '../../utils/cloudinary';

interface IGetArtistsProps {
  className?: string;
};

/**
 * @render react
 * @name GetArtists component
 * @description GetArtists component.
 * @example
 * <GetArtists />
 */

const GetArtists: FC<IGetArtistsProps> = ({ className }) => (
  <Wrapper className={classNames('c-artists', className)}>
    <Grid columns={4} gap={40}>
      <WrappedQuery query={getArtistsGQL}>
        {({ data: { artists: { edges } } }: any) => edges.map((edge: any) => {
            const { node: artist } = edge;

            return (
              <Link
                key={artist.id}
                to={`/artists/${artist.id}`}
              >
                <Card
                  compact
                  contentPadding={0}
                  image={generateCloudinaryUri(artist.avatar ? artist.avatar.url : 'placeholder')}
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
      </WrappedQuery>
    </Grid>
  </Wrapper>
);

export default GetArtists;
