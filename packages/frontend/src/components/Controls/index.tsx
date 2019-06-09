import React, { FC, useContext } from 'react';
// Styles
import { PlayPauseButton } from './styles';
import Button from '../Button';
import Icon from '../Icon';
import { OnDeckContext } from '../../contexts/OnDeck.context';
import Flex from 'components/Flex';

/**
 * @render react
 * @name Controls component
 * @description Controls component.
 * @example
 * <Controls />
 */

interface IProps {
  onChange: (action: string) => void;
};

const Controls: FC<IProps> = ({ onChange: handleChange }) => {
  const { isPlaying } = useContext(OnDeckContext);

  return (
    <Flex alignItems="center" justifyContent="center">
      <Button
        className="-prev"
        onClick={() => handleChange('prev')}
        icon={<Icon icon="fastBackward" viewBox="0 0 21 13" />}
        iconSize={20}
        iconOnly={true}
      />
      <PlayPauseButton
        bg="blacks.3"
        borderRadius={100}
        className={`-${isPlaying ? 'pause' : 'play'}`}
        onClick={() => handleChange(isPlaying ? 'pause' : 'play')}
        icon={
          isPlaying
          ? <Icon icon="pause" viewBox="0 0 16 18" />
          : <Icon icon="play" viewBox="0 0 20 22" />
        }
        iconSize={16}
        iconOnly={true}
        mx={1}
        size={48}
      />
      <Button
        className="-next"
        onClick={() => handleChange('next')}
        icon={<Icon icon="fastForward" viewBox="0 0 21 13" />}
        iconSize={20}
        iconOnly={true}
      />
    </Flex>
  );
};

export default Controls;
