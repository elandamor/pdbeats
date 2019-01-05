/**
 * Home
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
// Components
import { Navigation } from '../../components';
// Styles
import Wrapper from './styles';

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
      </Wrapper>
    );
  }
}

export default Home;
