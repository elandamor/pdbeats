/**
 * Songs
 */

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
// Components
import { Inner, Track, WrappedQuery } from '../../components';
// Queries
import getTracksGQL from '../../graphql/queries/getTracks.gql';
// Styles
import Wrapper from './styles';

import { OnDeckContext } from '../../contexts/OnDeck.context';
import { QueryContext } from '../../components/WrappedQuery';

class Songs extends Component<{}, {}> {
  public render() {
    return (
      <Wrapper>
        <Helmet>
          <title>Songs</title>
        </Helmet>
        <Inner>
          <WrappedQuery query={getTracksGQL} fetchPolicy="cache-and-network">
            <QueryContext.Consumer>
              {({ tracks: { edges } }: any) => (
                <OnDeckContext.Consumer>
                  {({ onDeck, playState, setOnDeck }) => (
                    <ul className="c-tracks">
                      {
                        edges.map((edge: any) => {
                          const { node: track } = edge;

                          return (
                            <Track
                              key={track.id}
                              current={onDeck.id === track.id}
                              data={track}
                              onClick={() => setOnDeck(track)}
                              playState={playState}
                              hideAlbumCover={false}
                            />
                          )
                        })
                      }
                    </ul>
                  )}
                </OnDeckContext.Consumer>
              )}
            </QueryContext.Consumer>
          </WrappedQuery>
        </Inner>
      </Wrapper>
    );
  }
}

export default Songs;
