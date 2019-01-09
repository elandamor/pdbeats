import React, { SFC } from 'react';
import classNames from 'classnames';
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
import Wrapper, { Tracks } from './styles';

import { OnDeckContext } from '../../contexts/OnDeck.context';

import { debug } from '../../lib';

/**
 * @render react
 * @name Album component
 * @description Album component.
 * @example
 * <Album />
 */

interface IProps {
  className?: string;
  id: string;
};

const Album: SFC<IProps> = ({ className, id: albumID }) => (
  <Wrapper
    key={albumID}
    className={classNames('c-album', className)}
  >
    <Query
      query={getAlbumGQL}
      variables={{
        id: albumID,
      }}
    >
      {({ data, error, loading }) => {
        if (loading) { return <LoadingBar isLoading /> }
        if (error) { return <div>An error occured...{debug(error)}</div> }

        const { album } = data;

        return (
          <React.Fragment>
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
                {({ onDeck, playState, setOnDeck }) => (
                  <Tracks>
                    {
                      album.tracks.map((track: any) => (
                        <Track
                          key={track.id}
                          current={onDeck.id === track.id}
                          data={track}
                          onClick={() => setOnDeck(track)}
                          hideAlbumCover
                          playState={playState}
                        />
                      ))
                    }
                  </Tracks>
                )}
              </OnDeckContext.Consumer>
            </section>
          </React.Fragment>
        );
      }}
    </Query>
  </Wrapper>
);

export default Album;
