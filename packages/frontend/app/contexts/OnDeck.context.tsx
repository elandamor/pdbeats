import React from 'react';

import { makeDebugger } from '../lib';
const debug = makeDebugger('deck-context');

// Testing audio
// @ts-ignore
import * as audio from '!file-loader?name=[name].[ext]!../data/ella-mai-bood-up.opus';
import * as audio2 from '!file-loader?name=[name].[ext]!../data/ella-mai-trip.opus';

interface Album {
  [key: string]: any;
}

interface Artist {
  [key: string]: any;
}

interface Track {
  [key: string]: any;
}

export const ARTISTS: Array<Artist> = [
  {
    __typename: 'Artist',
    id: 'artist-1',
    name: 'Ella Mai'
  }
];

export const ALBUMS: Array<Album> = [
  {
    __typename: 'Album',
    id: 'album-1',
    artists: [ARTISTS[0]],
    name: 'Ella Mai',
    tracks: [
      {
        __typename: 'Track',
        artists: [ARTISTS[0]],
        name: 'Boo\'d Up',
        source: audio
      },
    ],
  },
  {
    __typename: 'Album',
    artists: [{
      alias: 'steve-aoki',
      name: 'Steve Aoki'
    }],
    artwork: {
      url: 'texuohrqozjarva7limv'
    },
    name: 'Neon Future III',
    releaseDate: '2018-11-09',
    releaseType: 'ALBUM',
    genres: ['Dance'],
    tracks: [{
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      name: 'Neon Future III (Intro)',
      duration: '4:16',
      source: audio2,
      trackNumber: 1
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'louis-tomlinson',
        name: 'Louis Tomlinson'
      }],
      name: 'Just Hold On',
      duration: '3:19',
      source: audio,
      trackNumber: 2
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'bts',
        name: 'BTS'
      }],
      name: 'Waste It on Me',
      duration: '3:13',
      source: audio,
      trackNumber: 3
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'kiiara',
        name: 'Kiiara'
      }],
      name: 'Be Somebody',
      duration: '3:18',
      source: audio,
      trackNumber: 4
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'lil-yatchy',
        name: 'Lil Yatchy'
      }, {
        alias: 'ajr',
        name: 'AJR'
      }],
      name: 'Pretender',
      duration: '3:09',
      source: audio,
      trackNumber: 5
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'mike-posner',
        name: 'MIke Posner'
      }],
      name: 'A Lover and a Memory',
      duration: '3:28',
      source: audio,
      trackNumber: 6
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'blink-182',
        name: 'blink-182'
      }],
      name: 'Why Are We so Broken',
      duration: '3:48',
      source: audio,
      trackNumber: 7
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'jim-adkins',
        name: 'Jim Adkins'
      }],
      name: 'Golden Days',
      duration: '3:24',
      source: audio,
      trackNumber: 8
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'lady-antebellum',
        name: 'Lady Antebellum'
      }],
      name: 'Our Love Glows',
      duration: '2:53',
      source: audio,
      trackNumber: 9
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'era-istrefi',
        name: 'Era Istrefi'
      }],
      name: 'Anything More',
      duration: '3:00',
      source: audio,
      trackNumber: 10
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }, {
        alias: 'lauren-jauregui',
        name: 'Lauren Jauregui'
      }],
      name: 'All Night',
      duration: '3:25',
      source: audio,
      trackNumber: 11
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'bella-thorne',
        name: 'Bella Thorne'
      }],
      name: 'Do Not Disturb',
      duration: '2:44',
      source: audio,
      trackNumber: 12
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'ina-wroldsen',
        name: 'Ina Wroldsen'
      }],
      name: 'Lie to Me',
      duration: '2:59',
      source: audio,
      trackNumber: 13
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }, {
        alias: 'daddy-yankee',
        name: 'Daddy Yankee'
      }, {
        alias: 'play-n-skillz',
        name: 'Play-N-Skillz'
      }, {
        alias: 'elvis-crespo',
        name: 'Elvis Crespo'
      }],
      name: 'Azukita',
      duration: '3:46',
      source: audio,
      trackNumber: 14
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }, {
        alias: 'twiig',
        name: 'TWIIG'
      }],
      name: 'Hoovela',
      duration: '3:27',
      source: audio,
      trackNumber: 15
    }, {
      artists: [{
        alias: 'don-diablo',
        name: 'Don Diablo'
      }, {
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }, {
        alias: 'lush-x-simon',
        name: 'Lush & Simon'
      }],
      featuring: [{
        alias: 'bullysongs',
        name: 'BullySongs'
      }],
      name: 'What We Started',
      duration: '3:23',
      source: audio,
      trackNumber: 16
    }, {
      artists: [{
        alias: 'steve-aoki',
        name: 'Steve Aoki'
      }],
      featuring: [{
        alias: 'bill-nye',
        name: 'Bill Nye'
      }],
      name: 'Noble Gas',
      duration: '3:39',
      source: audio,
      trackNumber: 17
    }]
  }
];

export const SONGS: Array<Track> = ALBUMS.map(({ tracks }) => tracks)
  .reduce((accumulator, currentValue) => accumulator.concat(currentValue), []
);

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
    const { onDeck } = this.state;

    if (!source || source.id === onDeck.id) {
      return false;
    }

    debug({ onDeck, source });

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
