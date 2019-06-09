import React, { FC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper, { Duration } from './styles';
import { secondsToTime } from '../../utils';
import Equalizer from '../Equalizer';
import Image from '../Image/Loadable';
import Spacer from '../Spacer';
import Button from '../Button';
import { Plus } from 'react-feather';
import { generateCloudinaryUri } from 'utils/cloudinary';

/**
 * @render react
 * @name Track component
 * @description Track component.
 * @example
 * <Track />
 */

export interface ITrackProps {
  className?: string;
  [key: string]: any;
};

const Track: FC<ITrackProps> = ({
  className,
  current,
  data,
  onSelect: handleClick,
  hideAlbumCover,
  hideDuration,
  hideTrackNumber,
  ...rest
}) => (
  <Wrapper
    className={classNames('c-track', className, {
      '-current': current,
      '-paused': current && rest.playState === 'paused',
    })}
    {...rest}
  >
    {
      data.trackNumber && !hideTrackNumber && (
        <span className="a-trackNumber">
          {!current && data.trackNumber}
        </span>
      )
    }
    {
      data.album && !hideAlbumCover && (
        <div className="c-cover__wrapper">
          <Image src={generateCloudinaryUri(data.album.artwork.url)} />
        </div>
      )
    }
    {
      current && (
        <Equalizer pause={current && rest.playState === 'paused'} />
      )
    }
    <div className="c-details" onClick={handleClick}>
      <span className="a-name">
        {data.name}
        {
          data.featuring &&
          data.featuring.length > 0 && (
            <React.Fragment>
              &nbsp;
              (
              <span className="a-feat">feat. </span>
              {data.featuring.map((artist: any) => (
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
      <Spacer spacing={2} />
      <small className="c-artists">
      {
        data.artists.map((artist: any) => (
          <span
            key={artist.id}
            className="a-artist"
          >
            {artist.name}
          </span>
        )).reduce((prev: any, curr: any) => [prev, ', ', curr])
      }
      </small>
      {
        rest.duration
        && (
          <React.Fragment>
            <Spacer spacing={8} />
            <Duration>{rest.duration.current} / {rest.duration.total}</Duration>
          </React.Fragment>
        )
      }
    </div>
    <Button className="c-btn--collect" iconOnly icon={<Plus />} ml={1} />
    {
      !hideDuration && (
        <React.Fragment>
          <Spacer spacing={16} vertical />
          <Duration>{secondsToTime(data.duration)}</Duration>
        </React.Fragment>
      )
    }
  </Wrapper>
);

Track.defaultProps = {
  hideAlbumCover: true,
  hideDuration: false,
  hideTrackNumber: false,
};

export default Track;
