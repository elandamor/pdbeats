/**
 * Songs
 */

import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
// Components
import { Inner, Track, WrappedQuery } from '../../components';
// Queries
import getTracksGQL from '../../graphql/queries/getTracks.gql';
// Styles
import Wrapper from './styles';

import { OnDeckContext } from '../../contexts/OnDeck.context';

const Songs = () => {
  const onDeckCtx = useContext(OnDeckContext);

  return (
    <Wrapper>
      <Helmet>
        <title>Songs</title>
      </Helmet>
      <Inner>
        <WrappedQuery query={getTracksGQL}>
          {({ data: { tracks: { edges } } }: any) => (
            <ul className="c-tracks">
              {
                edges.map((edge: any) => {
                  const { node: track } = edge;

                  return (
                    <Track
                      key={track.id}
                      current={onDeckCtx.source.id === track.id}
                      data={track}
                      onClick={() => onDeckCtx.setOnDeck(track)}
                      playState={onDeckCtx.playState}
                      hideAlbumCover={false}
                    />
                  )
                })
              }
            </ul>
          )}
        </WrappedQuery>
      </Inner>
    </Wrapper>
  );
}

export default Songs;
