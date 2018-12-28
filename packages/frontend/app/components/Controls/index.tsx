import React, { SFC } from 'react';
import classNames from 'classnames';
import { Pause, Play } from 'react-feather';
// Styles
import Wrapper from './styles';
import Button from '../Button';

/**
 * @render react
 * @name Controls component
 * @description Controls component.
 * @example
 * <Controls />
 */

interface IProps {
  className?: string;
  isPlaying: boolean;
  onChange: (action: string) => void;
};

const Controls: SFC<IProps> = ({
  className,
  isPlaying,
  onChange: handleClick,
}) => (
  <Wrapper className={classNames('', className)}>
    <Button
      className={classNames('-prev')}
      onClick={() => handleClick('prev')}
    >
      Prev
    </Button>
    <Button
      className={classNames(`-${isPlaying ? 'pause' : 'play'}`)}
      onClick={() => handleClick(isPlaying ? 'pause' : 'play')}
    >
      { isPlaying ? <Pause /> : <Play /> }
    </Button>
    <Button
      className={classNames('-next')}
      onClick={() => handleClick('next')}
    >
      Next
    </Button>
  </Wrapper>
);

export default Controls;
