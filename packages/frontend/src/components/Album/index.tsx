import React, { FC } from 'react';
import classNames from 'classnames';
import { Link, RouteComponentProps } from 'react-router-dom';
import getYear from 'date-fns/get_year';
import { Image } from 'cloudinary-react';
import { Edit2, Plus } from 'react-feather';
import { Helmet } from 'react-helmet';
// Components
import Flex from '../Flex';
import Track from '../../components/Track';
// Styles
import Wrapper, { Actions, Details, Metadata, Tracks } from './styles';

import { AuthenticatedUserContext } from '../../contexts/AuthenticatedUser.context';
import { OnDeckContext } from '../../contexts/OnDeck.context';

import Button from '../Button';
import Icon from '../Icon';
import Spacer from '../Spacer';
import { H4, H6 } from '../../typography';

/**
 * @render react
 * @name Album component
 * @description Album component.
 * @example
 * <Album />
 */

interface IAlbumProps extends RouteComponentProps {
  className?: string;
  data: any;
};

const Album: FC<IAlbumProps> = ({ className, data: album, match }) => (
  <Wrapper className={classNames('c-album', className)}>
    <AuthenticatedUserContext.Consumer>
      {({ isAdmin }) => (
        <Flex>
          <Helmet title={`${album.name}`} />
          <Flex marginRight={32} size="none">
            <Image
              cloudName={process.env.CLOUDINARY_BUCKET}
              publicId={album.artwork.url}
              height="400"
              width="400"
              crop="scale"
              fetchFormat="auto"
            />
          </Flex>
          <Flex>
            <Flex direction="column">
              <header>
                <Details>
                  <H4>{album.name}</H4>
                  <H6>
                    <span>by&nbsp;</span>
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
                    isAdmin && (
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
                <OnDeckContext.Consumer>
                  {({ onDeck, playState, setOnDeck }) => (
                    <Tracks>
                      {
                        album.tracks.map((track: any) => (
                          <Track
                            key={track.id}
                            current={onDeck.id === track.id}
                            data={track}
                            onSelect={() => setOnDeck(Object.assign(
                              {}, track, {
                                album: {
                                  artwork: {...album.artwork}
                                }
                              }
                            ))}
                            playState={playState}
                          />
                        ))
                      }
                    </Tracks>
                  )}
                </OnDeckContext.Consumer>
              </section>
            </Flex>
          </Flex>
        </Flex>
      )}
    </AuthenticatedUserContext.Consumer>
  </Wrapper>
);

export default Album;
