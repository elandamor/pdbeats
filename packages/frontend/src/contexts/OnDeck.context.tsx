import React, { FC, useState } from 'react';

import { makeDebugger } from 'utils';
const debug = makeDebugger('OnDeckContext');

interface IState {
  isPlaying: boolean;
  playState: string;
  reset: () => void;
  setOnDeck: (source: ITrack) => void;
  source: ITrack;
  updatePlayState: (playState: string) => void;
}

const DEFAULT_STATE: IState = {
  isPlaying: false,
  playState: 'idle',
  reset: () => null,
  setOnDeck: () => null,
  source: { id: '' },
  updatePlayState: () => null,
};

export const OnDeckContext = React.createContext(DEFAULT_STATE);

interface IProviderProps {
  children: React.ReactNode,
}

const Provider: FC<IProviderProps> = (props) => {
  const [state, setState] = useState(DEFAULT_STATE);

  /**
   * Resets state to DEFAULT_STATE
   */
  const reset = () => {
    setState(DEFAULT_STATE);
  }

  /**
   * Updates nowPlaying (onDeck) with a source
   */
  const setOnDeck = (source: ITrack) => {
    const { source: onDeck } = state;

    // @ts-ignore
    if (!source || source.id === onDeck.id) {
      return false;
    }

    setState({ ...state, source });
    debug({ source });

    return true;
  }

  /**
   * Updates the playback state of nowPlaying source in UI
   */
  const updatePlayState = (playState: string) => {
    if (typeof(playState) !== 'string') {
      return false;
    }

    setState({
      ...state,
      isPlaying: Boolean(playState === 'playing'),
      playState,
    });

    return true;
  }

  return (
    <OnDeckContext.Provider
      value={{
        ...state,
        reset,
        setOnDeck,
        updatePlayState,
      }}
    >
      {props.children}
    </OnDeckContext.Provider>
  );
}

export default Provider;
