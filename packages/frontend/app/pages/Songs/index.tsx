/**
 * Songs
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
// @ts-ignore
import { Image } from 'cloudinary-react';
// Components
import { LoadingBar } from '../../components';
// Queries
import getTracksGQL from '../../graphql/queries/getTracks.gql';
// Styles
import Wrapper from './styles';

import { debug } from '../../lib';

class Songs extends PureComponent<{}, {}> {
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
          <title>Songs</title>
        </Helmet>
        <Query
          query={getTracksGQL}
        >
          {({ data, error, loading }) => {
            if (loading) { return <LoadingBar isLoading /> }
            if (error) { return <div>An error occured...{debug(error)}</div> }

            const { tracks: { edges } } = data;

            return (
              <div className="c-tracks">
                {edges.map((edge: any) => {
                  const { node: track } = edge;

                  return (
                    <div key={track.id} className="c-track">
                      <div className="c-cover__wrapper">
                        <Image
                          cloudName={process.env.CLOUDINARY_BUCKET}
                          publicId={`/pdbeats/covers/${track.album.artwork.url}`}
                          height="40"
                          width="40"
                          crop="scale"
                          fetchFormat="auto"
                        />
                      </div>
                      <div className="c-details">
                        <span className="a-name">
                          {track.name}
                          {
                            track.featuring &&
                            track.featuring.length > 0 && (
                              <React.Fragment>
                                &nbsp;
                                (
                                <span className="a-feat">feat. </span>
                                {track.featuring.map((artist: any) => (
                                  <span
                                    key={artist.id}
                                    className="a-artist"
                                  >
                                    {artist.name}
                                  </span>
                                )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                                )
                              </React.Fragment>
                            )
                          }
                        </span>
                        <br />
                        <small className="c-artists">
                        {
                          track.artists.map((artist: any) => (
                            <span
                              key={artist.id}
                              className="a-artist"
                            >
                              {artist.name}
                            </span>
                          )).reduce((prev: any, curr: any) => [prev, ', ', curr])
                        }
                        </small>
                      </div>
                    </div>
                  )
                })}
              </div>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Songs;
