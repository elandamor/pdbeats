/**
 * Home
 */

import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import { Observable } from 'rxjs';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import getYear from 'date-fns/get_year';
// @ts-ignore
import { Image } from 'cloudinary-react';
// Queries
// import getAlbumsGQL from '../../graphql/queries/getAlbums.gql';
// Styles
import Wrapper from './styles';

import { debug, secondsToTime } from '../../lib';
import { uploadFile } from '../../lib/uploader';

const getAlbumsGQL = gql`
  query getAlbums {
    albums {
      edges {
        node {
          id
          alias
          artwork {
            id
            url
          }
          artists {
            id
            name
          }
          genres
          name
          releaseDate
          releaseType
          tracks(orderBy: trackNumber_ASC) {
            artists {
              id
              name
            }
            featuring {
              id
              name
            }
            name
            duration
            trackNumber
          }
        }
      }
    }
  }
`;

class Home extends PureComponent<{}, {}> {
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
          <title>Home</title>
        </Helmet>
        <Query query={getAlbumsGQL}>
          {({ data, error, loading }) => {
            if (loading) { return <div>Loading...</div> }
            if (error) { return <div>An error occured...</div> }

            const { albums: { edges } } = data;

            return (
              <div>
                {edges.map((edge: any) => {
                  const { node: album } = edge;

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
                        <ul className="c-tracks">
                          {
                            album.tracks.map((track: any) => (
                              <li
                                key={track.id}
                                className="c-track"
                              >
                                <span className="a-trackNumber">
                                  {track.trackNumber}
                                </span>
                                <div className="c-details">
                                  <span className="a-name">
                                    {track.name}
                                    {
                                      track.featuring &&
                                      track.featuring.length > 0 && (
                                        <React.Fragment>
                                          &nbsp;
                                          (
                                          <span className="a-feat">feat. </span>
                                          {track.featuring.map((artist: any) => (
                                            <span
                                              key={artist.id}
                                              className="a-artist"
                                            >
                                              {artist.name}
                                            </span>
                                          )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                                          )
                                        </React.Fragment>
                                      )
                                    }
                                  </span>
                                  <br />
                                  <small className="c-artists">
                                  {
                                    track.artists.map((artist: any) => (
                                      <span
                                        key={artist.id}
                                        className="a-artist"
                                      >
                                        {artist.name}
                                      </span>
                                    )).reduce((prev: any, curr: any) => [prev, ', ', curr])
                                  }
                                  </small>
                                </div>
                                <span className="a-duration">
                                  {secondsToTime(track.duration)}
                                </span>
                              </li>
                            ))
                          }
                        </ul>
                      </section>
                    </article>
                  );
                }) }
              </div>
            );
          }}
        </Query>
        <hr />
        <input
          type="file"
          ref={(c) => {
            this.uploadField = c;
          }}
          multiple
        />
        <button onClick={this.doUpload}>Upload</button>
      </Wrapper>
    );
  }

  private doUpload = async () => {
    const container = this.wrapper;
    const files = Array.from(this.uploadField.files);

    if (files.length > 0) {
      const promises: Array<any> = [];

      files.map((file) => {
        // Create a progress bar for file
        const progress = document.createElement('progress');
        progress.className = 'c-progress';
        progress.setAttribute('min', '0');
        progress.setAttribute('max', '100');

        container.appendChild(progress);

        // Setup observers for each file
        Observable.create(async (observer: any) => {
          promises.push(uploadFile(file, observer));
        }).subscribe({
          complete: () => {
            if (container) {
              container.removeChild(progress);
            }
          },
          error: (value: any) => {
            debug(value);
          },
          next: (value: any) => {
            progress.value = value;
          },
        });
      });

      return Promise.all(promises).then((urls) => {
        debug({ urls });
      });
    }
  }
}

export default Home;
