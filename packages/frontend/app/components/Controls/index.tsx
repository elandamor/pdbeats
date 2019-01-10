import React, { SFC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';
import Button from '../Button';
import Icon from '../Icon';

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
  <Wrapper className={classNames('c-controls', className)}>
    <Button
      className={classNames('-prev')}
      onClick={() => handleClick('prev')}
    >
      <Icon icon="fastBackward" viewBox="0 0 21 13" />
    </Button>
    <Button
      className={classNames(`-${isPlaying ? 'pause' : 'play'}`)}
      onClick={() => handleClick(isPlaying ? 'pause' : 'play')}
    >
      {
        isPlaying
        ? <Icon icon="pause" viewBox="0 0 16 18" />
        : <Icon icon="play" viewBox="0 0 20 22" />
      }
    </Button>
    <Button
      className={classNames('-next')}
      onClick={() => handleClick('next')}
    >
      <Icon icon="fastForward" viewBox="0 0 21 13" />
    </Button>
  </Wrapper>
);

export default Controls;
