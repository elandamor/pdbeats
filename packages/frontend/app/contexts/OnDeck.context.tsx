import React from 'react';

// import { makeDebugger } from '../lib';
// const debug = makeDebugger('deck-context');

interface Track {
  [key: string]: any;
}

const DEFAULT_STATE = {
  onDeck: {},
  playState: '',
  setOnDeck: (source: Track) => true,
  upNext: [],
};

export const OnDeckContext = React.createContext(DEFAULT_STATE);

interface IProps {
  children: any,
}

interface IState {
  onDeck?: Track;
  playState?: string;
  upNext?: Array<Track>;
}

class Provider extends React.Component<IProps, IState> {
  state = DEFAULT_STATE;

  /**
   * Resets state to DEFAULT_STATE
   */
  public reset = () => {
    this.setState(DEFAULT_STATE);
  }

  /**
   * Updates nowPlaying (onDeck) with a source
   */
  public setOnDeck = (source: Track) => {
    const { onDeck } = this.state;

    // @ts-ignore
    if (!source || source.id === onDeck.id) {
      return false;
    }

    this.setState({ onDeck: source });

    return true;
  }

  /**
   * Updates the playback state of nowPlaying source in UI
   */
  public updatePlayState = (playState: string) => {
    if (typeof(playState) !== 'string') {
      return false;
    }

    this.setState({ playState });

    return true;
  }

  public render() {
    return (
      <OnDeckContext.Provider
        value={{
          ...this.state,
          reset: this.reset,
          setOnDeck: this.setOnDeck,
          updatePlayState: this.updatePlayState,
        }}
      >
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      </OnDeckContext.Provider>
    );
  }
}

export default Provider;
