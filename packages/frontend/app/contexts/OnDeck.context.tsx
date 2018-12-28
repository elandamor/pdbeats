import React from 'react';

// import { makeDebugger } from '../lib';
// const debug = makeDebugger('deck-context');

// Testing audio
// @ts-ignore
import * as audio1 from '!file-loader?name=[name].[ext]!../data/ella-mai-bood-up.opus';
import * as audio2 from '!file-loader?name=[name].[ext]!../data/ella-mai-trip.opus';
import * as audio3 from '!file-loader?name=[name].[ext]!../data/ella-mai-whatchamacallit.opus';

export const SONGS = [
  {
    __typename: 'Track',
    id: 1,
    artist: {
      name: 'Ella Mai'
    },
    title: 'Boo\'d Up',
    source: audio1
  },
  {
    __typename: 'Track',
    id: 2,
    artist: {
      name: 'Ella Mai'
    },
    title: 'Trip',
    source: audio2
  },
  {
    __typename: 'Track',
    id: 3,
    artist: {
      name: 'Ella Mai'
    },
    title: 'Whatchamacallit',
    source: audio3
  }
];

const DEFAULT_STATE = {
  onDeck: {},
  // tslint:disable-next-line:no-empty
  setOnDeck: (source: object) => {},
  upNext: [],
};

export const OnDeckContext = React.createContext(DEFAULT_STATE);

interface IProps {
  children: any,
}

interface IState {
  onDeck?: object;
  upNext?: Array<object>;
}

class Provider extends React.Component<IProps, IState> {
  state = DEFAULT_STATE;

  public setOnDeck = (source: object) => {
    if (!source) {
      return false;
    }

    this.setState(() => ({
      onDeck: source,
    }))

    return true;
  }

  public render() {
    return (
      <OnDeckContext.Provider
        value={{
          ...this.state,
          setOnDeck: this.setOnDeck,
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
