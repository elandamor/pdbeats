/**
 * Songs
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
// Components
import { LoadingBar, Track } from '../../components';
// Queries
import getTracksGQL from '../../graphql/queries/getTracks.gql';
// Styles
import Wrapper from './styles';

import { debug } from '../../lib';
import { OnDeckContext } from '../../contexts/OnDeck.context';

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
                          />
                        )
                      })
                    }
                  </ul>
                )}
              </OnDeckContext.Consumer>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Songs;
