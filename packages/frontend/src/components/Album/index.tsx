import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { Link, RouteComponentProps } from 'react-router-dom';
import getYear from 'date-fns/get_year';
import { Edit2, Plus } from 'react-feather';
import { Helmet } from 'react-helmet';
// Components
import Button from '../Button';
import Flex from '../Flex';
import Icon from '../Icon';
import Image from '../Image/Loadable';
import Spacer from '../Spacer';
import Track from '../Track';
// Styles
import Wrapper, { Actions, Details, Metadata, Tracks } from './styles';

import { AuthenticatedUserContext } from '../../contexts/AuthenticatedUser.context';
import { OnDeckContext } from '../../contexts/OnDeck.context';
import { PlaylistContext } from 'contexts/Playlist.context';

import { H4, H6 } from '../../typography';
import { generateCloudinaryUri } from 'utils/cloudinary';

/**
 * @render react
 * @name Album component
 * @description Album component.
 * @example
 * <Album />
 */

interface IAlbumProps extends RouteComponentProps {
  className?: string;
  data: IAlbum;
};

const Album: FC<IAlbumProps> = ({ className, data: album, match }) => {
  const authenticatedUserCtx = useContext(AuthenticatedUserContext);
  const onDeckCtx = useContext(OnDeckContext);
  const playlistCtx = useContext(PlaylistContext);

  return (
    <Wrapper className={classNames('c-album', className)}>
      <Flex>
        <Helmet title={`${album.name}`} />
        <Flex marginRight={32} size="none">
          <Image
            src={generateCloudinaryUri(album.artwork.url)}
            height="400px"
            width="400px"
          />
        </Flex>
        <Flex>
          <Flex flexDirection="column">
            <header>
              <Details>
                <H4>{album.name}</H4>
                <H6>
                  <span>by&nbsp;</span>
                  {album.artists.map((artist: IArtist) => (
                    <span
                      key={artist.id}
                      className="a-artist"
                    >
                      <Link to={`/artists/${artist.id}`}>
                        {artist.name}
                      </Link>
                    </span>
                  )).reduce((prev: any, curr: any) => [prev, ', ', curr])}
                </H6>
                <Metadata>
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
                </Metadata>
              </Details>
              <Actions size="none">
                <Button
                  className="c-btn--collect"
                  icon={<Plus />}
                  iconSize={24}
                  iconOnly
                  mr={1}
                />
                <Button
                  className="c-btn--play"
                  icon={<Icon icon="play" viewBox="0 0 20 22" />}
                  iconOnly
                  raised
                />
                {
                  authenticatedUserCtx.isAdmin && (
                    <Link to={`${match.url}/edit`}>
                      <Button
                        className="c-btn--edit"
                        icon={<Edit2 />}
                        iconOnly
                      />
                    </Link>
                  )
                }
              </Actions>
            </header>
            <Spacer spacing={24} />
            <section>
              <Tracks>
                {
                  album.tracks.map((track: ITrack) => (
                    <Track
                      key={track.id}
                      current={onDeckCtx.source.id === track.id}
                      data={track}
                      onSelect={() => playlistCtx.addToPlaylist(Object.assign(
                        {}, track, {
                          album: {
                            artwork: {...album.artwork}
                          }
                        }
                      ))}
                      playState={onDeckCtx.playState}
                    />
                  ))
                }
              </Tracks>
            </section>
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  );
};

export default Album;
