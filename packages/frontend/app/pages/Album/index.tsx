/**
 * Album
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
// Components
import { Album as IAlbum } from '../../components';
// Styles
import Wrapper from './styles';

// import { debug } from '../../lib';

class Album extends PureComponent<{}, {}> {
  protected uploadField: any;
  protected wrapper: any;

  public render() {
    const {
      location: { state: locationState },
      match: { params: { id: albumID } }
    }: any = this.props;

    const hasLocationState = Boolean(locationState);
    // debug(this.props);

    return (
      <Wrapper
        ref={(c: any) => {
          this.wrapper = c;
        }}
      >
        <Helmet>
          <title>Album</title>
        </Helmet>
        {
          hasLocationState && locationState.artist && (
            <div className="c-banner">
              <h2>{locationState.artist.name}</h2>
            </div>
          )
        }
        <IAlbum id={albumID} />
      </Wrapper>
    );
  }
}

export default Album;
