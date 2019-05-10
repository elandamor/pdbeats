import React, { ChangeEvent, FC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

/**
 * @render react
 * @name ProgressBar component
 * @description ProgressBar component.
 * @example
 * <ProgressBar />
 */

interface IProps {
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  progress: number;
  progressMax?: number;
};

const defaultProgressMax = 100;
const defaultProgress = 0;

const ProgressBar: FC<IProps> = ({
  className,
  progress = defaultProgress,
  progressMax = defaultProgressMax,
  onChange: handleChange
}) => (
  <Wrapper className={classNames('c-progressBar', className)}>
    <progress
      className="c-progress__background"
      max={progressMax}
      value={progress}
    />
    <input
      className="c-progress__slider"
      type="range"
      id="progress"
      name="progress"
      min="0"
      max={progressMax}
      value={progress}
      onChange={handleChange}
    />
  </Wrapper>
);

export default ProgressBar;
