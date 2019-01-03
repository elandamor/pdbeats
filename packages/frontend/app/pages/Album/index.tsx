/**
 * Album
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import getYear from 'date-fns/get_year';
// @ts-ignore
import { Image } from 'cloudinary-react';
// Components
import { LoadingBar, Track } from '../../components';
// Queries
import getAlbumGQL from '../../graphql/queries/getAlbum.gql';
// Styles
import Wrapper from './styles';

import { debug } from '../../lib';
import { OnDeckContext } from '../../contexts/OnDeck.context';

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
        <Query
          query={getAlbumGQL}
          variables={{
            id: albumID,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) { return <LoadingBar isLoading /> }
            if (error) { return <div>An error occured...{debug(error)}</div> }

            // debug({ data })

            const { album } = data;

            return (
              <article
                key={album.id}
                className="c-album"
              >
                <header>
                  <Image
                    cloudName={process.env.CLOUDINARY_BUCKET}
                    publicId={`/pdbeats/covers/${album.artwork.url}`}
                    height="80"
                    width="80"
                    crop="scale"
                    fetchFormat="auto"
                  />
                  <div className="c-details">
                    <h3>{album.name}</h3>
                    <h4>
                      {album.artists.map((artist: any) => (
                        <span
                          key={artist.id}
                          className="a-artist"
                        >
                          <Link to={`/artists/${artist.id}`}>
                            {artist.name}
                          </Link>
                        </span>
                      )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                    </h4>
                    {
                      album.genres && album.genres.length > 0 && (
                        <React.Fragment>
                          <span className="c-genres">
                          {
                            album.genres.map((genre: string) => (
                              <small className="a-genre">
                                {genre}
                              </small>
                            )).reduce((prev: any, curr: any) => [prev, ', ', curr])
                          }
                          </span>
                          &nbsp;
                          <span>&bull;</span>
                          &nbsp;
                        </React.Fragment>
                      )
                    }
                    <small className="a-releaseDate">
                      {getYear(album.releaseDate)}
                    </small>
                  </div>
                </header>
                <section>
                  <OnDeckContext.Consumer>
                    {({ onDeck, setOnDeck }) => (
                      <ul className="c-tracks">
                        {
                          album.tracks.map((track: any) => (
                            <Track
                              key={track.id}
                              current={onDeck.id === track.id}
                              data={track}
                              onClick={() => setOnDeck(track)}
                            />
                          ))
                        }
                      </ul>
                    )}
                  </OnDeckContext.Consumer>
                </section>
              </article>
            );
          }}
        </Query>
      </Wrapper>
    );
  }
}

export default Album;
