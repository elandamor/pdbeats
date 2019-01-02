import React, { SFC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

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
    className={classNames('', className, {
      '-current': current,
    })}
    onClick={() => handleClick}
    {...rest}
  >
    <span className="a-trackNumber">
      {data.trackNumber}
    </span>
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
    <span className="a-duration">
      {data.duration}
    </span>
  </Wrapper>
);

export default Track;
