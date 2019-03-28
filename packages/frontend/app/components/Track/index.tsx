import React, { FC } from 'react';
import classNames from 'classnames';
import { Image } from 'cloudinary-react';
// Styles
import Wrapper, { Duration } from './styles';
import { secondsToTime } from '../../utils';
import Equalizer from '../Equalizer';
import Spacer from '../Spacer';
import Button from '../Button';
import { Plus } from 'react-feather';

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
          <Image
            cloudName={process.env.CLOUDINARY_BUCKET}
            publicId={data.album.artwork.url}
            height={rest.coverSize || '40'}
            width={rest.coverSize || '40'}
            crop="scale"
            fetchFormat="auto"
          />
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
