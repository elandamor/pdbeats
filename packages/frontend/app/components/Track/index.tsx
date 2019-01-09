import React, { SFC } from 'react';
import classNames from 'classnames';
// @ts-ignore
import { Image } from 'cloudinary-react';
// Styles
import Wrapper from './styles';
import { secondsToTime } from '../../lib';
import Equalizer from '../Equalizer';

/**
 * @render react
 * @name Track component
 * @description Track component.
 * @example
 * <Track />
 */

interface IProps {
  className?: string;
  [key: string]: any;
};

const Track: SFC<IProps> = ({ className, current, data, handleClick, ...rest }) => (
  <Wrapper
    className={classNames('c-track', className, {
      '-current': current,
      '-paused': current && rest.playState === 'paused',
    })}
    onClick={() => handleClick}
    {...rest}
  >
    {
      data.trackNumber && !rest.hideTrackNumber && (
        <span className="a-trackNumber">
          {data.trackNumber}
        </span>
      )
    }
    {
      data.album && !rest.hideAlbumCover && (
        <div className="c-cover__wrapper">
          <Image
            cloudName={process.env.CLOUDINARY_BUCKET}
            publicId={`/pdbeats/covers/${data.album.artwork.url}`}
            height="40"
            width="40"
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
    <div className="c-details">
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
      <br />
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
    </div>
    {
      data.duration && !rest.hideDuration && (
        <span className="a-duration">
          {secondsToTime(data.duration)}
        </span>
      )
    }
  </Wrapper>
);

export default Track;
