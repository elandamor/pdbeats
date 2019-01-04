import React, { ChangeEvent, SFC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

/**
 * @render react
 * @name VolumeBar component
 * @description VolumeBar component.
 * @example
 * <VolumeBar />
 */

interface IProps {
  className?: string;
  onChange: (event:  ChangeEvent<HTMLInputElement>) => void;
  volume: number;
  volumeMax?: number;
};

const defaultVolumeMax = 10;
const defaultVolume = 10;

const VolumeBar: SFC<IProps> = ({
  className,
  volume = defaultVolume,
  volumeMax = defaultVolumeMax,
  onChange: handleChange
}) => (
  <Wrapper className={classNames('c-volumeBar', className)}>
    <progress
      max={volumeMax}
      value={volume}
    />
    <input
      type="range"
      id="volume"
      name="volume"
      min="0"
      max={volumeMax}
      // @ts-ignore
      defaultValue={volume}
      onChange={handleChange}
    />
  </Wrapper>
);

export default VolumeBar;
