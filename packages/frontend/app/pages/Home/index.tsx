/**
 * Home
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
// @ts-ignore
import { Image } from 'cloudinary-react';
// Components
import { Navigation } from '../../components';
// Styles
import Wrapper from './styles';

import { OnDeckContext, SONGS } from '../../contexts/OnDeck.context';

// import { debug } from '../../lib';

class Home extends PureComponent<{}, {}> {
  protected wrapper: any;

  public render() {
    return (
      <Wrapper
        ref={(c: any) => {
          this.wrapper = c;
        }}
      >
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Navigation
          links={[
            { href: '/playlists', label: 'Playlists' },
            { href: '/artists', label: 'Artists' },
            { href: '/albums', label: 'Albums' },
            { href: '/songs', label: 'Songs' },
          ]}
        />
        <OnDeckContext.Consumer>
          {({ setOnDeck }) => (
            <React.Fragment>
              {
                SONGS.map((song, index) => (
                  <div
                    key={song.title}
                    onClick={() => setOnDeck(song)}
                  >
                    {++index}. {song.title}
                  </div>
                ))
              }
            </React.Fragment>
          )}
        </OnDeckContext.Consumer>
      </Wrapper>
    );
  }
}

export default Home;
